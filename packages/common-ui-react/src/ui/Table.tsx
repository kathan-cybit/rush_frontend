"use client";

import React from "react";
import {
  Table as MantineTable,
  TableThead as MantineTableThead,
  TableTbody as MantineTableTbody,
  TableTfoot as MantineTableTfoot,
  TableTr as MantineTableTr,
  TableTh as MantineTableTh,
  TableTd as MantineTableTd,
  TableCaption as MantineTableCaption,
  type TableProps,
} from "@mantine/core";

interface TableWrapperProps extends TableProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLTableElement>) => void;
}

export function Table({ children, onClick, ...props }: TableWrapperProps) {
  return (
    <MantineTable onClick={onClick} {...props}>
      {children}
    </MantineTable>
  );
}

// ✅ Correct re-exports
export const TableThead = MantineTableThead;
export const TableTbody = MantineTableTbody;
export const TableTfoot = MantineTableTfoot;
export const TableTr = MantineTableTr;
export const TableTh = MantineTableTh;
export const TableTd = MantineTableTd;
export const TableCaption = MantineTableCaption;
