import { useSelector } from "react-redux";
import { roleNavigationItems } from "../../app/constants/navigations";
export const useShared = () => {
     const employee = useSelector((state) => state.auth.employee);
  const employeeRole =
    employee?.user?.role ||
    employee?.role ||
    employee?.employee?.user?.role ||
    employee?.data?.user?.role;

  const navigationItems = [
    ...roleNavigationItems[employeeRole] || [],
  ];

  return { navigationItems};
}