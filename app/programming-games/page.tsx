"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad, Search, Terminal, Brain, Code, Bug } from "lucide-react"

const games = [
  {
    id: 1,
    title: "Algorithm Arena",
    description: "Battle through algorithmic challenges in real-time",
    icon: <Terminal className="w-8 h-8 text-purple-500" />,
    difficulty: "Medium",
  },
  {
    id: 2,
    title: "Code Puzzle",
    description: "Solve coding puzzles and unlock new levels",
    icon: <Brain className="w-8 h-8 text-blue-500" />,
    difficulty: "Easy",
  },
  {
    id: 3,
    title: "Debug Master",
    description: "Find and fix bugs in increasingly complex code",
    icon: <Code className="w-8 h-8 text-green-500" />,
    difficulty: "Hard",
  },
  {
    id: 4,
    title: "Data Structure Duel",
    description: "Compete in implementing efficient data structures",
    icon: <Gamepad className="w-8 h-8 text-red-500" />,
    difficulty: "Hard",
  },
  {
    id: 5,
    title: "Syntax Sprint",
    description: "Race against time to write correct syntax",
    icon: <Terminal className="w-8 h-8 text-yellow-500" />,
    difficulty: "Easy",
  },
  {
    id: 6,
    title: "AI Challenge",
    description: "Develop AI algorithms to solve complex problems",
    icon: <Brain className="w-8 h-8 text-indigo-500" />,
    difficulty: "Expert",
  },
  {
    id: 8,
    title: "CrossClasses",
    description: "Master object-oriented programming concepts with this crossword-style puzzle",
    icon: <Code className="w-8 h-8 text-teal-500" />,
    difficulty: "Medium",
    isActive: true,
  },
  {
    id: 9,
    title: "Bug Buster",
    description: "Hunt down and eliminate bugs in various code snippets",
    icon: <Bug className="w-8 h-8 text-orange-500" />,
    difficulty: "Medium",
    isActive: true,
  },
]

export default function ProgrammingGamesDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGames = games.filter(
    (game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Programming Games Dashboard</h1>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search games..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <Link href={`/game/${game.id}`} key={game.id}>
              <Card
                className={`group hover:shadow-lg transition-all duration-300 overflow-hidden h-full ${game.isActive ? "border-primary" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-gray-100/50 backdrop-blur-sm">{game.icon}</div>
                    <Badge
                      variant={
                        game.difficulty === "Easy"
                          ? "secondary"
                          : game.difficulty === "Medium"
                            ? "default"
                            : game.difficulty === "Hard"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {game.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{game.title}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter>
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">Play Now</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

