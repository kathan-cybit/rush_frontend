import React, { useState } from "react";
import { logo } from "../../assets/img";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Group, Header } from "@eiris/common-ui-react";
import { setLogout } from "../../store/reducers/authSlice";

export default function AdminNavbar({ toggleSidebar }: any) {
  const { tenantType, user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleNavigateHome = () => {
    navigate("/");
  };
  const handleNavigateProfile = () => {
    navigate("/");
  };

  const handleNavigateSettings = () => {
    navigate("/");
  };
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Header
      logo={
        <Group>
          <img src={logo} alt="Eiris" className="w-auto h-6" />
        </Group>
      }
      onNavigateHome={handleNavigateHome}
      onNavigateProfile={handleNavigateProfile}
      onNavigateSettings={handleNavigateSettings}
      onLogout={handleLogout}
      email={"test@email.com"}
      appLauncher={<></>}
      appName={null}
      role={"Admin"}
      toggleOpened={() => setIsOpen((o: any) => !o)}
      opened={isOpen}
      feedbackLogo={""}
      ChangePasswordComponent={undefined}
    />
  );
}
