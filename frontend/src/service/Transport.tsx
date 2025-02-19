import { client } from "../http-common";
export const addTranspost = async (transportData) => {
  return client.post(`/transports`, transportData);
};
export const getTransportByVendorId = async (vendorId) => {
  return client.get(
    `/transports/get_transport_by_vendor_id?vendor_id=${vendorId}`
  );
};
export const getAllTranspost = async () => {
  return client.get(`/transports`);
};
export const putTranspost = async (transportData) => {
  return client.put(`/transports/${transportData.id}`, transportData);
};
export const deleteTranspost = async (transportId) => {
  return client.delete(`/transports/${transportId}`);
};
