import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  forgotPassword,
  loginUser,
  resetPassword,
} from "../../../store/reducers/authSlice";
import { LoginComponent } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { error_toast } from "../../../utils/toaster";

const normalizeEmail = (email: string) => {
  if (!email.includes("@")) return email;

  const [localPart, domainPart] = email.split("@");
  return `${localPart.toLowerCase()}@${domainPart}`;
};

export default function LoginContainer({ token = null }) {
  const host = new URL(window.location.href).hostname.split(".")[0];
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentTenantName, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<any>({
    em: "",
    passwd: "",
    newPass: "",
    confirmPass: "",
  });

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onLogin = () => {
    const normalizedEmail = email ? normalizeEmail(email) : email;
    if (location?.pathname == "/login") {
      if (!email || !password) {
        let emEr = "";
        let passEr = "";
        if (!email) emEr = "Email cannot be empty";
        if (!password) passEr = "Password cannot be empty";
        setError({ em: emEr, passwd: passEr });
        return;
      }

      if (currentTenantName) {
        dispatch(
          loginUser({ currentTenantName, email: normalizedEmail, password })
        );
      }
    } else if (location?.pathname == "/forget-password") {
      if (!email) {
        let emEr = "";
        if (!email) emEr = "Email cannot be empty";
        setError({ em: emEr });
        return;
      }

      if (currentTenantName) {
        dispatch(
          forgotPassword({
            payload: { email: normalizedEmail },
            headers: { "x-tenant-id": host },
          })
        )
          .then((res: any) => {
            if (res?.userFound) {
              navigate("/");
            } else {
            }
          })
          .catch((err) => {});
      }
    } else if (location?.pathname === "/reset-password") {
      let newPassErr = "";
      let confirmErr = "";

      if (!newPassword) newPassErr = "New password is required";
      if (!confirmPassword) confirmErr = "Confirm password is required";
      if (newPassword && confirmPassword && newPassword != confirmPassword) {
        confirmErr = "Passwords do not match";
      }

      if (newPassErr || confirmErr) {
        setError({ newPass: newPassErr, confirmPass: confirmErr });
        return;
      }
      if (token) {
        dispatch(
          resetPassword({
            payload: {
              new_password: newPassword,
              token: token,
              tenant: host,
            },
            headers: { "x-tenant-id": host },
          })
        )
          .unwrap()
          .then((res: any) => {
            if (res?.success) {
              navigate("/login");
            }
          })
          .catch(() => {});
      } else {
        error_toast("something went wrong");
        navigate("/login");
      }
    } else {
    }
  };

  useEffect(() => {
    setError({
      em: "",
      passwd: "",
      newPass: "",
      confirmPass: "",
    });
  }, [email, password, newPassword, confirmPassword]);

  const componentProps = {
    email,
    password,
    error,
    loading,
    onEmailChange,
    onPasswordChange,
    onLogin,
    host,
    navigate,
    location,
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
  };

  return <LoginComponent {...componentProps} />;
}
