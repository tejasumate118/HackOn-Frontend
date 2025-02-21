"use client"

import Link from "next/link"
import { Code, Home, BookOpen, Trophy, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  // This would be replaced with actual auth state
  const isAuthenticated = true
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/50 backdrop-blur-md supports-[backdrop-filter]:bg-white/30">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Code className="h-6 w-6" />
          <span className="font-bold">CodeQuest</span>
        </Link>

        <nav className="flex items-center space-x-6 ml-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
          <Link href="/challenges" className="text-sm font-medium transition-colors hover:text-primary">
            <Trophy className="h-4 w-4" />
            <span className="sr-only">Challenges</span>
          </Link>
          <Link href="/courses" className="text-sm font-medium transition-colors hover:text-primary">
            <BookOpen className="h-4 w-4" />
            <span className="sr-only">Courses</span>
          </Link>
        </nav>

        <div className="flex items-center ml-auto">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative h-8 w-8 rounded-full border-2 border-primary">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/80 backdrop-blur-sm" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost">
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

