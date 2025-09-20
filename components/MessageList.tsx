import type { ChatMessage } from "@/types"
import { Message } from "./Message"
import { TypingIndicator } from "./TypingIndicator"

interface MessageListProps {
  messages: ChatMessage[]
  streamingMessage: string
  isLoading: boolean
}

export function MessageList({ messages, streamingMessage, isLoading }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}

      {streamingMessage && (
        <Message
          message={{
            id: "streaming",
            content: streamingMessage,
            sender: "bot",
            timestamp: new Date(),
          }}
          isStreaming
        />
      )}

      {isLoading && !streamingMessage && <TypingIndicator />}
    </div>
  )
}
