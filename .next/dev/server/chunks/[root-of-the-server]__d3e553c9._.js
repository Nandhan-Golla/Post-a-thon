module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/issue-cert/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const CERTIFIER_BASE_URL = "https://api.certifier.io/v1/credentials";
const CERTIFIER_VERSION = "2022-10-26";
async function POST(request) {
    try {
        const certifierApiKey = "cfp_omIat4JPukFSP2AEz2Bld5ME1gKHTVQN2uEM";
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const headers = {
            accept: "application/json",
            "Content-Type": "application/json",
            "Certifier-Version": CERTIFIER_VERSION,
            Authorization: `Bearer ${certifierApiKey}`
        };
        /* --------------------------------------------------
       1. LIST CREDENTIALS (GET IDs)
    -------------------------------------------------- */ const listRes = await fetch(`${CERTIFIER_BASE_URL}?limit=20`, {
            headers
        });
        if (!listRes.ok) {
            const err = await listRes.text();
            console.error("[certifier] Failed to list credentials:", err);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Failed to fetch credentials"
            }, {
                status: listRes.status
            });
        }
        const listData = await listRes.json();
        const credentialIds = listData?.data?.map((c)=>c.id) ?? [];
        if (credentialIds.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                message: "No credentials found to send",
                sent: 0
            });
        }
        /* --------------------------------------------------
       2. SEND EACH CREDENTIAL
    -------------------------------------------------- */ let sentCount = 0;
        const failures = [];
        for (const id of credentialIds){
            try {
                const sendRes = await fetch(`${CERTIFIER_BASE_URL}/${id}/send`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        deliveryMethod: "email"
                    })
                });
                if (!sendRes.ok) {
                    const err = await sendRes.text();
                    failures.push({
                        id,
                        error: err
                    });
                    continue;
                }
                sentCount++;
                // Optional small delay to avoid rate limits
                await new Promise((r)=>setTimeout(r, 150));
            } catch (err) {
                failures.push({
                    id,
                    error: err.message
                });
            }
        }
        /* --------------------------------------------------
       3. RESPONSE
    -------------------------------------------------- */ return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            total: credentialIds.length,
            sent: sentCount,
            failed: failures.length,
            failures
        });
    } catch (error) {
        console.error("[certifier] Unexpected error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d3e553c9._.js.map