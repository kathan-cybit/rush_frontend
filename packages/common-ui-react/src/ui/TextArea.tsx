"use client"

import * as React from "react"
import { Textarea as MantineTextarea } from "@mantine/core"
import { cn } from "../library/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <MantineTextarea
      className={cn(className,)}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"
