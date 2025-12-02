"use client"

import React from "react"
import { TextInput as MantineTextInput, PasswordInput as MantinePasswordInput } from "@mantine/core"
import type { TextInputProps, PasswordInputProps } from "@mantine/core"

interface TextInputWrapperProps extends TextInputProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}

interface PasswordInputWrapperProps extends PasswordInputProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}

export function TextInput({ children, onClick, ...props }: TextInputWrapperProps) {
  return (
    <MantineTextInput onClick={onClick} {...props}>
      {children}
    </MantineTextInput>
  )
}

export function PasswordInput({ children, onClick, ...props }: PasswordInputWrapperProps) {
  return (
    <MantinePasswordInput onClick={onClick} {...props}>
      {children}
    </MantinePasswordInput>
  )
}
