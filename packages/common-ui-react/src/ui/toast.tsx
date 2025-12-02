"use client"

import React from "react"

import { notifications, showNotification } from "@mantine/notifications"
import type { NotificationData } from "@mantine/notifications"

export interface ToastProps extends Omit<NotificationData, "id"> {
  variant?: "default" | "destructive"
}

export function toast({ variant = "default", ...props }: ToastProps) {
  const color = variant === "destructive" ? "red" : "blue"

  return notifications.show({
    ...props,
    color,
  })
}


export const toastSuccess = (message: string, title = 'Success') => {
    console.log(message);
  showNotification({
    title,
    message,
    color: 'green',
  });
};

export const toastError = (message: string, title = 'Error') => {
  showNotification({
    title,
    message,
    color: 'red',
  });
};

export const toastInfo = (message: string, title = 'Info') => {
  showNotification({
    title,
    message,
    color: 'blue',
  });
};

export const useToast = () => {
  return {
    toast,
    dismiss: notifications.hide,
    dismissAll: notifications.clean,
  }
}

// Toast component for displaying notifications
export function Toast({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function ToastViewport() {
  return null
}

export function ToastTitle({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function ToastDescription({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function ToastAction({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function ToastClose() {
  return null
}
