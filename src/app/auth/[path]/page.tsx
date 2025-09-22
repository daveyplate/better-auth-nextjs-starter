import { AuthView } from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui/server"
import Link from "next/link"

export const dynamicParams = false

export function generateStaticParams() {
    return Object.values(authViewPaths).map((path) => ({ path }))
}

export default async function AuthPage({
    params
}: {
    params: Promise<{ path: string }>
}) {
    const { path } = await params

    // **EXAMPLE** SSR route protection for /auth/settings
    // NOTE: This opts /auth/settings out of static rendering
    // It already handles client side protection via useAuthenticate
    // if (pathname === "settings") {
    //     const sessionData = await auth.api.getSession({
    //         headers: await headers()
    //     })

    //     if (!sessionData) redirect("/auth/sign-in?redirectTo=/auth/settings")
    // }

    return (
        <main className="container flex grow flex-col items-center justify-center gap-4 self-center p-4 md:p-6">
            <AuthView path={path} />

            <p className="text-muted-foreground text-xs">
                By continuing, you agree to the{" "}
                <Link
                    className="text-warning underline"
                    href="/terms"
                    target="_blank"
                >
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                    className="text-warning underline"
                    href="/privacy"
                    target="_blank"
                >
                    Privacy Policy
                </Link>
                .
            </p>
        </main>
    )
}
