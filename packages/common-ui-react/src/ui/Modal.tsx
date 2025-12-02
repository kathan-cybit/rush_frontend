"use client";

import React from "react";
import {
  Modal as MantineModal,
  ModalRoot as MantineModalRoot,
  ModalOverlay as MantineModalOverlay,
  ModalContent as MantineModalContent,
  ModalHeader as MantineModalHeader,
  ModalTitle as MantineModalTitle,
  ModalCloseButton as MantineModalCloseButton,
  ModalBody as MantineModalBody,
  type ModalProps,
} from "@mantine/core";

interface ModalWrapperProps extends ModalProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Modal({ children, onClick, ...props }: ModalWrapperProps) {
  return (
    <MantineModal onClick={onClick} {...props}>
      {children}
    </MantineModal>
  );
}

// ✅ Correct re-exports
export const ModalRoot = MantineModalRoot;
export const ModalOverlay = MantineModalOverlay;
export const ModalContent = MantineModalContent;
export const ModalHeader = MantineModalHeader;
export const ModalTitle = MantineModalTitle;
export const ModalCloseButton = MantineModalCloseButton;
export const ModalBody = MantineModalBody;
