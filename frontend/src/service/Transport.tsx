import { client } from "../http-common";
export const addVendor = async (transportData) => {
  return client.post(`/transports`, transportData);
};
export const getAllVendor = async () => {
  return client.get(`/transports`);
};
export const putVendor = async (transportId) => {
  return client.put(`/transports/${transportId}`);
};
export const deleteVendor = async (transportId) => {
  return client.delete(`/transports/${transportId}`);
};
