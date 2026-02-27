import "./App.css";
import { Route, Routes, Navigate, useLocation, Link } from "react-router-dom";
import Layout from "./layout/Layout";
import Users from "./pages/usermanagement/Users";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/auth/Login";
import { useEffect, useRef } from "react";
import {
  getUserDetails,
  setCurrentTenantName,
  setLogout,
} from "./store/reducers/authSlice";
import { applyTenantTheme } from "./utils/applyTenantTheme";
import Dashboard from "./pages/dashboard/Dashboard";
import Roles from "./pages/role/Roles";
import CreateTenant from "./pages/createTenant/CreateTenant";
import { AppDispatch, RootState } from "./store/store";
import CreateUser from "./pages/usermanagement/components/CreateUser";
import { getAllUsersRolesPermissions } from "./store/reducers/tenantSlice";
import NotFound from "./pages/notFound/NotFound";
import { Loader } from "./shared-components/ui";

function App() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { token, tenantType, user, allDetails } = useSelector(
    (state: RootState) => state.auth,
  );
  const { tenants, isLoading, allUsersRolesPermissions } = useSelector(
    (state: RootState) => state.tenant,
  );

  // Add ref to track if initial data fetch has been done
  const initialFetchDone = useRef(false);

  useEffect(() => {
    const host = new URL(window.location.href).hostname.split(".")[0];

    // Only run this effect once
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;

    if (host) {
      applyTenantTheme(host);
      dispatch(setCurrentTenantName(host));
    }

    // Only fetch data if user is logged in and not on auth pages
    if (
      host != "public" &&
      location?.pathname != "/login" &&
      location?.pathname != "/forget-password" &&
      location?.pathname != "/reset-password" &&
      token &&
      token != "undefined" &&
      token != null &&
      token != "null"
    ) {
      // Fetch user's roles and permissions
      dispatch(
        getAllUsersRolesPermissions({
          params: user?.id,
          headers: { "x-tenant-id": host },
        }),
      );
      // Fetch user details
      dispatch(
        getUserDetails({
          headers: { "x-tenant-id": host },
        }),
      );
    }

    if (location?.pathname == "/reset-password") {
      dispatch(setLogout());
    }
  }, []);

  // calcukate hasManageOrgSettings from the allUsersRolesPermissions
  // allUsersRolesPermissions has obrect structure: { user: {...}, roles: [...] }
  const hasManageOrgSettings =
    allUsersRolesPermissions &&
    typeof allUsersRolesPermissions === "object" &&
    !Array.isArray(allUsersRolesPermissions) &&
    allUsersRolesPermissions?.roles &&
    Array.isArray(allUsersRolesPermissions.roles) &&
    allUsersRolesPermissions.roles.length > 0
      ? allUsersRolesPermissions.roles.some((role: any) =>
          role.permissions?.some(
            (perm: any) => perm?.slug === "manage_corporate_user",
          ),
        )
      : false;

  // Check if permissions have been fetched for tenant type
  const isTenantPermissionsFetched =
    tenantType === "tenant" &&
    allUsersRolesPermissions &&
    typeof allUsersRolesPermissions === "object" &&
    !Array.isArray(allUsersRolesPermissions) &&
    "roles" in allUsersRolesPermissions &&
    "user" in allUsersRolesPermissions;

  // Show loading screen only if tenant type and data is still loading
  if (
    token &&
    token != "undefined" &&
    token != null &&
    token != "null" &&
    tenantType === "tenant" &&
    !isTenantPermissionsFetched &&
    isLoading
  ) {
    return (
      <div className="loader-overlay">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {token != "undefined" &&
      token != null &&
      token != undefined &&
      token != "null" ? (
        <>
          {tenantType == "tenant" ? (
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  path="/login"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="notfound" element={<NotFound />} />
                <Route path="dashboard" element={<Dashboard />} />
                {(user?.is_default_admin || hasManageOrgSettings) && (
                  <>
                    <Route path="usermanagement" element={<Users />} />
                    <Route path="roles" element={<Roles />} />
                    <Route path="viewuser" element={<CreateUser />} />
                    <Route path="updateuser" element={<CreateUser />} />

                    {(allDetails?.is_single_org == "false" ||
                      allDetails?.is_single_org === false) && (
                      <>
                        <Route path="createuser" element={<CreateUser />} />
                      </>
                    )}
                  </>
                )}

                <Route path="*" element={<Navigate to="/notfound" replace />} />
              </Route>
            </Routes>
          ) : tenantType == "admin" ? (
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  path="/login"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="createtenant" element={<CreateTenant />} />
                <Route path="viewtenant" element={<CreateTenant />} />
                <Route path="edittenant" element={<CreateTenant />} />
                <Route path="roles" element={<Roles />} />
                <Route path="notfound" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/notfound" replace />} />
              </Route>
            </Routes>
          ) : (
            <>
              {isLoading && (
                <>
                  <div className="loader-overlay">
                    <Loader />
                  </div>
                </>
              )}
              <Routes>
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </>
          )}
        </>
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<Login />} />
            <Route path="/reset-password" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
