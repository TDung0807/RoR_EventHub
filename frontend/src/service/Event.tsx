import { client } from "../http-common";
export const addEvent = async (eventData) => {
  return client.post(`/events`, eventData);
};
export const getAllEvent = async () => {
  return client.get(`/events/`);
};
export const putEvent = async (eventData) => {
  return client.put(`/events/${eventData.id}`, eventData);
};
export const deleteEvent = async (eventId) => {
  return client.delete(`/events/${eventId}`);
};
export const getUpcomingEvent = async () => {
  return client.get(`/events/upcoming`);
};
export const getEventsByUserId = async ({ queryKey }) => {
  const [_, id] = queryKey;

  return client.get(`/events/user_events/${id}`);
};

export const getEventsByUserEmail = async ({ queryKey }) => {
  const [_, email] = queryKey;

  return client.get(`/quests/events?email=${email}`);
};
