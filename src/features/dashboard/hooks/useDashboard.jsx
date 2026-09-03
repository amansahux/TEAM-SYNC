import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {LogoutEmployee} from "../../auth/state/auth/AuthAction.jsx";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const { employee, Loading, error } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(LogoutEmployee());
  };
      const initials = employee.user.name
      .split(/\s+/)
      .slice(0, 2)
      .map((namePart) => namePart.charAt(0).toUpperCase())
      .join("") || "?";

  return {
    employee,
    Loading,
    error,
    handleLogout,
    initials,
  };
};
