import { client } from "../http-common";
export const addRoom = async (hotelId, roomData) => {
  return client.post(`/hotels/${hotelId}/rooms`, roomData);
};
export const getRoomByHotelId = async (hotelId) => {
  return client.get(`/hotels/${hotelId}/rooms`);
};
export const getRoomByRoomAndHotelId = async (hotelId, roomId) => {
  return client.get(`/hotels/${hotelId}/rooms/${roomId}`);
};
export const putRoom = async (hotelId, roomId) => {
  return client.put(`/hotels/${hotelId}/rooms/${roomId}`);
};
export const deleteRoom = async (hotelId, roomId) => {
  return client.delete(`/hotels/${hotelId}/rooms/${roomId}`);
};
