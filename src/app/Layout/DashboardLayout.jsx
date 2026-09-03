import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

import Sidebar from "../../features/dashboard/ui/components/Sidebar.jsx";
import Navbar from "../../features/dashboard/ui/components/Navbar.jsx";



const DashboardLayout = () => {
  const { mode } = useSelector((state) => state.theme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (mode === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [mode]);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <section className="min-h-screen lg:pl-64">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        <Outlet />
      </section>
    </main>
  );
};

export default DashboardLayout;
