import { client } from "../http-common";
import { baseURL } from "./baseURL";
export const loginFunc = async ({ username, password }) => {
  //return client.post("/login", { username: username, password: password });
  console.log("A");
  const result = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Corrected header
    },
    body: JSON.stringify({ username, password }),
  });
  return result.json();
};
export const registerFunc = async ({ username, password }) => {
  //return client.post("/users", { username: username, password: password });
  const result = await fetch(`${baseURL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Corrected header
    },
    body: JSON.stringify({ username, password }),
  });
  return result.json();
};
export const getAllUsers = async () => {
  client.get("/users");
};
