import { tenantThemes } from "./constants.js";

export const applyTenantTheme = (tenantNameOrId) => {
  const theme = tenantThemes[tenantNameOrId];

  if (!theme) {
    console.warn("No theme found for tenant:", tenantNameOrId);
    return;
  }

  const root = document.documentElement;

  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};
