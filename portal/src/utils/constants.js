const tenantThemes = {
  tenant1: {
    "--bg-secondary": "#14258f",
    "--bg-primary": "#273798",
    "--color-primary": "#05081b",
    "--color-secondary": "#2d2f39",
    "--font-primary": '"Inter", sans-serif',
    "--font-secondary": '"Satoshi", sans-serif',
  },

  tenant2: {
    "--bg-secondary": "#e71919ff",
    "--bg-primary": "#f1bc29ff",
    "--color-primary": "#f512d7ff",
    "--color-secondary": "#7a6c76ff",
    "--font-primary": '"Inter", sans-serif',
    "--font-secondary": '"Satoshi", sans-serif',
  },

  tenant3: {
    "--bg-secondary": "#14258f",
    "--bg-primary": "#273798",
    "--color-primary": "#05081b",
    "--color-secondary": "#2d2f39",
    "--font-primary": '"Inter", sans-serif',
    "--font-secondary": '"Satoshi", sans-serif',
  },
  tenant4: {
    "--bg-primary": "#e61c1cff",
    "--bg-secondary": "#e44f68ff",
    "--color-primary": "#c4f6faff",
    "--color-secondary": "#fcf700ff",
    "--font-primary": '"Inter", sans-serif',
    "--font-secondary": '"Satoshi", sans-serif',
  },
};

const routesConstant = [
  {
    path: "dashboard",
    info: [
      {
        role: "admin",
        title: "All your Tenant Information",
      },
      {
        role: "tenant",
        title: `Hi`,
      },
    ],
  },
  {
    path: "createtenant",
    info: ["Tenants", "New Tenant"],
  },
  {
    path: "createtenant",
    info: ["Tenants", "New Tenant"],
  },
];
export { tenantThemes, routesConstant };
