"use client";

import React from "react";
import {
  Select as MantineSelect,
  MultiSelect as MantineMultiSelect,
} from "@mantine/core";
import type { SelectProps, MultiSelectProps } from "@mantine/core";

const debounce = (callback: Function, delay: number) => {
  let tid: any;
  return function (...args: any[]) {
    const ctx = self;
    tid && clearTimeout(tid);
    tid = setTimeout(() => {
      callback.apply(ctx, args);
    }, delay);
  };
};

const _ = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ {
  constructor(callback: any) {
    callback = debounce(callback, 20);
    super(callback);
  }
};

// OR suppress only the specific error:
window.addEventListener("error", (e) => {
  if (
    e.message ===
    "ResizeObserver loop completed with undelivered notifications."
  ) {
    e.stopImmediatePropagation();
  }
});

interface SelectWrapperProps extends SelectProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

interface MultiSelectWrapperProps extends MultiSelectProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export function Select({ children, onClick, ...props }: SelectWrapperProps) {
  return (
    <MantineSelect onClick={onClick} {...props}>
      {children}
    </MantineSelect>
  );
}

export function MultiSelect({
  children,
  onClick,
  ...props
}: MultiSelectWrapperProps) {
  return (
    <MantineMultiSelect onClick={onClick} {...props}>
      {children}
    </MantineMultiSelect>
  );
}
