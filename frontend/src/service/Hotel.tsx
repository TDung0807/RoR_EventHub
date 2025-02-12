import { client } from "../http-common";
export const addHotel = async (hotelData) => {
  return client.post(`/hotels`, hotelData);
};
export const getRoomByHotelId = async () => {
  return client.get(`/hotels/`);
};
export const getHotelById = async (hotelId) => {
  return client.get(`/hotels/${hotelId}`);
};
export const putHotel = async (hotelId) => {
  return client.put(`/hotels/${hotelId}`);
};
export const deleteHotel = async (hotelId) => {
  return client.delete(`/hotels/${hotelId}`);
};
