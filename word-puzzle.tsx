"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

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

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <button className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-2 text-xl font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
          </svg>
          Crossclimb
        </div>
        <div className="flex gap-2">
          <button className="p-2">?</button>
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {/* Answer boxes */}
        {answers.map((row, boxIndex) => (
          <div key={boxIndex} className="bg-white rounded-lg p-4 h-16 flex items-center justify-center gap-2">
            {row.map((letter, letterIndex) => (
              <input
                key={letterIndex}
                type="text"
                maxLength={1}
                className="w-8 h-8 border-2 border-gray-300 rounded text-center text-xl font-bold uppercase focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
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
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <Button className="flex-1 rounded-full" variant="outline" onClick={handleHint}>
          Hint
        </Button>
      </div>

      <div className="text-center mt-8 text-muted-foreground">{puzzleData[currentBox].question}</div>
    </div>
  )
}

