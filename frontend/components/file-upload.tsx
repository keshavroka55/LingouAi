"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"

interface FileUploadProps {
  onFileUpload: (text: string) => void
  isLoading?: boolean
}

export default function FileUpload({ onFileUpload, isLoading = false }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    processFiles(e.dataTransfer.files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files)
    }
  }

  const processFiles = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (
        file.type === "text/plain" ||
        file.type === "text/markdown" ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".md")
      ) {
        const text = await file.text()
        onFileUpload(text)
        break
      }
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
        isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-surface-alt"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input
        type="file"
        id="file-upload"
        onChange={handleFileInput}
        className="hidden"
        accept=".txt,.md"
        disabled={isLoading}
      />
      <label htmlFor="file-upload" className="cursor-pointer block">
        <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
        <p className="text-foreground font-semibold">Drag and drop your file here</p>
        <p className="text-sm text-foreground-muted">or click to select (TXT, MD)</p>
      </label>
    </div>
  )
}
