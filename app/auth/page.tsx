import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Github } from "lucide-react"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-2xl font-bold text-foreground">
          <Code className="w-8 h-8 mr-2" />
          CodeQuest
        </Link>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <Code className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Continue with CodeQuest</CardTitle>
          <CardDescription>Sign in to start your coding journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <Button className="w-full" size="lg">
            Continue with Email
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid gap-2">
            <Button variant="outline" className="w-full" size="lg">
              <Github className="mr-2 h-5 w-5" />
              Github
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

