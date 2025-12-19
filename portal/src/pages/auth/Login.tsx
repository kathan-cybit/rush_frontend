import React, { useEffect, useState } from "react";
import { LoginContainer } from "../../shared-components/containers";
import { useLocation, useNavigate } from "react-router-dom";
import { error_toast } from "../../utils/toaster";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { verifytokenPasswdLink } from "../../store/reducers/authSlice";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const tenant = params.get("tenant");

  useEffect(() => {
    if (location.pathname == "/reset-password") {
      if (!token || !tenant) {
        error_toast("token not provided");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 10);
        return;
      }
      dispatch(
        verifytokenPasswdLink({
          payload: { token: token, tenant: tenant },
          headers: { "x-tenant-id": tenant },
        })
      )
        .then((res: any) => {
          if (
            res?.payload?.verified == true ||
            res?.payload?.verified == "true"
          ) {
            setIsVerified(true);
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {});
    }
  }, [location.pathname, location.search, navigate]);

  if (location.pathname == "/reset-password" && !isVerified) {
    error_toast("not verified");
    setTimeout(() => {
      return null;
    }, 10);
  }

  if (token && isVerified) return <LoginContainer token={token} />;
  return <LoginContainer token={null} />;
}
