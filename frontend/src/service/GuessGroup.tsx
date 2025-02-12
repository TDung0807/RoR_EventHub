import { client } from "../http-common";
export const getAllGroup = async () => {
  return client.get(`/groups/quests`);
};
export const getGroupById = async (id) => {
  return client.get(`/groups/${id}`);
};
export const createdGroup = async (groupData) => {
  return client.post(`/groups`, groupData);
};
export const putGroupById = async (id, groupData) => {
  return client.post(`/groups/${id}`, groupData);
};
export const deleteGroupById = async (id) => {
  return client.delete(`/groups/${id}`);
};
