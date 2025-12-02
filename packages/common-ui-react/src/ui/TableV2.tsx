import {
  Table,
  Text,
  Button,
  ScrollArea,
  Select,
  Pagination,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  Paper,
  Menu,
  ActionIcon,
  Badge,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import React, { useState, useRef, useEffect } from "react";
import {
  IconDotsVertical,
  IconPencil,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
  IconSearch,
  IconPlus,
  IconFileText,
  IconFolder,
  IconFilter,
  IconEye,
  IconStatusChange,
  IconSettings,
  IconExternalLink,
} from "@tabler/icons-react";
import { conditionColorMap } from "../library/conditions";

interface TableV2Props<T> {
  data: T[];
  onRowClick?: (event: React.MouseEvent, row: T) => void;
  hideAction?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  menuItems?: Array<{
    label: string;
    icon: React.ReactNode;
    color?: string;
    onClick: (item: T) => void;
  }>;
  statusColorMap: Record<string, string>;
  changeStatus?: (pole: any) => void;
  onStartInspection?: (item: T) => void;
  hideForPoles?: boolean; // Optional prop to hide the table header for poles
  defaultSort?: { key: string; direction: "asc" | "desc" };
}

export const TableV2 = <T extends Record<string, any>>({
  data,
  hideAction = false,
  onRowClick,
  onEdit,
  onDelete,
  menuItems,
  statusColorMap,
  onView,
  changeStatus,
  onStartInspection,
  hideForPoles,
  defaultSort,
}: TableV2Props<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(defaultSort || null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const columnRefs = useRef<Record<string, HTMLTableCellElement | null>>({});
  const [columnSearch, setColumnSearch] = useState<Record<string, string>>({});

  const filteredData = data.filter((item) => {
    const columnMatch = Object.entries(columnSearch)
      .filter(([_, value]) => value?.trim()) // ✅ Only filter non-empty fields
      .every(([key, value]) =>
        item[key]?.toString().toLowerCase().includes(value.toLowerCase())
      );

    const globalMatch = searchTerm
      ? Object.values(item).some((val) =>
          val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    return columnMatch && globalMatch;
  });

  const sortedData = [...filteredData];
  if (sortConfig) {
    sortedData.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // ✅ Detect and handle dates
      const isDate =
        aVal instanceof Date ||
        bVal instanceof Date ||
        (!isNaN(Date.parse(aVal)) && !isNaN(Date.parse(bVal)));

      if (isDate) {
        const aTime = new Date(aVal).getTime();
        const bTime = new Date(bVal).getTime();
        if (aTime < bTime) return sortConfig.direction === "asc" ? -1 : 1;
        if (aTime > bTime) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      }

      // ✅ Fallback: string comparison
      const aStr = String(aVal ?? "").toLowerCase();
      const bStr = String(bVal ?? "").toLowerCase();

      if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );

  // const headings = data.length > 0 ? Object.keys(data[0]) : [];

  const headings =
    data.length > 0
      ? Object.keys(data[0]).filter(
          (key) =>
            key !== "id" &&
            key !== "jobid" &&
            key !== "project_id" &&
            key !== "lat" &&
            key !== "lon" &&
            key !== "iseditable"
        )
      : [];
  const totalColumns = headings.length + (hideAction ? 0 : 1);
  const equalWidth = `${100 / totalColumns}%`;

  // ✅ Fix: Initialize columnSearch
  useEffect(() => {
    const initialSearch: Record<string, string> = {};
    headings.forEach((key) => {
      initialSearch[key] = "";
    });
    setColumnSearch(initialSearch);
  }, [headings.join(",")]); // trigger only when headings change

  // Set equal column widths
  useEffect(() => {
    const initial: Record<string, number> = {};
    headings.forEach((key) => {
      initial[key] = 150;
    });
    //setColumnWidths(initial);
  }, [data]);

  const handleMouseDown = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[key];

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX);
      setColumnWidths((prev) => ({
        ...prev,
        [key]: Math.max(newWidth, 60),
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const defaultMenuItems = [
    ...(onEdit
      ? [{ label: "Edit", icon: <IconPencil size={14} />, onClick: onEdit }]
      : []),
    ...(onView
      ? [{ label: "View", icon: <IconEye size={14} />, onClick: onView }]
      : []),
    ...(changeStatus
      ? [
          {
            label: "Mark Completed",
            icon: <IconStatusChange size={14} />,
            onClick: changeStatus,
          },
        ]
      : []),
    ...(onDelete
      ? [
          {
            label: "Delete",
            icon: <IconTrash size={14} />,
            color: "red",
            onClick: onDelete,
          },
        ]
      : []),
    ...(onStartInspection
      ? [
          {
            label: "Match & Update",
            icon: <IconSettings size={14} />,
            onClick: onStartInspection,
          },
        ]
      : []),
  ];

  const effectiveMenuItems = menuItems || defaultMenuItems;

  return (
    <div className="space-y-4">
      <Paper
        withBorder
        p={0}
        shadow="sm"
        radius="sm"
        className="bg-white overflow-auto"
      >
        <ScrollArea>
          <Table
            highlightOnHover
            verticalSpacing="sm"
            style={{ width: "100%", tableLayout: "fixed" }}
          >
            <TableThead className="bg-gray-50">
              <TableTr>
                {headings.map((key) => (
                  <TableTh
                    key={key}
                    ref={(el) => {
                      if (el) columnRefs.current[key] = el;
                    }}
                    style={{
                      width: columnWidths[key],
                      position: "relative",
                      minWidth: 10,
                    }}
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => requestSort(key)}
                    >
                      <Text size="sm" fw={600} tt="uppercase" c="dimmed">
                        {key}
                      </Text>
                      {sortConfig?.key === key &&
                        (sortConfig.direction === "asc" ? (
                          <IconArrowUp size={14} />
                        ) : (
                          <IconArrowDown size={14} />
                        ))}
                    </div>
                    <TextInput
                      placeholder={`Search ${key}`}
                      value={columnSearch[key] || ""}
                      onChange={(e) => {
                        const value = e?.currentTarget?.value ?? "";
                        setColumnSearch((prev) => ({
                          ...prev,
                          [key]: value,
                        }));
                      }}
                      size="xs"
                      radius="xs"
                      className="mt-2"
                    />
                    <div
                      className="top-0 right-0 absolute w-1 h-full cursor-col-resize"
                      onMouseDown={(e) => handleMouseDown(e, key)}
                    />
                  </TableTh>
                ))}
                {data.length > 0 && !hideForPoles && (
                  <TableTh
                    style={{
                      width: columnWidths["__actions"] || 100,
                      textAlign: "right",
                      opacity: hideAction ? 0.4 : 1,
                      pointerEvents: hideAction ? "none" : "auto",
                    }}
                  ></TableTh>
                )}

                {/* {!hideAction && data.length > 0 && <TableTh style={{ width: columnWidths['__actions'] || 100 }}>Actions</TableTh>} */}
              </TableTr>
            </TableThead>

            <TableTbody>
              {paginatedData.length === 0 ? (
                <TableTr>
                  <TableTd colSpan={headings.length + (hideAction ? 0 : 1)}>
                    <Text ta="center" c="dimmed" p="sm">
                      No data found.
                    </Text>
                  </TableTd>
                </TableTr>
              ) : (
                paginatedData.map((row, idx) => (
                  <TableTr
                    key={idx}
                    className="hover:bg-gray-50"
                    style={{ height: 48 }}
                  >
                    {headings.map((key) => {
                      const content = row[key];
                      return (
                        <TableTd
                          key={key}
                          style={{
                            width: columnWidths[key],
                            maxWidth: columnWidths[key],
                            overflow: "hidden",
                          }}
                        >
                          <Tooltip
                            label={String(content)}
                            withArrow
                            position="top-start"
                            disabled={
                              String(content).length * 7 <= columnWidths[key]
                            }
                          >
                            <div className="overflow-hidden text-gray-800 text-sm text-ellipsis whitespace-nowrap">
                              {key === "status" ? (
                                <Badge
                                  variant="light"
                                  size="sm"
                                  radius="sm"
                                  color={statusColorMap[row[key]] || "dark"}
                                >
                                  {row[key]}
                                </Badge>
                              ) : key === "name" || key === "Drawing Title" ? (
                                <div
                                  className="flex items-center gap-2"
                                  style={{ minWidth: 0 }}
                                >
                                  <Text
                                    component="a"
                                    onClick={
                                      onRowClick
                                        ? (e) => onRowClick(e, row)
                                        : undefined
                                    }
                                    size="sm"
                                    c="blue"
                                    className="flex items-center gap-1 hover:underline hover:underline cursor-pointer"
                                    style={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {row[key]}
                                    <IconExternalLink size={14} />
                                  </Text>
                                </div>
                              ) : key === "condition" ? (
                                <Text
                                  size="sm"
                                  fw={500}
                                  c={
                                    conditionColorMap[row[key] as string] ??
                                    "dark"
                                  } // 'c' is Mantine's color shorthand
                                >
                                  {row[key] ?? "Unknown"}
                                </Text>
                              ) : row[key] instanceof Date ? (
                                row[key].toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              ) : (
                                row[key] ?? "N/A"
                              )}
                            </div>
                          </Tooltip>
                        </TableTd>
                      );
                    })}
                    <TableTd
                      style={{
                        width: columnWidths["__actions"] || 100,
                        textAlign: "right",
                        paddingRight: "30px",
                      }}
                    >
                      {effectiveMenuItems.length > 0 && (
                        <Menu position="bottom-end" withinPortal>
                          <Menu.Target>
                            <ActionIcon
                              variant="subtle"
                              color="gray"
                              size="sm"
                              disabled={hideAction} // ✅ Disable interaction
                              style={{
                                pointerEvents: hideAction ? "none" : "auto",
                                opacity: hideAction ? 0.4 : 1,
                              }}
                            >
                              <IconDotsVertical size={16} />
                            </ActionIcon>
                          </Menu.Target>
                          {!hideAction && (
                            <Menu.Dropdown>
                              {effectiveMenuItems.map((item, i) => (
                                <Menu.Item
                                  key={i}
                                  leftSection={item.icon}
                                  color={item.color}
                                  onClick={() => item.onClick(row)}
                                  disabled={
                                    row["iseditable"] === false &&
                                    !item.label.includes("Duplicate")
                                  } // Disable if not editable
                                >
                                  {item.label}
                                </Menu.Item>
                              ))}
                            </Menu.Dropdown>
                          )}
                        </Menu>
                      )}
                    </TableTd>
                  </TableTr>
                ))
              )}
            </TableTbody>
          </Table>
        </ScrollArea>

        {paginatedData.length > 0 && (
          <Paper
            shadow="xs"
            radius="sm"
            p="md"
            className="flex sm:flex-row flex-col justify-between items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <Text size="sm" c="dimmed">
                Rows per page:
              </Text>
              <Select
                size="xs"
                radius="sm"
                variant="filled"
                value={rowsPerPage.toString()}
                data={["5", "10", "20", "50", "100"]}
                onChange={(val) => {
                  if (val) {
                    setRowsPerPage(Number(val));
                    setPage(1);
                  }
                }}
                className="w-[80px]"
              />
            </div>
            <Pagination
              value={activePage}
              onChange={setPage}
              total={totalPages}
              radius="sm"
              size="sm"
              withEdges
            />
          </Paper>
        )}
      </Paper>
    </div>
  );
};
