"use client"

import type React from "react"
import {  BlockMath } from "react-katex"

import { useState } from "react"
import { Camera, Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface MathSolution {
  problem: string
  solution: string
  latexResult: string
  steps: string[]
  finalAnswer: string
}

interface ApiResponse {
  success: boolean
  originalImage: string
  extractedText: string
  solution: MathSolution
}

export default function MathSolverApp() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [solution, setSolution] = useState<MathSolution | null>(null)
  const [extractedText, setExtractedText] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setSolution(null)
        setExtractedText(null)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const solveProblem = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const response = await fetch('http://localhost:3001/solve-math', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to solve problem')
      }

      const data: ApiResponse = await response.json()
      
      setExtractedText(data.extractedText)
      setSolution(data.solution)
      
    } catch (err) {
      console.error('Error solving problem:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  const resetApp = () => {
    setSelectedImage(null)
    setSelectedFile(null)
    setSolution(null)
    setExtractedText(null)
    setError(null)
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-3xl font-bold text-foreground text-balance">Math Problem Solver</h1>
          <p className="text-muted text-pretty">Upload an image of your math problem and get step-by-step solutions</p>
        </div>

        {/* Upload Section */}
        {!selectedImage && (
          <Card className="border-2 border-dashed border-border hover:border-accent transition-colors">
            <CardContent className="p-12">
              <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-accent" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-card-foreground">Upload Math Problem</h3>
                  <p className="text-muted text-sm">Take a photo or upload an image of your math problem</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => document.getElementById("camera-input")?.click()}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>

                  <Button variant="outline" onClick={() => document.getElementById("file-input")?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </div>

                <input
                  id="camera-input"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <input id="file-input" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Preview & Processing */}
        {selectedImage && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Uploaded Problem</h3>

                <div className="relative">
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt="Math problem"
                    className="w-full max-h-64 object-contain rounded-lg border border-border"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                {!solution && !isProcessing && (
                  <Button onClick={solveProblem} className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1">
                    Solve Problem
                  </Button>
                )}

                <Button variant="outline" onClick={resetApp} disabled={isProcessing}>
                  Upload New
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Processing State */}
        {isProcessing && (
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs">🤖</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-blue-800">Solving Your Math Problem...</h3>
                  <div className="space-y-2">
                    <p className="text-blue-600 font-medium">Step 1: Extracting text from image</p>
                    <p className="text-blue-600 font-medium">Step 2: Analyzing the problem</p>
                    <p className="text-blue-600 font-medium">Step 3: Generating solution</p>
                  </div>
                  <p className="text-blue-500 text-sm">
                    This usually takes 10-30 seconds depending on complexity
                  </p>
                </div>
                
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 pb-3 border-b border-red-200">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-red-700">Something went wrong</h3>
              </div>
              <p className="text-red-600 mt-3 text-center">{error}</p>
              <div className="flex gap-3 mt-4 pt-3 border-t border-red-200">
                <Button 
                  onClick={resetApp} 
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Try Again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetApp}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Upload New Image
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Extracted Text Display */}
        {extractedText && (
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-blue-200">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-blue-800">Text Extracted from Image</h3>
              </div>
              
              <div className="bg-white border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 font-medium text-lg leading-relaxed">{extractedText}</p>
              </div>
              
              <p className="text-blue-600 text-sm text-center">
                ✨ AI is now analyzing this text to solve your math problem
              </p>
            </CardContent>
          </Card>
        )}

        {/* Solution Display */}
        {solution && !isProcessing && (
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-8 space-y-6">
              {/* Header with success indicator */}
              <div className="flex items-center gap-3 pb-4 border-b border-green-200">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800">Solution Found!</h3>
                  <p className="text-green-600 text-sm">Your math problem has been solved</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Problem - Highlighted */}
                <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Problem
                  </h4>
                  <p className="text-blue-900 text-lg font-medium">{solution.problem}</p>
                </div>

                {/* Steps - Better organized */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-lg">🔢</span>
                    Step-by-Step Solution
                  </h4>
                  <div className="space-y-4">
                    {solution.steps.map((step, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 pt-1">
                        <p className="text-gray-700 leading-relaxed">
  <BlockMath math={step} />
</p>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Answer - Prominent */}
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-lg p-6 text-center">
                  <h4 className="font-bold text-green-800 mb-3 flex items-center justify-center gap-2">
                    <span className="text-xl">🎯</span>
                    Final Answer
                  </h4>
                  <div className="text-2xl font-bold text-green-900 bg-white px-6 py-3 rounded-lg border border-green-200 shadow-sm">
                    {solution.finalAnswer}
                  </div>
                </div>

                {/* LaTeX - Technical but clean */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="text-lg">📊</span>
                    LaTeX Format
                  </h4>
                  <div className="bg-white border border-gray-300 rounded px-4 py-3">
                  <div className="p-3 bg-white border rounded">
  <BlockMath math={solution.latexResult} />
</div>

                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-4 border-t border-green-200">
                <Button 
                  onClick={resetApp} 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Solve Another Problem
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    // Copy solution to clipboard
                    const solutionText = `Problem: ${solution.problem}\n\nSolution:\n${solution.steps.map((step, i) => `Step ${i + 1}: ${step}`).join('\n')}\n\nFinal Answer: ${solution.finalAnswer}`;
                    navigator.clipboard.writeText(solutionText);
                  }}
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  Copy Solution
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
