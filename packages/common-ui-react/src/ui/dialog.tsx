"use client"

import React from "react"
import { useMediaQuery } from "@mantine/hooks"
import { Modal, Button, Group, Title, Text, Divider } from "@mantine/core"
import type { ModalProps, ButtonProps } from "@mantine/core"

interface DialogProps extends ModalProps {
  title: string
  children: React.ReactNode
}

export function Dialog({ title, children, ...props }: DialogProps) {
  const isMobile = useMediaQuery("(max-width: 639px)")

  return (
    <Modal
      {...props}
      centered={isMobile}
      withCloseButton
      radius="sm"
      padding="lg"
      title={<Text size="lg" fw={600}>{title}</Text>}
      classNames={{
        body: "p-0 bg-white/90 backdrop-blur-md rounded-b-lg overflow-y-auto h-full",
      }}
      styles={{
        content: {
          ...(isMobile
            ? {
              width: "100%",
              maxWidth: "100vw",
              margin: "1rem",
              height: "calc(100vh - 2rem)", // top + bottom on mobile
              padding: 0,
              display: "flex",
              flexDirection: "column",
            }
            : {
              position: "fixed",
              top: "1rem",
              right: "1rem",
              left: "auto",
              width: "fit-content",
              minWidth: "540px",
              maxWidth: "90vw",
              minHeight: "calc(100vh - 2rem)", // ensures small gap at bottom
              height: "auto",
              maxHeight: "calc(100vh - 2rem)", // ensures small gap at
              padding: 0,
              display: "flex",
              flexDirection: "column",
              margin: 0,
              transform: "none",
            }),
        },
      }}
    >
      <div className="overflow-x-auto scrollbar-hide flex-1">{children}</div>
    </Modal>
  )
}

export function DialogTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

export function DialogContent({ children, className }: DialogContentProps) {
  return (
    <div
      className={`sm:px-6 flex-1 overflow-y-auto ${className ?? ""}`}
      style={{ backgroundColor: "white", borderRadius: "0 0 8px 8px" }}
    >
      {children}
    </div>
  );
}

interface DialogHeaderProps {
  children: React.ReactNode
  className?: string
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return (
    <div
      className={`border-b border-gray-200 sm:px-8 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

interface DialogFooterProps {
  children: React.ReactNode
  className?: string
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <Group
      justify="flex-end"
      className={`border-t border-gray-200 px-6 py-4 sm:px-8 sm:py-6 ${className ?? ""}`}
    >
      {children}
    </Group>
  );
}

interface DialogTitleProps {
  children: React.ReactNode
  className?: string
}

export function DialogTitle({ children, className }: DialogTitleProps) {
  return (
    <h2
      className={`text-lg font-semibold text-gray-900 ${className ?? ""}`}
      style={{ marginBottom: "4px" }}
    >
      {children}
    </h2>
  );
}

interface DialogDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function DialogDescription({ children, className }: DialogDescriptionProps) {
  return (
    <p
      className={`text-sm text-gray-600 ${className ?? ""}`}
      style={{ marginTop: "4px" }}
    >
      {children}
    </p>
  );
}
export function DialogClose({
  children,
  ...props
}: ButtonProps & { children: React.ReactNode }) {
  return (
    <Button
      variant="outline"
      color="gray"
      className="border-gray-300 text-gray-700 hover:bg-gray-50"
      {...props}
    >
      {children}
    </Button>
  )
}

export function DialogAction({
  children,
  ...props
}: ButtonProps & { children: React.ReactNode }) {
  return (
    <Button
      variant="filled"
      color="blue"
      className="bg-blue-600 hover:bg-blue-700"
      {...props}
    >
      {children}
    </Button>
  )
}