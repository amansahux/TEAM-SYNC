import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const { mode } = useSelector((state) => state.theme);
  useEffect(() => {
    if (mode === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [mode]);

  return (
    <main>
      <aside>sidebar</aside>
      <section>
        <nav>top navbar</nav>
        <Outlet />
      </section>
    </main>
  );
};

export default DashboardLayout;
