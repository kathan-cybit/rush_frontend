// shared-components/ui/GenericComboBox.tsx
"use client";

import React, { useState } from "react";
import {
    Button
} from "..";
import clsx from "clsx";
import { Combobox, Input, InputBase, useCombobox, ScrollArea } from "@mantine/core";

export interface GenericComboBoxOption {
    value: string;
    label: string;
}

export interface GenericComboBoxAction {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
}

interface ComboBoxProps {
    placeholder: string;
    options: GenericComboBoxOption[];
    value: string | null;
    onChange: (value: string | null) => void;
    footerActions?: GenericComboBoxAction[];
    maxHeight?: number;
}

export function GenericComboBox({
    placeholder,
    options,
    value,
    onChange,
    footerActions = [],
    maxHeight = 180,
}: ComboBoxProps) {
    const combobox = useCombobox({ onDropdownClose: () => combobox.resetSelectedOption() });
    const [search, setSearch] = useState("");

    const filtered = options.filter((item) =>
        item?.label?.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <Combobox store={combobox} withinPortal={true} onOptionSubmit={onChange}>
            <Combobox.Target>
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    onClick={() => combobox.toggleDropdown()}
                    rightSectionPointerEvents="none"
                    className="w-64 text-left truncate" // ✅ enforce truncation
                    classNames={{
                        input: "truncate text-ellipsis overflow-hidden", // ✅ ellipsis behavior
                    }}
                >
                    <div className="truncate text-ellipsis overflow-hidden">
                        {value
                            ? options.find((i) => i.value === value)?.label
                            : <Input.Placeholder>{placeholder}</Input.Placeholder>}
                    </div>
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown className="w-64">
                {/* Search */}
                <div className="p-2">
                    <input
                        className="w-full border rounded px-2 py-1 text-sm"
                        placeholder={`Search...`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Scrollable options */}
                <ScrollArea.Autosize mah={maxHeight}>
                    {filtered.map((item) => (
                        <Combobox.Option
                            key={item.value}
                            value={item.value}
                            className={clsx(
                                "px-3 py-1 cursor-pointer hover:bg-gray-100 text-sm",
                                value === item.value && "bg-gray-200 font-medium"
                            )}
                        >
                            {item.label}
                        </Combobox.Option>
                    ))}
                </ScrollArea.Autosize>

                {footerActions.length > 0 && (
                    <>
                        <Combobox.Footer className="flex flex-col items-stretch">
                            {footerActions.map((action, idx) => (
                                <Button
                                    key={idx}
                                    fullWidth
                                    variant="subtle"
                                    onClick={action.onClick}
                                    leftSection={action.icon}
                                    classNames={{
                                        inner: "justify-start",
                                    }}
                                >
                                    {action.label}
                                </Button>
                            ))}
                        </Combobox.Footer>
                    </>
                )}
            </Combobox.Dropdown>
        </Combobox>
    );
}
