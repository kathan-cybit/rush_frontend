"use client"

import React from "react"
import { Slider as MantineSlider, RangeSlider as MantineRangeSlider } from "@mantine/core"
import type { SliderProps, RangeSliderProps } from "@mantine/core"

interface SliderWrapperProps extends SliderProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

interface RangeSliderWrapperProps extends RangeSliderProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function Slider({ children, onClick, ...props }: SliderWrapperProps) {
  return (
    <MantineSlider onClick={onClick} {...props}>
      {children}
    </MantineSlider>
  )
}

export function RangeSlider({ children, onClick, ...props }: RangeSliderWrapperProps) {
  return (
    <MantineRangeSlider onClick={onClick} {...props}>
      {children}
    </MantineRangeSlider>
  )
}
