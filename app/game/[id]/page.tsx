"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Terminal, Brain, Code } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const games = [
  {
    id: 1,
    title: "Algorithm Arena",
    description: "Battle through algorithmic challenges in real-time",
    icon: <Terminal className="w-8 h-8 text-purple-500" />,
    players: 234,
    difficulty: "Medium",
    challenge: "Write a function that finds the longest palindromic substring in a given string.",
    testCases: [
      { input: "babad", expected: "bab" },
      { input: "cbbd", expected: "bb" },
      { input: "a", expected: "a" },
    ],
  },
  {
    id: 2,
    title: "Code Puzzle",
    description: "Solve coding puzzles and unlock new levels",
    icon: <Brain className="w-8 h-8 text-blue-500" />,
    players: 156,
    difficulty: "Easy",
    challenge: "Write a function that reverses a string without using the built-in reverse() method.",
    testCases: [
      { input: "hello", expected: "olleh" },
      { input: "OpenAI", expected: "IAnepo" },
      { input: "a", expected: "a" },
    ],
  },
  {
    id: 3,
    title: "Debug Master",
    description: "Find and fix bugs in increasingly complex code",
    icon: <Code className="w-8 h-8 text-green-500" />,
    players: 189,
    difficulty: "Hard",
    challenge: "Debug the following function that should return the nth Fibonacci number:",
    buggyCode: `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
    `,
    testCases: [
      { input: 0, expected: 0 },
      { input: 1, expected: 1 },
      { input: 5, expected: 5 },
      { input: 10, expected: 55 },
    ],
  },
]

export default function GamePage() {
  const params = useParams()
  const gameId = Number.parseInt(params.id as string)
  const game = games.find((g) => g.id === gameId)
  const [code, setCode] = useState("")
  const [results, setResults] = useState<string[]>([])

  useEffect(() => {
    if (game && game.id === 3) {
      setCode(game.buggyCode)
    }
  }, [game])

  if (!game) {
    return <div>Game not found</div>
  }

  const runCode = () => {
    try {
      const userFunction = new Function("return " + code)()
      const newResults = game.testCases.map((testCase) => {
        const result = userFunction(testCase.input)
        return `Input: ${JSON.stringify(testCase.input)}, Expected: ${testCase.expected}, Got: ${result}, ${result === testCase.expected ? "PASS" : "FAIL"}`
      })
      setResults(newResults)
    } catch (error) {
      setResults([`Error: ${error.message}`])
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-gray-100/50 backdrop-blur-sm">{game.icon}</div>
              <div>
                <CardTitle>{game.title}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </div>
            </div>
            <Button variant="outline">{game.difficulty}</Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{game.challenge}</p>
          <div className="space-y-4">
            <Label htmlFor="code">Your Code</Label>
            <Textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono min-h-[200px]"
              placeholder="Write your code here..."
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={runCode} className="w-full">
            Run Code
          </Button>
        </CardFooter>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg">
              {results.map((result, index) => (
                <div key={index}>{result}</div>
              ))}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

