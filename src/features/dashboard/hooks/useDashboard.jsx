import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LogoutEmployee } from "../../auth/state/auth/AuthAction.jsx";
import { toggleTheme } from "../../../shared/state/Theme.slice.jsx";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const { employee, Loading, error } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);

  const handleLogout = () => {
    dispatch(LogoutEmployee());
  };
  const initials =
    employee.user.name
      .split(/\s+/)
      .slice(0, 2)
      .map((namePart) => namePart.charAt(0).toUpperCase())
      .join("") || "?";

  const handleChangeTheme = () => {
    dispatch(toggleTheme());
  };
  return {
    employee,
    Loading,
    error,
    handleLogout,
    initials,
    handleChangeTheme,
    theme
  };
};
