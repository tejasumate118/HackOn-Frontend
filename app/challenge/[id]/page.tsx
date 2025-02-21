"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import CodeEditor from "@/components/code-editor"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChallengePage() {
  const params = useParams()
  const challengeId = params.id

  // Simulated challenge data
  const challenge = {
    id: challengeId,
    title: "Python List Comprehension",
    description: "Create a list of squares of even numbers from 0 to 10 using list comprehension.",
    initialCode: "# Your code here\n\n# Expected output: [0, 4, 16, 36, 64, 100]",
    language: "python" as const,
  }

  const [result, setResult] = useState<string | null>(null)

  const handleSubmit = (code: string) => {
    // In a real application, you would send the code to a backend for execution and validation
    // For this example, we'll just set a simulated result
    setResult("Great job! Your solution is correct.")
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{challenge.title}</CardTitle>
          <CardDescription>{challenge.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeEditor initialCode={challenge.initialCode} language={challenge.language} onSubmit={handleSubmit} />
        </CardContent>
        <CardFooter>
          {result && <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">{result}</div>}
        </CardFooter>
      </Card>
    </div>
  )
}

