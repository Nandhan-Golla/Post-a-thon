import { type NextRequest, NextResponse } from "next/server"

const CERTIFIER_BASE_URL = "https://api.certifier.io/v1/credentials"
const CERTIFIER_VERSION = "2022-10-26"

export async function POST(request: NextRequest) {
  try {
    const certifierApiKey = "cfp_ZFgrJzMOHHQbIhMJL45SnEpJlCg8shUvumbI"

    if (!certifierApiKey) {
      console.error("[certifier] Missing CERTIFIER_API_KEY")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      "Certifier-Version": CERTIFIER_VERSION,
      Authorization: `Bearer ${certifierApiKey}`,
    }

    /* --------------------------------------------------
       1. LIST CREDENTIALS (GET IDs)
    -------------------------------------------------- */
    const listRes = await fetch(
      `${CERTIFIER_BASE_URL}?limit=20`,
      { headers }
    )

    if (!listRes.ok) {
      const err = await listRes.text()
      console.error("[certifier] Failed to list credentials:", err)
      return NextResponse.json(
        { error: "Failed to fetch credentials" },
        { status: listRes.status }
      )
    }

    const listData = await listRes.json()

    const credentialIds: string[] =
      listData?.data?.map((c: any) => c.id) ?? []

    if (credentialIds.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No credentials found to send",
        sent: 0,
      })
    }

    /* --------------------------------------------------
       2. SEND EACH CREDENTIAL
    -------------------------------------------------- */
    let sentCount = 0
    const failures: { id: string; error: string }[] = []

    for (const id of credentialIds) {
      try {
        const sendRes = await fetch(
          `${CERTIFIER_BASE_URL}/${id}/send`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              deliveryMethod: "email"
            }),
          }
        )

        if (!sendRes.ok) {
          const err = await sendRes.text()
          failures.push({ id, error: err })
          continue
        }

        sentCount++

        // Optional small delay to avoid rate limits
        await new Promise(r => setTimeout(r, 150))

      } catch (err: any) {
        failures.push({ id, error: err.message })
      }
    }

    /* --------------------------------------------------
       3. RESPONSE
    -------------------------------------------------- */
    return NextResponse.json({
      success: true,
      total: credentialIds.length,
      sent: sentCount,
      failed: failures.length,
      failures,
    })

  } catch (error) {
    console.error("[certifier] Unexpected error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
