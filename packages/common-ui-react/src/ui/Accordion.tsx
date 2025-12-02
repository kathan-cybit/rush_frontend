"use client";

import React from "react";
import {
  Accordion as MantineAccordion,
  AccordionItem as MantineAccordionItem,
  AccordionControl as MantineAccordionControl,
  AccordionPanel as MantineAccordionPanel,
  type AccordionProps,
} from "@mantine/core";

interface AccordionWrapperProps extends AccordionProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Accordion({ children, onClick, ...props }: AccordionWrapperProps) {
  return (
    <MantineAccordion onClick={onClick} {...props}>
      {children}
    </MantineAccordion>
  );
}

// ✅ Correct re-exports
export const AccordionItem = MantineAccordionItem;
export const AccordionControl = MantineAccordionControl;
export const AccordionPanel = MantineAccordionPanel;
