import { client } from "../http-common";
export const addTranspost = async (transportData) => {
  return client.post(`/transports`, transportData);
};
export const getAllTranspost = async () => {
  return client.get(`/transports`);
};
export const putTranspost = async (transportId) => {
  return client.put(`/transports/${transportId}`);
};
export const deleteTranspost = async (transportId) => {
  return client.delete(`/transports/${transportId}`);
};
