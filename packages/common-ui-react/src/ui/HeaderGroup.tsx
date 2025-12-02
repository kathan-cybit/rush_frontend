import React from 'react';
import { Group, Stack, Text, Title } from '@mantine/core';
 
interface HeaderGroupProps {
  title?: string;
  subtitle?: string;
  rightSection?: React.ReactNode;
}
 
export const HeaderGroup = ({ title, subtitle, rightSection }: HeaderGroupProps) => {
  return (
    <Group justify="space-between" className="w-full py-2">
      {/* Left side */}
      <Stack gap={2} className="text-left">
        <Title order={2}>{title}</Title>
        {subtitle && <Text className="text-sm text-gray-500">{subtitle}</Text>}
      </Stack>
 
      {/* Right side (buttons, icons, dropdowns, etc.) */}
      <div className="flex items-center gap-2">
        {rightSection}
      </div>
    </Group>
  );
};
 