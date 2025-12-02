"use client";

import React from "react";
import {
  Stepper as MantineStepper,
  StepperStep as MantineStepperStep,
  StepperCompleted as MantineStepperCompleted,
  type StepperProps,
} from "@mantine/core";

interface StepperWrapperProps extends StepperProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Stepper({ children, onClick, ...props }: StepperWrapperProps) {
  return (
    <MantineStepper onClick={onClick} {...props}>
      {children}
    </MantineStepper>
  );
}

// ✅ Correct re-exports
export const StepperStep = MantineStepperStep;
export const StepperCompleted = MantineStepperCompleted;
