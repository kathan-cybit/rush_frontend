"use client"

import React from "react"
import { Text as MantineText, Title as MantineTitle } from "@mantine/core"
import type { TextProps, TitleProps } from "@mantine/core"

interface TextWrapperProps extends TextProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

interface TitleWrapperProps extends TitleProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLHeadingElement>) => void
}

export function Text({ children, onClick, ...props }: TextWrapperProps) {
  return (
    <MantineText onClick={onClick} {...props}>
      {children}
    </MantineText>
  )
}

export function Title({ children, onClick, ...props }: TitleWrapperProps) {
  return (
    <MantineTitle onClick={onClick} {...props}>
      {children}
    </MantineTitle>
  )
}
