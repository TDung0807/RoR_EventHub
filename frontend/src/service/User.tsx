import { client } from "../http-common";
import { baseURL } from "./baseURL";
export const loginFunc = async ({ username, password }) => {
  return client.post("/login", { username: username, password: password });
};
export const registerFunc = async ({ username, password }) => {
  return client.post("/users", { username: username, password: password });
};
export const getAllUsers = async () => {
  return client.get("/users");
};
