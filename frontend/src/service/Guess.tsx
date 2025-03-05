import { client } from "../http-common";
export const getAllGuessFromGroup = async ({ queryKey }) => {
  const [_, id] = queryKey;
  return client.get(`/groups/${id}/quests`);
};
export const getGuestByEmail = async (email) => {
  const emailSended = await encodeURIComponent(email).replace(/\./g, "%2E");
  return client.get(`/quests/find_by_email?email=${emailSended}`);
};
export const getGuestByName = async (name) => {
  return client.get(`/quests/find_by_name/${name}`);
};
export const addGuestsToGroup = async (guessData) => {
  return client.post(`/groups/${guessData.group_id}/quests`, guessData);
};
export const deleteGuestsFromGroup = async (guessData) => {
  return client.delete(
    `/groups/${guessData.group_id}/quests/${guessData.quest_id}`
  );
};
export const createdGuest = async (guessData) => {
  return client.post(`/quests`, guessData);
};
