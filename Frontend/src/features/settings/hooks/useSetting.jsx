import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateName, updatePassword, uploadAvtar } from "../apis/setting.api";
import { addEmployee } from "../../auth/state/auth/AuthSlice";

const useSetting = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const changePasswordMutation = useMutation({
    mutationFn: ({ currentPassword, newPassword, confirmNewPassword }) =>
      updatePassword(currentPassword, newPassword, confirmNewPassword),
  });

  const uploadAvtarMutation = useMutation({
    mutationFn: (file) => uploadAvtar(file),
    onSuccess: (data) => {
      if (data?.data?.user) {
        dispatch(addEmployee({ data: { user: data.data.user } }));
      }
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const updateNameMutation = useMutation({
    mutationFn: (name) => updateName(name),
    onSuccess: (data) => {
      if (data?.data?.user) {
        dispatch(addEmployee({ data: { user: data.data.user } }));
      }
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  return {
    changePasswordMutation,
    uploadAvtarMutation,
    updateNameMutation,
  };
};

export default useSetting;
