import { useSelector } from "react-redux";
import { commonNavigationItems, roleNavigationItems } from "../../app/constants/navigations";
export const useShared = () => {
     const employee = useSelector((state) => state.auth.employee);
  const employeeRole =
    employee?.user?.role ||
    employee?.role ||
    employee?.employee?.user?.role ||
    employee?.data?.user?.role;

  const navigationItems = [
    ...commonNavigationItems,
    ...(roleNavigationItems[employeeRole] || []),
  ];

  return { navigationItems};
}