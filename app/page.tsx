"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle } from "lucide-react"

import confetti from "canvas-confetti"

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
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe']
      })
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
    <main className="min-h-screen bg-[url('/images/bg.avif')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-6 relative overflow-x-hidden">
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

      {/* Main Layout Container */}
      <div className="relative z-10 w-full px-4 lg:px-0 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0 min-h-[80vh]">

        {/* Left Side Image */}
        <div className="order-2 lg:order-1 w-full lg:w-auto flex justify-center lg:justify-start mt-8 lg:mt-0 pointer-events-none h-40 sm:h-auto lg:flex-1 min-w-0">
          {status === "idle" && (
            <div className="relative w-28 sm:w-40 md:w-56 lg:w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent blur-2xl" />
              <img
                src="/images/pmmabro (1).jpg"
                alt="Profile"
                className="relative w-full h-auto max-h-[200px] sm:max-h-[300px] lg:max-h-[60vh] object-contain rounded-r-3xl shadow-2xl"
              />
            </div>
          )}
        </div>

        {/* Center Content */}
        <div className="order-1 lg:order-2 flex flex-col items-center w-full max-w-3xl mx-auto px-4 z-20 shrink">
          <div className="w-full mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 xl:gap-16 flex-wrap">
              <img
                src="/images/post.png"
                alt="VIT-AP University"
                className="h-10 sm:h-14 md:h-16 xl:h-24 w-auto object-contain animate-fade-in-up"
                style={{ animationDelay: "0s" }}
              />
              <img
                src="/images/india-20post-20dak-20sewa-20jan-20sewa-20new-20logo-20final.png"
                alt="India Post"
                className="h-10 sm:h-14 md:h-16 xl:h-24 w-auto object-contain animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              />
              <img
                src="/images/sam.png"
                alt="AIR Center"
                className="h-8 sm:h-10 md:h-14 xl:h-20 w-auto object-contain animate-fade-in-up bg-white px-2 sm:px-4 py-1 sm:py-2 rounded"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>

          <div className="max-w-2xl w-full">
            <div className="text-center space-y-8">
              {/* Header */}
              <div className="space-y-4 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-balance">POSTA-THON 2025 </h1>
                <p className="text-lg font-semibold bg-gradient-to-r from-slate-600 via-amber-500 to-slate-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-shine text-pretty">Certificate Issuance Portal </p>
              </div>

              {/* Main Card */}
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 md:p-12 shadow-2xl animate-fade-in-up">
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
        </div>

        {/* Right Side Image */}
        <div className="order-3 lg:order-3 w-full lg:w-auto flex justify-center lg:justify-end mt-4 lg:mt-0 pointer-events-none h-40 sm:h-auto lg:flex-1 min-w-0">
          {status === "idle" && (
            <div className="relative w-28 sm:w-40 md:w-56 lg:w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-amber-100/20 to-transparent blur-2xl" />
              <img
                src="/images/chandra_babu_profile (1).png"
                alt="Profile"
                className="relative w-full h-auto max-h-[200px] sm:max-h-[300px] lg:max-h-[60vh] object-contain rounded-l-3xl shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
