"use client"

import { useState, useEffect, useRef } from "react"
import type { Feature, ChatMessage } from "@/types"
import { SUGGESTION_CHIPS } from "@/constants"
import { geminiService } from "@/services/geminiService"
import { ArrowLeftIcon, TrashIcon } from "./icons"
import { Button } from "./ui/button"
import { MessageList } from "./MessageList"
import { InputBar } from "./InputBar"
import { SuggestionChips } from "./SuggestionChips"

interface ChatWindowProps {
  feature: Feature
  onBack: () => void
}

export function ChatWindow({ feature, onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat-${feature.id}`)
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }))
      setMessages(parsedMessages)
    }
  }, [feature.id])

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat-${feature.id}`, JSON.stringify(messages))
    }
  }, [messages, feature.id])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, streamingMessage])

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setStreamingMessage("")

    try {
      const botMessageId = (Date.now() + 1).toString()
      let fullResponse = ""

      await geminiService.sendMessage(feature.id, content, (chunk: string) => {
        fullResponse += chunk
        setStreamingMessage(fullResponse)
      })

      const botMessage: ChatMessage = {
        id: botMessageId,
        content: fullResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setStreamingMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChat = () => {
    setMessages([])
    setStreamingMessage("")
    localStorage.removeItem(`chat-${feature.id}`)
    geminiService.clearChat(feature.id)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const suggestions = SUGGESTION_CHIPS[feature.id] || []
  const showSuggestions = messages.length === 0 && !isLoading

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-purple-100">
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">{feature.title}</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearChat}
          className="hover:bg-red-100 hover:text-red-600"
          disabled={messages.length === 0}
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {showSuggestions && (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-700 mb-4 text-center">Try asking me about:</h2>
              <SuggestionChips suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
            </div>
          )}

          <MessageList messages={messages} streamingMessage={streamingMessage} isLoading={isLoading} />
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <InputBar onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}
