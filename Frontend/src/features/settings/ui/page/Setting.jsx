import React, { useState } from "react";
import { useSelector } from "react-redux";
import SettingsLayout from "../components/SettingsLayout.jsx";
import ProfileSettings from "../components/ProfileSettings.jsx";
import SecuritySettings from "../components/SecuritySettings.jsx";
import ThemeSelector from "../components/ThemeSelector.jsx";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { employee } = useSelector((state) => state.auth);

  return (
    <SettingsLayout activeTab={activeTab} onSelectTab={setActiveTab}>
      {activeTab === "profile" && (
        <ProfileSettings employeeData={employee} />
      )}
      {activeTab === "security" && (
        <SecuritySettings />
      )}
      {activeTab === "appearance" && (
        <ThemeSelector />
      )}
    </SettingsLayout>
  );
};

export default Setting;
