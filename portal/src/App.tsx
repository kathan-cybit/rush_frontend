import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";
import License from "./pages/license/License";
import Users from "./pages/usermanagement/Users";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/auth/Login";
import { useEffect } from "react";
import { setCurrentTenantName, setLogout } from "./store/reducers/authSlice";
import { applyTenantTheme } from "./utils/applyTenantTheme";
import Dashboard from "./pages/dashboard/Dashboard";
import Roles from "./pages/role/Roles";
import CreateTenant from "./pages/createTenant/CreateTenant";
import { AppDispatch, RootState } from "./store/store";
import CreateUser from "./pages/usermanagement/components/CreateUser";
import { getAllUsersRolesPermissions } from "./store/reducers/tenantSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { token, tenantType, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { tenants, isLoading, allUsersRolesPermissions } = useSelector(
    (state: RootState) => state.tenant
  );
  useEffect(() => {
    const host = new URL(window.location.href).hostname.split(".")[0];
    if (host) {
      applyTenantTheme(host);
      dispatch(setCurrentTenantName(host));
    }
    if (
      host != "public" &&
      location?.pathname != "/login" &&
      location?.pathname != "/forget-password" &&
      location?.pathname != "/reset-password"
    ) {
      dispatch(
        getAllUsersRolesPermissions({
          params: user?.id,
          headers: { "x-tenant-id": host },
        })
      );
    }
    if (location?.pathname == "/reset-password") {
      dispatch(setLogout());
    }
  }, []);

  const hasManageOrgSettings = allUsersRolesPermissions?.roles?.some((role) =>
    role.permissions?.some((perm) => perm?.slug == "manage_org_settings")
  );

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
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="dashboard" element={<Dashboard />} />
                {/* <Route path="license" element={<License />} /> */}
                {(user?.is_default_admin || hasManageOrgSettings) && (
                  <>
                    <Route path="usermanagement" element={<Users />} />
                    <Route path="roles" element={<Roles />} />
                    <Route path="createUser" element={<CreateUser />} />
                  </>
                )}

                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Route>
            </Routes>
          ) : tenantType == "admin" ? (
            <>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="createtenant" element={<CreateTenant />} />
                  <Route path="roles" element={<Roles />} />
                  <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </Route>
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<Login />} />
                <Route path="/reset-password" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </>
          )}
        </>
      ) : (
        <>
          <Routes>
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
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
