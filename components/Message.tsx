import type { ChatMessage } from "@/types"
import { UserIcon, BotIcon } from "./icons"
import { MarkdownRenderer } from "./MarkdownRenderer"
import { cn } from "@/lib/utils"

interface MessageProps {
  message: ChatMessage
  isStreaming?: boolean
}

export function Message({ message, isStreaming = false }: MessageProps) {
  const isUser = message.sender === "user"

  return (
    <div className={cn("flex gap-3 max-w-4xl", isUser ? "ml-auto flex-row-reverse" : "mr-auto")}>
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600",
        )}
      >
        {isUser ? <UserIcon className="w-4 h-4" /> : <BotIcon className="w-4 h-4" />}
      </div>

      {/* Message Content */}
      <div className={cn("flex-1 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl", isUser ? "text-right" : "text-left")}>
        <div
          className={cn(
            "inline-block px-4 py-2 rounded-2xl text-sm leading-relaxed",
            isUser
              ? "bg-purple-600 text-white rounded-br-md"
              : "bg-white text-gray-900 border border-gray-200 rounded-bl-md shadow-sm",
          )}
        >
          <div className="whitespace-pre-wrap break-words">
            {isUser ? (
              <>
                {message.content}
                {isStreaming && <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse" />}
              </>
            ) : (
              <div className="text-left">
                <MarkdownRenderer content={message.content} />
                {isStreaming && <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse" />}
              </div>
            )}
          </div>
        </div>

        <div className={cn("text-xs text-gray-500 mt-1", isUser ? "text-right" : "text-left")}>
          {(message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp)).toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            },
          )}
        </div>
      </div>
    </div>
  )
}
