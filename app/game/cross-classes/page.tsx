"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"

const puzzleData = [
  { question: "Manages user account details and settings", answer: "ACCOUNT" },
  { question: "Records financial transactions with amount and date", answer: "TRANSACTION" },
  { question: "Stores information about a product, such as name and price", answer: "PRODUCT" },
  { question: "Tracks customer orders with items, quantities, and status", answer: "ORDER" },
  { question: "Generates invoices with billing details and totals", answer: "INVOICE" },
  { question: "Processes payment details and status", answer: "PAYMENT" },
]

export default function WordPuzzle() {
  const [answers, setAnswers] = useState<string[][]>(puzzleData.map((item) => Array(item.answer.length).fill("")))
  const [currentBox, setCurrentBox] = useState(0)
  const [currentLetter, setCurrentLetter] = useState(0)
  const [hints, setHints] = useState<number[]>(puzzleData.map(() => -1))
  const [isComplete, setIsComplete] = useState(false)
  const [submittedAnswers, setSubmittedAnswers] = useState<boolean[]>(puzzleData.map(() => false))
  const [incorrectAnswers, setIncorrectAnswers] = useState<boolean[]>(puzzleData.map(() => false))

  const checkCompletion = useCallback(() => {
    const allFilled = answers.every((row) => row.every((letter) => letter !== ""))
    setIsComplete(allFilled)
  }, [answers])

  useEffect(() => {
    checkCompletion()
  }, [checkCompletion])

  const handleInput = (boxIndex: number, letterIndex: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[boxIndex][letterIndex] = value.toUpperCase()
    setAnswers(newAnswers)

    // Move to next letter slot
    if (value && letterIndex < newAnswers[boxIndex].length - 1) {
      setCurrentLetter(letterIndex + 1)
    } else if (value && letterIndex === newAnswers[boxIndex].length - 1 && boxIndex < newAnswers.length - 1) {
      setCurrentBox(boxIndex + 1)
      setCurrentLetter(0)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, boxIndex: number, letterIndex: number) => {
    if (e.key === "Backspace" && (e.target as HTMLInputElement).value === "") {
      // Move to previous letter slot on backspace if current slot is empty
      if (letterIndex > 0) {
        setCurrentLetter(letterIndex - 1)
      } else if (boxIndex > 0) {
        setCurrentBox(boxIndex - 1)
        setCurrentLetter(answers[boxIndex - 1].length - 1)
      }
    }
  }

  const handleHint = () => {
    const currentAnswer = puzzleData[currentBox].answer
    const currentHint = hints[currentBox]
    let newHintIndex

    if (currentHint === -1) {
      // Find the first empty slot or incorrect letter
      newHintIndex = answers[currentBox].findIndex((letter, index) => letter === "" || letter !== currentAnswer[index])
    } else {
      // Find the next empty slot or incorrect letter
      newHintIndex = answers[currentBox].findIndex(
        (letter, index) => index > currentHint && (letter === "" || letter !== currentAnswer[index]),
      )
    }

    if (newHintIndex === -1) {
      // If no empty or incorrect slots found, start from the beginning
      newHintIndex = answers[currentBox].findIndex((letter, index) => letter === "" || letter !== currentAnswer[index])
    }

    if (newHintIndex !== -1) {
      const newAnswers = [...answers]
      newAnswers[currentBox][newHintIndex] = currentAnswer[newHintIndex]
      setAnswers(newAnswers)

      const newHints = [...hints]
      newHints[currentBox] = newHintIndex
      setHints(newHints)

      setCurrentLetter(newHintIndex)
    }
  }

  const handleSubmitAnswer = (boxIndex: number) => {
    const currentAnswer = answers[boxIndex].join("")
    const isCorrect = currentAnswer === puzzleData[boxIndex].answer

    const newSubmittedAnswers = [...submittedAnswers]
    newSubmittedAnswers[boxIndex] = true
    setSubmittedAnswers(newSubmittedAnswers)

    const newIncorrectAnswers = [...incorrectAnswers]
    newIncorrectAnswers[boxIndex] = !isCorrect
    setIncorrectAnswers(newIncorrectAnswers)
  }

  const handleCheckAnswers = () => {
    const newSubmittedAnswers = answers.map(() => true)
    setSubmittedAnswers(newSubmittedAnswers)

    const newIncorrectAnswers = answers.map((row, index) => row.join("") !== puzzleData[index].answer)
    setIncorrectAnswers(newIncorrectAnswers)
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="flex items-center mb-6">
        <Link href="/programming-games" className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="text-xl font-semibold ml-2">CrossClasses</div>
      </div>

      <div className="space-y-3">
        {/* Answer boxes */}
        {answers.map((row, boxIndex) => (
          <div key={boxIndex} className="space-y-2">
            <div className="bg-white rounded-lg p-4 h-16 flex items-center justify-center gap-2">
              {row.map((letter, letterIndex) => (
                <input
                  key={letterIndex}
                  type="text"
                  maxLength={1}
                  className={`w-8 h-8 border-2 rounded text-center text-xl font-bold uppercase focus:ring-1 focus:outline-none ${
                    submittedAnswers[boxIndex] && incorrectAnswers[boxIndex]
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary focus:ring-primary"
                  }`}
                  value={letter}
                  onChange={(e) => handleInput(boxIndex, letterIndex, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, boxIndex, letterIndex)}
                  onFocus={() => {
                    setCurrentBox(boxIndex)
                    setCurrentLetter(letterIndex)
                  }}
                  autoFocus={currentBox === boxIndex && currentLetter === letterIndex}
                />
              ))}
              <Button
                onClick={() => handleSubmitAnswer(boxIndex)}
                disabled={row.some((letter) => letter === "") || submittedAnswers[boxIndex]}
                className="ml-2"
              >
                Submit
              </Button>
            </div>
            {submittedAnswers[boxIndex] && (
              <div className="flex items-center gap-2">
                {incorrectAnswers[boxIndex] ? (
                  <>
                    <XCircle className="text-red-500" />
                    <p className="text-red-500 text-sm">This answer is incorrect. Please try again.</p>
                  </>
                ) : (
                  <>
                    <CheckCircle className="text-green-500" />
                    <p className="text-green-500 text-sm">Correct answer!</p>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <Button className="flex-1 rounded-full" variant="outline" onClick={handleHint}>
          Hint
        </Button>
        <Button className="flex-1 rounded-full" variant="outline" onClick={handleCheckAnswers}>
          Check All Answers
        </Button>
      </div>

      {isComplete && incorrectAnswers.some((incorrect) => incorrect) && (
        <Alert variant="destructive">
          <AlertDescription>
            There are one or more incorrect answers. Please check your answers and try again.
          </AlertDescription>
        </Alert>
      )}

      <div className="text-center mt-8 text-muted-foreground">{puzzleData[currentBox].question}</div>
    </div>
  )
}

