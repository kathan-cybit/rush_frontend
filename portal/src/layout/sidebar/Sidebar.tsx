import { useLocation, useNavigate } from "react-router-dom";
import {
  AppShellSection,
  AppShellNavbar,
  Stack,
  Tooltip,
  ThemeIcon,
  UnstyledButton,
  Text,
  rem,
  useMantineTheme,
  AppShell,
} from "@mantine/core";

import { LicenseIcn, RoleIcn, UserIcn } from "../../assets/svgs";
import { logo } from "../../assets/img";

export default function Sidebar({ isOpen }: any) {
  const pathName = useLocation()?.pathname;
  const navigate = useNavigate();
  const theme = useMantineTheme();

  // Collapsed toggle
  // const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      key: "/license",
      label: "License Management",
      icon: LicenseIcn,
      path: "/license",
    },
    {
      key: "/usermanagement",
      label: "User Management",
      icon: UserIcn,
      path: "/usermanagement",
    },
    {
      key: "/roles",
      label: "Role & Permissions",
      icon: RoleIcn,
      path: "/roles",
    },
  ];

  const NavbarLink = ({ icon: Icon, label, active, onClick }: any) => {
    const iconSize = 24;

    return (
      <Tooltip label={label} position="right">
        <UnstyledButton
          onClick={onClick}
          style={{
            display: "flex",
            alignItems: "center",
            padding: `${rem(12)} ${rem(14)}`,
            width: "100%",
            backgroundColor: active ? "rgba(0,0,0,0.06)" : "transparent",
            borderLeft: active
              ? `4px solid ${theme.colors.blue[6]}`
              : "4px solid transparent",
            borderRadius: 6,
            transition: "0.2s",
          }}
        >
          <ThemeIcon
            variant="transparent"
            size={34}
            radius="sm"
            style={{ marginRight: "rem(12)" }}
            // style={{ marginRight: collapsed ? 0 : rem(12) }}
          >
            <Icon size={iconSize} stroke={2} color="#2b2a29ff" />
          </ThemeIcon>

          {/* {!collapsed && ( */}
          <Text size="sm" fw={500}>
            {label}
          </Text>
          {/* )} */}
        </UnstyledButton>
      </Tooltip>
    );
  };

  return (
    <AppShell.Navbar
    // p={0}
    // style={{
    //   backgroundColor: "#fff",
    //   borderRight: "1px solid #e5e7eb",
    //   width: collapsed ? rem(80) : rem(230),
    //   transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    //   transition: "0.3s ease",
    //   position: "fixed",
    //   height: "100vh",
    //   zIndex: 9999,
    // }}
    >
      <AppShellSection p="lg" style={{ textAlign: "center" }}>
        <div
          style={{
            width: 120,
            // width: collapsed ? 40 : 120,
            height: 50,
            margin: "0 auto",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </AppShellSection>

      {/* Menu List */}
      <AppShellSection grow py="sm">
        <Stack gap={0}>
          {navItems.map((item) => (
            <NavbarLink
              key={item.key}
              icon={item.icon}
              label={item.label}
              active={pathName === item.key}
              onClick={() => navigate(item.path)}
              // collapsed={collapsed}
            />
          ))}
        </Stack>
      </AppShellSection>

      {/* <AppShellSection py="xs" px="sm">
        <UnstyledButton
          // onClick={() => setCollapsed((p) => !p)}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-end",
            padding: rem(10),
            color: theme.colors.gray[7],
            borderRadius: rem(6),
          }}
        >
          {collapsed ? (
            <IconChevronRight size={24} />
          ) : (
            <IconChevronLeft size={24} />
          )}
        </UnstyledButton>
      </AppShellSection> */}
    </AppShell.Navbar>
  );
}
