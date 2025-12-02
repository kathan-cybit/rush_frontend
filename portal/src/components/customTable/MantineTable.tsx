import {
  Table,
  ScrollArea,
  Select,
  Pagination,
  Group,
  UnstyledButton,
  Text,
} from "@mantine/core";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  IconChevronUp,
  IconChevronDown,
  IconSelector,
} from "@tabler/icons-react";
import { useState } from "react";
import "./table.css";

function SortIcon({ sorted }: any) {
  if (!sorted) return <IconSelector size={14} stroke={1.5} />;
  if (sorted === "asc") return <IconChevronUp size={14} stroke={1.5} />;
  return <IconChevronDown size={14} stroke={1.5} />;
}

export default function CustomTableMantine({
  data,
  columns,
  staticTable = false,
  isPagination = true,
  paginationObj,
  totalCount,
  manualSorting = false,
  globalFilter,
  onPageChange,
  onRowClick,
}: any) {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable(
    (staticTable
      ? {
          data,
          columns,
          state: {
            sorting,
            globalFilter,
            pagination,
          },
          onSortingChange: setSorting,
          onPaginationChange: setPagination,
          getCoreRowModel: getCoreRowModel(),
          getSortedRowModel: getSortedRowModel(),
          getFilteredRowModel: getFilteredRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
          manualPagination: false,
          autoResetPageIndex: false,
        }
      : {
          data,
          columns,
          state: { sorting },
          manualSorting: manualSorting,
          manualPagination: true,
          pageCount: Math.ceil(totalCount / paginationObj.pageSize),
          onSortingChange: setSorting,
          getCoreRowModel: getCoreRowModel(),
          getSortedRowModel: getSortedRowModel(),
        }) as any
  );

  const totalPages = staticTable
    ? table.getPageCount()
    : Math.ceil(totalCount / paginationObj.pageSize);

  const currentPageIndex = staticTable
    ? table.getState().pagination.pageIndex
    : paginationObj.pageIndex;

  const currentPageSize = staticTable
    ? table.getState().pagination.pageSize
    : paginationObj.pageSize;

  return (
    <div className="custom-table-wrapper">
      <ScrollArea className="table-container">
        <Table className="custom-table" highlightOnHover>
          {/* HEADER */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.column.getCanSort() ? (
                      <UnstyledButton
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ width: "100%" }}
                      >
                        <Group justify="space-between">
                          <Text size="xs">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Text>
                          {/* <Center>
                            <SortIcon sorted={header.column.getIsSorted()} />
                          </Center> */}
                        </Group>
                      </UnstyledButton>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* BODY */}
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? "clickable" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="no-data" colSpan={columns.length}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>

      {/* PAGINATION AREA */}
      {isPagination && (
        <div className="d-flex align-items-center justify-content-between my-3 pagination-controls">
          <Select
            className="limit-cus"
            value={String(currentPageSize)}
            onChange={(value) => {
              if (staticTable) {
                table.setPageSize(Number(value));
                table.setPageIndex(0);
              } else {
                onPageChange(0, Number(value));
              }
            }}
            data={[
              { value: "10", label: "Limit: 10" },
              { value: "50", label: "Limit: 50" },
              { value: "100", label: "Limit: 100" },
            ]}
            disabled={staticTable ? data.length <= 10 : totalCount <= 10}
          />

          <Pagination
            total={totalPages}
            value={currentPageIndex + 1}
            onChange={(page) => {
              if (staticTable) {
                table.setPageIndex(page - 1);
              } else {
                onPageChange(page - 1, currentPageSize);
              }
            }}
            classNames={{
              control: "page-item",
            }}
          />
        </div>
      )}
    </div>
  );
}
