"use client";

import React, { useState } from "react";
import { ActionIcon, Button, rem, useMantineTheme } from "@mantine/core";
import {
  IconChevronDown,
  IconHelp,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react";
import { AppShellHeader } from "./AppShell";
import { Group } from "./Layout";
import { Avatar } from "./Avatar";
import { Menu, MenuTarget, MenuDropdown, MenuItem } from "./Navigation";
import { UnstyledButton } from "./Button";
import { Text } from "./Typography";
import { Burger } from "./Navigation";
import { Dialog } from "./dialog";

interface HeaderProps {
  toggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  onNavigateHome?: () => void;
  onNavigateProfile?: () => void;
  onNavigateSettings?: () => void;
  onLogout?: () => void;
  logo: React.ReactNode;
  email?: string;
  appLauncher?: React.ReactNode;
  appName?: string;
  role: string;
  extraControls?: React.ReactNode; // ✅ NEW
  toggleOpened: () => void;
  opened: boolean;
  /** ✅ NEW props injected from parent */
  feedbackLogo?: string | null;
  ChangePasswordComponent: React.ReactNode;
}

export function Header({
  toggleSidebar,
  isSidebarOpen,
  onNavigateHome,
  onLogout,
  logo,
  email,
  appLauncher,
  appName,
  role,
  extraControls, // ✅ NEW
  toggleOpened,
  opened,
  feedbackLogo = null,
  ChangePasswordComponent,
}: HeaderProps) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <AppShellHeader>
      <Group
        h="100%"
        px="md"
        justify="space-between"
        style={{ width: "100%", flexWrap: "nowrap" }}
      >
        {/* Left */}
        <Group style={{ flex: 1 }}>
          {toggleSidebar && (
            <Burger
              opened={isSidebarOpen || false}
              onClick={toggleSidebar}
              hiddenFrom="sm"
              size="sm"
            />
          )}
          {appLauncher && <div className="hidden sm:block">{appLauncher}</div>}
          <UnstyledButton
            onClick={onNavigateHome}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              padding: rem(4),
              borderRadius: theme.radius.md,
              transition: "background-color 150ms ease",
            }}
          >
            {logo}
          </UnstyledButton>
          {extraControls && (
            <div
              className="ml-4"
              style={{
                flex: 1,
                minWidth: 0, // ✅ allow shrinking
                display: "flex",
                alignItems: "center",
              }}
            >
              {extraControls}
            </div>
          )}
        </Group>

        {/* Center */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            minWidth: 0, // ✅ allow shrinking
            overflow: "hidden",
          }}
        >
          {appName && (
            <Text
              size="md"
              fw={600}
              style={{
                color: "#2A3A8C",
                fontFamily: "Segoe UI, Roboto, sans-serif",
                letterSpacing: "0.5px",
                fontSize: rem(20),
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis", // ✅ prevent wrapping
              }}
            >
              Sim<span style={{ color: "#59C18D" }}>Xpert</span>
            </Text>
          )}
        </div>
        {/* Right */}
        <Group style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button
            component="a"
            href="https://eiris.com/support-mvp-simxpert"
            target="_blank"
            variant="subtle"
            radius="md"
            title="Support"
            p={0}
            mt={1}
            className="hidden"
            styles={{
              root: {
                "&:hover, &[data-hovered]": {
                  backgroundColor: "transparent !important",
                  color: "inherit !important",
                },
              },
            }}
          >
            <IconHelp color="#2F78BC" />
          </Button>
          <Button
            component="a"
            href="https://forms.office.com/r/v9dW80A7EA"
            target="_blank"
            variant="subtle"
            radius="md"
            title="Provide Feedback"
            p={0}
            styles={{
              root: {
                "&:hover, &[data-hovered]": {
                  backgroundColor: "transparent !important",
                  color: "inherit !important",
                },
              },
            }}
          >
            {feedbackLogo && (
              <img
                src={feedbackLogo}
                alt="Feedback Logo"
                style={{ height: 25 }}
              />
            )}
          </Button>

          <Menu
            width={200}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <MenuTarget>
              <UnstyledButton
                style={{
                  padding: rem(8),
                  borderRadius: theme.radius.md,
                  transition: "background-color 150ms ease",
                }}
              >
                <Group gap={7}>
                  <Avatar
                    color="blue"
                    radius="xl"
                    size="sm"
                    className="uppercase"
                  >
                    {email?.charAt(0) || "?"}
                  </Avatar>
                  <IconChevronDown
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                    color={theme.colors.gray[6]}
                  />
                </Group>
              </UnstyledButton>
            </MenuTarget>
            <MenuDropdown>
              <MenuItem
                leftSection={
                  <IconSettings
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                onClick={toggleOpened}
                c="black.6"
              >
                Change Password
              </MenuItem>
              <MenuItem
                leftSection={
                  <IconLogout
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                onClick={onLogout}
                c="red.6"
              >
                Logout
              </MenuItem>
            </MenuDropdown>
          </Menu>
        </Group>
      </Group>
      <Dialog opened={opened} onClose={toggleOpened} title="Change Password">
        {ChangePasswordComponent}
      </Dialog>
    </AppShellHeader>
  );
}
