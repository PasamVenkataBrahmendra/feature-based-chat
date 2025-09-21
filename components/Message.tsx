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
    <div
      className={cn(
        "flex gap-1 sm:gap-2 max-w-3xl px-1 sm:px-2 py-1", // tighter gap & padding
        isUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center", // smaller avatar
          isUser ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
        )}
      >
        {isUser ? <UserIcon className="w-4 h-4" /> : <BotIcon className="w-4 h-4" />}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "flex-1 max-w-[70%] sm:max-w-[80%] md:max-w-lg lg:max-w-xl", // controlled width for tighter layout
          isUser ? "text-right" : "text-left"
        )}
      >
        <div
          className={cn(
            "inline-block px-2 sm:px-3 py-1.5 rounded-2xl text-sm leading-5 whitespace-pre-wrap break-words", // tighter line-height & padding
            isUser
              ? "bg-purple-600 text-white rounded-br-md"
              : "bg-white text-gray-900 border border-gray-200 rounded-bl-md shadow-sm"
          )}
        >
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

        {/* Timestamp */}
        <div
          className={cn(
            "text-[9px] sm:text-[10px] text-gray-400 mt-0.25", // smaller timestamp + tighter margin
            isUser ? "text-right" : "text-left"
          )}
        >
          {(message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp)).toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )}
        </div>
      </div>
    </div>
  )
}
