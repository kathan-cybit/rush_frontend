import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layout";
import License from "./pages/license/License";
import Users from "./pages/usermanagement/Users";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/auth/Login";
import { useEffect } from "react";
import { setCurrentTenantName } from "./store/reducers/authSlice";
import { applyTenantTheme } from "./utils/applyTenantTheme";
import Dashboard from "./pages/dashboard/Dashboard";
import Roles from "./pages/role/Roles";
import CreateTenant from "./pages/createTenant/CreateTenant";
import { RootState } from "./store/store";
import CreateUser from "./pages/usermanagement/components/CreateUser";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const host = new URL(window.location.href).hostname.split(".")[0];
    if (host) {
      applyTenantTheme(host);
      dispatch(setCurrentTenantName(host));
    }
  }, []);

  const { token, tenantType } = useSelector((state: RootState) => state.auth);
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
                <Route path="license" element={<License />} />
                <Route path="usermanagement" element={<Users />} />
                <Route path="roles" element={<Roles />} />
                <Route path="createUser" element={<CreateUser />} />
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
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </>
          )}
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
