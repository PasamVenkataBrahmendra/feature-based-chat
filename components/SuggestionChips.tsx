"use client"

import { Button } from "./ui/button"

interface SuggestionChipsProps {
  suggestions: string[]
  onSuggestionClick: (suggestion: string) => void
}

export function SuggestionChips({ suggestions, onSuggestionClick }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSuggestionClick(suggestion)}
          className="text-sm bg-white/80 hover:bg-purple-50 hover:border-purple-300 border-gray-300 text-gray-700 hover:text-purple-700 transition-colors duration-200"
        >
          {suggestion}
        </Button>
      ))}
    </div>
  )
}
