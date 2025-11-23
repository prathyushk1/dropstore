import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
    password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
    const getStrength = (pass: string) => {
        let score = 0
        if (!pass) return 0
        if (pass.length > 8) score += 1
        if (/[A-Z]/.test(pass)) score += 1
        if (/[0-9]/.test(pass)) score += 1
        if (/[^A-Za-z0-9]/.test(pass)) score += 1
        return score
    }

    const strength = getStrength(password)

    const getColor = (score: number) => {
        if (score === 0) return "bg-gray-200"
        if (score <= 1) return "bg-red-500"
        if (score <= 2) return "bg-orange-500"
        if (score <= 3) return "bg-yellow-500"
        return "bg-green-500"
    }

    const getLabel = (score: number) => {
        if (score === 0) return "Enter password"
        if (score <= 1) return "Weak"
        if (score <= 2) return "Fair"
        if (score <= 3) return "Good"
        return "Strong"
    }

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                {[1, 2, 3, 4].map((level) => (
                    <div
                        key={level}
                        className={cn(
                            "h-1 w-full rounded-full transition-colors duration-300",
                            level <= strength ? getColor(strength) : "bg-gray-200"
                        )}
                    />
                ))}
            </div>
            <p className={cn("text-xs font-medium",
                strength <= 1 ? "text-red-500" :
                    strength <= 2 ? "text-orange-500" :
                        strength <= 3 ? "text-yellow-500" : "text-green-500"
            )}>
                {getLabel(strength)}
            </p>
        </div>
    )
}
