import { BotIcon } from "./icons"

export function TypingIndicator() {
  return (
    <div className="flex gap-3 max-w-4xl mr-auto">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
        <BotIcon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div className="inline-block px-4 py-2 rounded-2xl rounded-bl-md bg-white border border-gray-200 shadow-sm">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
