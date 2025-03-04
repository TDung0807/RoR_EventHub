import { client } from "../http-common";
export const getAllDishedFromRestaurant = async ({ queryKey }) => {
  const [_, id] = queryKey;
  return client.get(`/restaurants/${id}/dishes`);
};
export const createdDished = async (dishedData) => {
  return client.post(
    `/restaurants/${dishedData.restaurant_id}/dishes`,
    dishedData
  );
};
export const editDished = async (dishedData) => {
  return client.put(`/dishes/${dishedData.id}`, dishedData);
};
export const deleteDishedById = async (id) => {
  return client.delete(`/dishes/${id}`);
};
