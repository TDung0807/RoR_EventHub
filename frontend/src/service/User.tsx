import { client } from "../http-common";
import { baseURL } from "./baseURL";
export const loginFunc = async ({ username, password }) => {
  return client.post("/login", { username: username, password: password });
};
export const registerFunc = async (guessRegister) => {
  return client.post("/users", guessRegister);
};
export const getAllUsers = async () => {
  return client.get("/users");
};
