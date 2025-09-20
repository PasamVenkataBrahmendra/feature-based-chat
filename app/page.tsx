"use client"

import { useState } from "react"
import { FeatureMenu } from "@/components/FeatureMenu"
import { ChatWindow } from "@/components/ChatWindow"
import type { Feature } from "@/types"

export default function Home() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)

  const handleFeatureSelect = (feature: Feature) => {
    setSelectedFeature(feature)
  }

  const handleBackToMenu = () => {
    setSelectedFeature(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      {selectedFeature ? (
        <ChatWindow feature={selectedFeature} onBack={handleBackToMenu} />
      ) : (
        <FeatureMenu onFeatureSelect={handleFeatureSelect} />
      )}
    </main>
  )
}
