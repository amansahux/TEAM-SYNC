import React, { useState } from "react";
import { useSelector } from "react-redux";
import SettingsLayout from "../components/SettingsLayout.jsx";
import ProfileSettings from "../components/ProfileSettings.jsx";
import SecuritySettings from "../components/SecuritySettings.jsx";
import ThemeSelector from "../components/ThemeSelector.jsx";
import useSetting from "../../hooks/useSetting.jsx";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { employee } = useSelector((state) => state.auth);
  const {changePasswordMutation,uploadAvtarMutation,updateNameMutation} = useSetting();

  return (
    <SettingsLayout activeTab={activeTab} onSelectTab={setActiveTab}>
      {activeTab === "profile" && (
        <ProfileSettings
          employeeData={employee}
          updateNameMutation={updateNameMutation}
          uploadAvtarMutation={uploadAvtarMutation}
        />
      )}
      {activeTab === "security" && (
        <SecuritySettings
          changePasswordMutation={changePasswordMutation}
        />
      )}
      {activeTab === "appearance" && (
        <ThemeSelector />
      )}
    </SettingsLayout>
  );
};

export default Setting;
