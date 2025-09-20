"use client"

import { FEATURES } from "@/constants"
import type { Feature } from "@/types"
import { iconMap } from "./icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface FeatureMenuProps {
  onFeatureSelect: (feature: Feature) => void
}

export function FeatureMenu({ onFeatureSelect }: FeatureMenuProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">AI Assistant Hub</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
          Choose from our specialized AI assistants to help you with various tasks. Each assistant is tailored for
          specific needs and expertise.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature) => {
          const IconComponent = iconMap[feature.icon as keyof typeof iconMap]

          return (
            <Card
              key={feature.id}
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-purple-200 bg-white/80 backdrop-blur-sm"
              onClick={() => onFeatureSelect(feature)}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-purple-100 to-cyan-100 group-hover:from-purple-200 group-hover:to-cyan-200 transition-colors duration-200">
                  <IconComponent className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-200">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-sm text-gray-500">
        <p>Powered by Google Gemini AI • Select a feature to get started</p>
      </div>
    </div>
  )
}
