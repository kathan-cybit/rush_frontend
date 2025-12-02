"use client";

import React from "react";
import {
  Dropzone as MantineDropzone,
  DropzoneAccept as MantineDropzoneAccept,
  DropzoneReject as MantineDropzoneReject,
  DropzoneIdle as MantineDropzoneIdle,
  type DropzoneProps,
} from "@mantine/dropzone";

interface DropzoneWrapperProps extends DropzoneProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Dropzone({ children, onClick, ...props }: DropzoneWrapperProps) {
  return (
    <MantineDropzone onClick={onClick} {...props}>
      {children}
    </MantineDropzone>
  );
}

// ✅ Re-export Mantine subcomponents correctly
export const DropzoneAccept = MantineDropzoneAccept;
export const DropzoneReject = MantineDropzoneReject;
export const DropzoneIdle = MantineDropzoneIdle;
