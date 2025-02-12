import { client } from "../http-common";
export const addVendor = async (vendorData) => {
  return client.post(`/vendors`, vendorData);
};
export const getAllVendor = async () => {
  return client.get(`/vendors`);
};
export const putVendor = async (vendorId) => {
  return client.put(`/hotels/${vendorId}`);
};
export const deleteVendor = async (vendorId) => {
  return client.delete(`/hotels/${vendorId}`);
};
