import { useAccountAuthetication } from "../../store";

export const useLogout = () => {
  const unsetIsAdmin = useAccountAuthetication((state) => state.unsetIsUser);
  const unsetIsUser = useAccountAuthetication((state) => state.unsetIsAdmin);

  // Return a function for logout
  return () => {
    unsetIsAdmin();
    unsetIsUser();
  };
};
