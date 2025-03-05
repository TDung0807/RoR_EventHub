import { client } from "../http-common";
export const addVendor = async (vendorData) => {
  return client.post(`/vendors`, vendorData);
};
export const getAllVendor = async () => {
  return client.get(`/vendors`);
};
export const putVendor = async (vendorData) => {
  return client.put(`/vendors/${vendorData.id}`, vendorData);
};
export const deleteVendor = async (id) => {
  return client.delete(`/vendors/${id}`);
};
