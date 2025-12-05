import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { loginUser } from "../../../store/reducers/authSlice";
import { LoginComponent } from "../../components";

export default function LoginContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentTenantName, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState({
    em: "",
    passwd: "",
  });

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onLogin = () => {
    if (!email || !password) {
      let emEr = "";
      let passEr = "";
      if (!email) emEr = "Email cannot be empty";
      if (!password) passEr = "Password cannot be empty";
      setError({ em: emEr, passwd: passEr });
      return;
    }

    if (currentTenantName) {
      dispatch(loginUser({ currentTenantName, email, password }));
    }
  };

  useEffect(() => {
    setError({ em: "", passwd: "" });
  }, [email, password]);

  const componentProps = {
    email,
    password,
    error,
    loading,
    onEmailChange,
    onPasswordChange,
    onLogin,
  };

  return <LoginComponent {...componentProps} />;
}
