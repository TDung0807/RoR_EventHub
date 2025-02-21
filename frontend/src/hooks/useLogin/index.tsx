// hooks/useLogin.js
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
  const setToken = useAccountAuthetication((state) => state.setToken);

  const { mutateAsync } = useMutation({ mutationFn: loginFunc });

  // Hàm đăng nhập
  return async (account, password) => {
    const result = await mutateAsync({ username: account, password: password });

    // Giả sử kết quả trả về có cấu trúc:
    // result.data.token, result.data.user (bao gồm role, username, id, ...)
    if (result.data.token) {
      // Lưu token vào store và localStorage
      setToken(result.data.token);

      // Cập nhật header cho client (axios)
      client.defaults.headers.common = {
        Authorization: `Bearer ${result.data.token}`,
      };

      // Cập nhật thông tin user và trạng thái phân quyền
      if (result.data.user.role === "admin" && !isAdmin) {
        localStorage.setItem("isAdmin", JSON.stringify(true));
        localStorage.setItem("isUser", JSON.stringify(false));
        setIsAdmin();
      } else if (result.data.user.role === "user" && !isUser) {
        localStorage.setItem("isAdmin", JSON.stringify(false));
        localStorage.setItem("isUser", JSON.stringify(true));
        setIsUser();
      }
      localStorage.setItem("name", result.data.user.username);
      localStorage.setItem("email", result.data.user.email);
      localStorage.setItem("id", result.data.user.id);

      setInfomation({
        name: result.data.user.username,
        email: result.data.user.email,
        id: result.data.user.id,
      });

      return {
        isAdmin: result.data.user.role === "admin",
        isUser: result.data.user.role === "user",
      };
    } else {
      return { isAdmin: false, isUser: false };
    }
  };
};
