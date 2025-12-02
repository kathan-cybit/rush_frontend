import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import "./table.css";
import ReactPaginate from "react-paginate";

function CustomTable({
  data,
  columns,
  manualPagination = true,
  staticTable = false,
  globalFilter,
  isPagination = true,
  paginationObj,
  totalCount,
  manualSorting,
  onPageChange,
  onRowClick,
}: any) {
  const [sorting, setSorting] = useState([]);

  const handlePageChange = (event: any) => {
    onPageChange(event.selected, paginationObj?.pageSize);
  };

  const [pagination, setPaginationx] = useState({
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
          onPaginationChange: setPaginationx,
          getCoreRowModel: getCoreRowModel(),
          getSortedRowModel: getSortedRowModel(),
          getFilteredRowModel: getFilteredRowModel(),
          manualPagination: true,
          //   getPaginationRowModel: getPaginationRowModel(),
          autoResetPageIndex: false,
        }
      : {
          columns,
          data,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: isPagination
            ? getPaginationRowModel()
            : undefined,
          initialState: { pagination: paginationObj },
          pageCount: Math.ceil(totalCount / paginationObj?.pageSize),
          manualPagination: manualPagination,
          manualSorting: manualSorting,
          getSortedRowModel: getSortedRowModel(),
          state: {
            sorting,
          },
          onSortingChange: setSorting,
        }) as any
  );
  const totalPages = Math.ceil(totalCount / paginationObj?.pageSize);
  return (
    <>
      <div className="custom-table-wrapper">
        <div className="table-container">
          <table className="custom-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => onRowClick?.(row)}
                    className={onRowClick ? "row-clickable" : ""}
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
                  <td colSpan={columns.length} className="no-data">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {!isPagination ? (
          <div className="flex justify-between items-center my-3 pagination-controls">
            <div className="flex items-center gap-3">
              <select
                className={`cursor-pointer form-select form-select-sm limit-cus ${
                  data.length <= 10
                    ? "py-2 ps-2 pe-5 text-center content-center"
                    : ""
                }`}
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                  table.setPageIndex(0);
                }}
              >
                {[10, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    Limit: {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link page-link-custom"
                previousClassName="page-item"
                previousLinkClassName="page-link page-link-custom"
                nextClassName="page-item page-link-custom"
                nextLinkClassName="page-link page-link-custom"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link page-link-custom"
                pageCount={table.getPageCount()}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={(e) => table.setPageIndex(e.selected)}
                containerClassName="pagination mb-0"
                activeClassName="active"
                forcePage={table.getState().pagination.pageIndex}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center my-3 pagination-controls">
            <div className="flex items-center gap-3">
              <select
                style={{ cursor: "pointer" }}
                disabled={totalCount <= 10}
                className={`form-select form-select-sm limit-cus ${
                  totalCount <= 10 ? "p-2 text-center content-center" : ""
                }`}
                value={paginationObj?.pageSize}
                onChange={(e) => onPageChange(0, Number(e.target.value))}
              >
                {[10, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    Limit: {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex gap-2">
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link page-link-custom"
                previousClassName="page-item"
                previousLinkClassName="page-link page-link-custom"
                nextClassName="page-item page-link-custom"
                nextLinkClassName="page-link page-link-custom"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link page-link-custom"
                pageCount={totalPages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={handlePageChange}
                containerClassName="pagination mb-0"
                activeClassName="active"
                forcePage={paginationObj?.pageIndex}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CustomTable;
