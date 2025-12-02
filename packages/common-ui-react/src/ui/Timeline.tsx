"use client";

import React from "react";
import {
  Timeline as MantineTimeline,
  TimelineItem as MantineTimelineItem,
  type TimelineProps,
} from "@mantine/core";

interface TimelineWrapperProps extends TimelineProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Timeline({ children, onClick, ...props }: TimelineWrapperProps) {
  return (
    <MantineTimeline onClick={onClick} {...props}>
      {children}
    </MantineTimeline>
  );
}

// ✅ Correct re-export
export const TimelineItem = MantineTimelineItem;
