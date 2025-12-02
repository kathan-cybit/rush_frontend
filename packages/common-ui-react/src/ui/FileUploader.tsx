"use client"

import React from "react"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"

interface FileUploaderProps {
  onUpload: (files: any[]) => void
  maxSize?: number // in MB
  allowedTypes?: string[]
}

export function FileUploader({
  onUpload,
  maxSize = 5, // Default 5MB
  allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/sinx",      // For .sinx files
    "application/octet-stream", // Fallback for binary files
    "text/plain"            // Fallback if files are text-based
  ],
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    await processFiles(Array.from(files))

    // Reset the input so the same file can be uploaded again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (!files || files.length === 0) return

    await processFiles(Array.from(files))
  }

  const processFiles = async (files: File[]) => {
    setError(null)

    const validFiles: any[] = []
    const invalidFiles: string[] = []

    for (const file of files) {
      console.log(`Processing file: ${file.name}, type: ${file.type}, size: ${file.size} bytes`)
      // Check file type
      // if (!allowedTypes.includes(file.type)) {
      //   invalidFiles.push(`${file.name} (invalid type)`)
      //   continue
      // }

      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        invalidFiles.push(`${file.name} (exceeds ${maxSize}MB)`)
        continue
      }

      // Convert file to base64
      try {
        const base64 = await fileToBase64(file)
        validFiles.push({
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64,
          file: file, // Keep the original file object for further processing if needed
        })
      } catch (error) {
        invalidFiles.push(`${file.name} (conversion error)`)
      }
    }

    if (invalidFiles.length > 0) {
      setError(`Some files couldn't be uploaded: ${invalidFiles.join(", ")}`)
    }

    if (validFiles.length > 0) {
      onUpload(validFiles)
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="space-y-2">
      <div
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/20 hover:border-primary/50"
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
          
        />
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Drag and drop files here, or click to select files</p>
        <p className="text-xs text-muted-foreground mt-1">
          Supported formats: JPG, PNG, PDF, DOC, DOCX, SINX
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
