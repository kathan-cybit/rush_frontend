"use client"

import React from "react"
import { DatePickerInput as MantineDatePicker, DateTimePicker as MantineDateTimePicker } from "@mantine/dates"
import type { DatePickerProps, DatesRangeValue, DateTimePickerProps, DateValue } from "@mantine/dates"

import type { DatePickerInputProps } from "@mantine/dates";

interface DatePickerWrapperProps extends Omit<DatePickerInputProps, "onChange"> {
  onChange?: (value: DateValue | DatesRangeValue | Date[]) => void
}

interface DateTimePickerWrapperProps extends DateTimePickerProps {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function DatePicker({ onChange, ...props }: DatePickerWrapperProps) {
  return (
    <MantineDatePicker
      onChange={onChange}
      {...props}
    />
  )
}
export function DateTimePicker({ children, onChange, ...props }: DateTimePickerWrapperProps) {
  return (
    <MantineDateTimePicker onChange={onChange} {...props}>
      {children}
    </MantineDateTimePicker>
  )
}
