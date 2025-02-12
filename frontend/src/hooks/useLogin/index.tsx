import { useAccountAuthetication } from "../../store";
import { useMutation } from "@tanstack/react-query";
import { loginFunc } from "../../service/User";
export const useLogin = () => {
  const isAdmin = useAccountAuthetication((state) => state.isAdmin);
  const isUser = useAccountAuthetication((state) => state.isUser);

  const setIsAdmin = useAccountAuthetication((state) => state.setIsAdmin);
  const setIsUser = useAccountAuthetication((state) => state.setIsUser);

  const { mutate } = useMutation({ mutationFn: loginFunc });
  // Return a function for logging in
  return (account, password) => {
    // Mock Data for Authentication
    const result = mutate({ username: account, password });
    console.log(result);
    if (
      account === "john.doe@example.com" &&
      password === "password123" &&
      isAdmin == false
    ) {
      setIsAdmin();
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
