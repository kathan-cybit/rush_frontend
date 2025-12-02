"use client"

import React from "react"
import {
  Button as MantineButton,
  UnstyledButton as MantineUnstyledButton,
  ActionIcon as MantineActionIcon
} from "@mantine/core"
import type { ButtonProps, UnstyledButtonProps, ActionIconProps } from "@mantine/core"


type ButtonWrapperProps = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
export function Button({ children, onClick, ...props }: ButtonWrapperProps) {
  console.log("Button12 rendered:", MantineButton);
  return (
      <MantineButton onClick={onClick} {...props}>
        {children}
      </MantineButton>
  );
}

type UnstyledButtonWrapperProps = UnstyledButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
export function UnstyledButton({ children, onClick, ...props }: UnstyledButtonWrapperProps) {
  return (
    <MantineUnstyledButton onClick={onClick} {...props}>
      {children}
    </MantineUnstyledButton>
  )
}

type ActionIconWrapperProps = ActionIconProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
export function ActionIcon({ children, onClick, variant = "subtle", color = "dark", radius = "xl", size = "lg", ...props }: ActionIconWrapperProps) {
  return (
    <MantineActionIcon onClick={onClick} variant={variant} color={color} radius={radius} size={size} {...props}>
      {children}
    </MantineActionIcon>
  )
}
