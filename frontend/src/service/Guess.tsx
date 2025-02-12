import { client } from "../http-common";
export const getAllGuessFromGroup = async (id) => {
  return client.get(`/groups/${id}/quests`);
};
export const addGuestsToGroup = async (id, guessData) => {
  return client.post(`/groups/${id}/quests`, guessData);
};
export const deleteGuestsFromGroup = async (id, guestId) => {
  return client.delete(`/groups/${id}/quests`, guestId);
};
