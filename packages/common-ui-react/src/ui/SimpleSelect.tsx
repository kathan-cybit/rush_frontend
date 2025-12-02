"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "./Button"
import { ChevronDown } from "lucide-react"

interface SimpleSelectProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  options: { value: string; label: string }[]
  className?: string
}

export function SimpleSelect({
  value,
  onValueChange,
  placeholder = "Select an option",
  options,
  className,
}: SimpleSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <Button type="button" variant="outline" className="w-full justify-between" onClick={() => setIsOpen(!isOpen)}>
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg">
          <div className="max-h-60 overflow-auto py-1">
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-3 py-2 cursor-pointer hover:bg-slate-100 ${
                  option.value === value ? "bg-slate-100 font-medium" : ""
                }`}
                onClick={() => {
                  onValueChange(option.value)
                  setIsOpen(false)
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
