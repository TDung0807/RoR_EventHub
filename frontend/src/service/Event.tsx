import { client } from "../http-common";
export const addEvent = async (eventData) => {
  return client.post(`/events`, eventData);
};
export const getAllEvent = async () => {
  return client.get(`/events/`);
};
export const putEvent = async (eventId) => {
  return client.put(`/events/${eventId}`);
};
export const deleteHotel = async (eventId) => {
  return client.delete(`/events/${eventId}`);
};
export const getUpcomingEvent = async () => {
  return client.get(`/events/upcoming`);
};
