"use client"
import React from "react"
import { AppShellFooter } from "./AppShell"
import { Text } from "./Typography"
import { Center } from "./Layout"
import { Box } from "@mantine/core"

export function Footer({ version, build_number }: { version?: string, build_number?: string }) {
  return (
    <AppShellFooter p="md">
      <Box w="100%" style={{ position: "relative" }}>
        {/* Center aligned copyright */}
        <Text
          size="sm"
          c="gray.6"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          © {new Date().getFullYear()} EIRIS
        </Text>

        {/* Right aligned version/build */}
        <Text
          size="sm"
          c="gray.6"
          style={{ position: "absolute", right: 0 }}
        >
          v{version} (Build {build_number})
        </Text>
      </Box>
    </AppShellFooter>
  )
}
