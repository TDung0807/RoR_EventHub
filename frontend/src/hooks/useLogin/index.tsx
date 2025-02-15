import { useAccountAuthetication } from "../../store";
import { useMutation } from "@tanstack/react-query";
import { loginFunc } from "../../service/User";
import { client } from "../../http-common";

export const useLogin = () => {
  const isAdmin = useAccountAuthetication((state) => state.isAdmin);
  const isUser = useAccountAuthetication((state) => state.isUser);

  const setIsAdmin = useAccountAuthetication((state) => state.setIsAdmin);
  const setIsUser = useAccountAuthetication((state) => state.setIsUser);

  const { mutateAsync } = useMutation({ mutationFn: loginFunc });
  // Return a function for logging in
  return async (account, password) => {
    // Mock Data for Authentication
    const result = await mutateAsync({ username: account, password });
    if (result.data.token) {
      setIsAdmin();
      client.defaults.headers.common = {
        Authorization: `Bearer ${result.data.token}`,
      };
      return { isAdmin: true, isUser: false };
    } else if (
      account === "jane.smith@example.com" &&
      password === "securepass" &&
      isUser == false
    ) {
      setIsUser();
      return { isAdmin: false, isUser: true };
    } else {
      return { isAdmin: false, isUser: false };
    }
  };
};
