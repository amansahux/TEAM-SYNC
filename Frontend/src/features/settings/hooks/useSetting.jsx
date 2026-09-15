import { useMutation } from "@tanstack/react-query";
import { updateName, updatePassword, uploadAvtar } from "../apis/setting.api";

const useSetting = () => {
  const changePasswordMutation = useMutation({
    mutationFn: (data) =>
      updatePassword(
        data.currentPassword,
        data.newPassword,
        data.confirmNewPassword,
      ),
  });
  const uploadAvtarMutation = useMutation({
    mutationFn: (data) => uploadAvtar(data.file),
  });
  const updateNameMutation = useMutation({
    mutationFn: (data) => updateName(data.name),
  });
  return {
    changePasswordMutation,
    uploadAvtarMutation,
    updateNameMutation,
  };
};

export default useSetting;
