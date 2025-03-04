import { client } from "../http-common";
export const getAllIntergrient = async () => {
  return client.get(`/ingredients`);
};
export const getAllIntergrientById = async (id) => {
  return client.get(`/ingredients/${id}`);
};
export const getAllIntergrientByDishedId = async (id) => {
  return client.get(`/dishes/${id}/ingredients`);
};
export const addIntergrient = async (integrientData) => {
  return client.post(`/ingredients`, integrientData);
};
export const putIntergrient = async (id, integrientData) => {
  return client.put(`/ingredients/${id}`, integrientData);
};
export const deleteIntergrient = async (integrientData) => {
  return client.delete(
    `/dishes/${integrientData.id}/remove_ingredients`,
    integrientData
  );
};
