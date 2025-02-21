"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Language = "python" | "javascript" | "html"

interface CodeEditorProps {
  initialCode: string
  language: Language
  onSubmit: (code: string) => void
}

export default function CodeEditor({ initialCode, language, onSubmit }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language)

  const handleSubmit = () => {
    onSubmit(code)
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between mb-4">
        <Select value={selectedLanguage} onValueChange={(value: Language) => setSelectedLanguage(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="html">HTML</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      <textarea
        className="w-full h-64 p-2 font-mono text-sm border rounded"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </div>
  )
}

