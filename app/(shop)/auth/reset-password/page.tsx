'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Lock, CheckCircle2 } from "lucide-react"
import { PasswordStrength } from "@/components/auth/password-strength"

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log('Reset Password:', { password })
        setIsLoading(false)
        setIsSubmitted(true)
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-12 px-4 sm:px-6 lg:px-8">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/30 rounded-full blur-3xl animate-pulse mix-blend-multiply" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl animate-pulse delay-700 mix-blend-multiply" />

            <Card className="w-full max-w-md relative z-10 border-white/20 bg-white/70 backdrop-blur-xl shadow-2xl ring-1 ring-white/50">
                <CardHeader className="space-y-1 text-center pb-8">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
                            <Lock className="h-6 w-6" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Set new password</CardTitle>
                    <CardDescription className="text-base">
                        Must be at least 8 characters.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-white/50 border-gray-200 focus:bg-white transition-colors h-11"
                                />
                                <PasswordStrength password={password} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="bg-white/50 border-gray-200 focus:bg-white transition-colors h-11"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg transition-all hover:scale-[1.02]"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Resetting password...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Reset Password
                                    </span>
                                )}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center space-y-4">
                            <div className="bg-green-100 text-green-700 p-4 rounded-lg flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-5 w-5" />
                                <span>Password reset successfully!</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Your password has been updated. You can now log in with your new password.
                            </p>
                            <Button
                                asChild
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            >
                                <Link href="/auth/login">
                                    Back to Log In
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
                {!isSubmitted && (
                    <CardFooter className="flex justify-center">
                        <Link
                            href="/auth/login"
                            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to log in
                        </Link>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}
