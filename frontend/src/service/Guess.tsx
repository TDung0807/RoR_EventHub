import { client } from "../http-common";
export const getAllGuessFromGroup = async (id) => {
  return client.get(`/groups/${id}/quests`);
};
export const getGuestByEmail = async (email) => {
  return client.get(`/quests/find_by_email/${email}`);
};
export const getGuestByName = async (name) => {
  console.log(name);
  return client.get(`/quests/find_by_name/${name}`);
};
export const addGuestsToGroup = async (guessData) => {
  return client.post(`/groups/${guessData.id}/quests`, guessData);
};
export const deleteGuestsFromGroup = async (id, guestId) => {
  return client.delete(`/groups/${id}/quests`, guestId);
};
