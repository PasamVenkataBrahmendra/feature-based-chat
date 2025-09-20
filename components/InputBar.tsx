"use client"

import { useState, type KeyboardEvent } from "react"
import { Button } from "./ui/button"
import { SendIcon } from "./icons"

interface InputBarProps {
  onSendMessage: (message: string) => void
  disabled: boolean
}

export function InputBar({ onSendMessage, disabled }: InputBarProps) {
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input)
      setInput("")
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
      <div className="flex gap-2 max-w-4xl mx-auto">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] max-h-32"
          rows={1}
          style={{
            height: "auto",
            minHeight: "44px",
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement
            target.style.height = "auto"
            target.style.height = Math.min(target.scrollHeight, 128) + "px"
          }}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
