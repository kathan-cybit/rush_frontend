"use client"

import React from "react"

import { Modal, Button, Group, Text, Title } from "@mantine/core"
import type { ModalProps, ButtonProps } from "@mantine/core"

interface AlertDialogProps extends ModalProps {
  children: React.ReactNode
}

export function AlertDialog({ children, ...props }: AlertDialogProps) {
  return (
    <Modal {...props} centered withCloseButton={false} size="sm">
      {children}
    </Modal>
  )
}

export function AlertDialogTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

interface AlertDialogContentProps {
  children: React.ReactNode
  className?: string
}

export function AlertDialogContent({ children, className }: AlertDialogContentProps) {
  return <div className={className}>{children}</div>
}

interface AlertDialogHeaderProps {
  children: React.ReactNode
  className?: string
}

export function AlertDialogHeader({ children, className }: AlertDialogHeaderProps) {
  return (
    <div className={className} style={{ marginBottom: "16px" }}>
      {children}
    </div>
  )
}

interface AlertDialogFooterProps {
  children: React.ReactNode
  className?: string
}

export function AlertDialogFooter({ children, className }: AlertDialogFooterProps) {
  return (
    <Group justify="flex-end" className={className} style={{ marginTop: "24px", gap: "8px" }}>
      {children}
    </Group>
  )
}

interface AlertDialogTitleProps {
  children: React.ReactNode
  className?: string
}

export function AlertDialogTitle({ children, className }: AlertDialogTitleProps) {
  return (
    <Title order={4} className={className} style={{ marginBottom: "8px" }}>
      {children}
    </Title>
  )
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function AlertDialogDescription({ children, className }: AlertDialogDescriptionProps) {
  return (
    <Text size="sm" c="gray.6" className={className}>
      {children}
    </Text>
  )
}

interface AlertDialogActionProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function AlertDialogAction({ children, onClick, ...props }: AlertDialogActionProps) {
  return (
    <Button {...props} onClick={onClick} color="red">
      {children}
    </Button>
  )
}

interface AlertDialogCancelProps extends ButtonProps {
  children: React.ReactNode
}

export function AlertDialogCancel({ children, ...props }: AlertDialogCancelProps) {
  return (
    <Button variant="outline" {...props}>
      {children}
    </Button>
  )
}
