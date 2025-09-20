export class GeminiService {
  private chatHistories: Map<string, any[]> = new Map()

  async sendMessage(featureId: string, message: string, onChunk: (chunk: string) => void) {
    try {
      const history = this.chatHistories.get(featureId) || []

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          featureId,
          message,
          history,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("No response body")
      }

      const decoder = new TextDecoder()
      let fullResponse = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6)
            if (data === "[DONE]") {
              // Update chat history
              const updatedHistory = [
                ...history,
                { role: "user", parts: [{ text: message }] },
                { role: "model", parts: [{ text: fullResponse }] },
              ]
              this.chatHistories.set(featureId, updatedHistory)
              return fullResponse
            }

            try {
              const parsed = JSON.parse(data)
              if (parsed.chunk) {
                fullResponse += parsed.chunk
                onChunk(parsed.chunk)
              }
            } catch (e) {
              // Ignore parsing errors for incomplete chunks
            }
          }
        }
      }

      return fullResponse
    } catch (error) {
      console.error("Error sending message:", error)
      throw error
    }
  }

  clearChat(featureId: string) {
    this.chatHistories.delete(featureId)
  }
}

export const geminiService = new GeminiService()
