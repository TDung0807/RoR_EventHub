import { useAccountAuthetication } from "../../store";
import { useMutation } from "@tanstack/react-query";
import { loginFunc } from "../../service/User";
import { client } from "../../http-common";

export const useLogin = () => {
  const isAdmin = useAccountAuthetication((state) => state.isAdmin);
  const isUser = useAccountAuthetication((state) => state.isUser);

  const setIsAdmin = useAccountAuthetication((state) => state.setIsAdmin);
  const setIsUser = useAccountAuthetication((state) => state.setIsUser);
  const setInfomation = useAccountAuthetication((state) => state.setInfomation);

  const { mutateAsync } = useMutation({ mutationFn: loginFunc });
  // Return a function for logging in
  return async (account, password) => {
    // Mock Data for Authentication
    const result = await mutateAsync({ username: account, password });
    if (
      result.data.token &&
      result.data.user.role == "admin" &&
      isAdmin == false
    ) {
      setIsAdmin();
      setInfomation({
        name: result.data.user.username,
        email: result.data.user.username,
      });
      client.defaults.headers.common = {
        Authorization: `Bearer ${result.data.token}`,
      };
      return { isAdmin: true, isUser: false };
    } else if (
      result.data.user.role == "user" &&
      result.data.token &&
      isUser == false
    ) {
      setInfomation({
        name: result.data.user.username,
        email: result.data.user.username,
      });
      setIsUser();
      return { isAdmin: false, isUser: true };
    } else {
      return { isAdmin: false, isUser: false };
    }
  };
};
