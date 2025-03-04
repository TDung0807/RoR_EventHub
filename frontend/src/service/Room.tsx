import { client } from "../http-common";
export const addRoom = async (roomData) => {
  return client.post(`/hotels/${roomData.hotel_id}/rooms`, roomData);
};
export const getRoomByHotelId = async (hotelId) => {
  return client.get(`/hotels/${hotelId}/rooms`);
};
export const getRoomByRoomAndHotelId = async (hotelId, roomId) => {
  return client.get(`/hotels/${hotelId}/rooms/${roomId}`);
};
export const putRoom = async (roomData) => {
  return client.put(
    `/hotels/${roomData.hotel_id}/rooms/${roomData.id}`,
    roomData
  );
};
export const deleteRoom = async (hotelId, roomId) => {
  return client.delete(`/hotels/${hotelId}/rooms/${roomId}`);
};
