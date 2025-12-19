"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function CertificateReleasePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)

  const handleIssueCertificate = async () => {
    setIsLoading(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/issue-cert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to release certificate")
      }

      setStatus("success")
      setMessage(data.message || "Certificate released successfully!")
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 4000)
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (status !== "idle") setStatus("idle")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-amber-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {status === "idle" && (
        <>
          <div className="
  absolute
  left-8 md:left-16 lg:left-24
  top-1/2
  -translate-y-1/2
  w-56 md:w-72 lg:w-80
  opacity-0
  animate-slide-in-left
  pointer-events-none
">

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent blur-2xl" />
              <img
                src="/images/about-us.jpg"
                alt="Profile"
                className="relative w-full h-auto object-contain rounded-l-3xl shadow-2xl"
              />

            </div>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 md:w-64 lg:w-80 opacity-0 animate-slide-in-right pointer-events-none">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-amber-100/20 to-transparent blur-2xl" />
              <img
                src="/images/cbn.jpeg"
                alt="Profile"
                className="relative w-full h-auto object-contain rounded-l-3xl shadow-2xl"
              />
            </div>
          </div>
        </>
      )}

      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10%",
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 1}s`,
                backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7", "#a29bfe"][
                  Math.floor(Math.random() * 6)
                ],
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-5xl mb-12 relative z-10">
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
          <img
            src="/images/post.png"
            alt="VIT-AP University"
            className="h-20 md:h-24 w-auto object-contain animate-fade-in-up"
            style={{ animationDelay: "0s" }}
          />
          <img
            src="/images/india-20post-20dak-20sewa-20jan-20sewa-20new-20logo-20final.png"
            alt="India Post"
            className="h-20 md:h-24 w-auto object-contain animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          />
          <img
            src="/images/sam.png"
            alt="AIR Center"
            className="h-16 md:h-20 w-auto object-contain animate-fade-in-up bg-white px-4 py-2 rounded"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center space-y-8">
          {/* Header */}
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">POSTA-THON 2025 </h1>
            <p className="text-lg text-muted-foreground text-pretty">Certificate Issuance Portal </p>
          </div>

          {/* Main Card */}
          <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 md:p-12 shadow-2xl animate-fade-in-up">
            {status === "success" ? (
              <div className="space-y-6 text-center animate-scale-in">
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center animate-scale-in">
                    <CheckCircle2 className="w-16 h-16 text-green-500 animate-check" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">Certificates Issued!</h2>
                  <p className="text-lg text-muted-foreground">{message}</p>
                </div>
                <Button onClick={() => setStatus("idle")} variant="outline" size="lg" className="mt-4">
                  Release More Certificates
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3 text-center">
                  <h2 className="text-2xl font-semibold">Release Certificates</h2>
                  <p className="text-muted-foreground">
                    Click the button below to release certificates to all participants
                  </p>
                </div>

                <Button
                  onClick={handleIssueCertificate}
                  disabled={isLoading}
                  size="lg"
                  className="w-full h-16 text-lg font-semibold relative overflow-hidden group transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Releasing...
                      </>
                    ) : (
                      "Release Certificates"
                    )}
                  </span>
                </Button>

                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3 animate-fade-in">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-600 dark:text-red-400">{message}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
