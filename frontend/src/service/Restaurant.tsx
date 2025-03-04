import { client } from "../http-common";

export const addRestaurant = async (RestaurantData) => {
  return client.post(`/restaurants`, RestaurantData);
};
export const putRestaurant = async (RestaurantData) => {
  return client.put(`/restaurants/${RestaurantData.id}`, RestaurantData);
};
export const getRestaurants = async () => {
  return client.get(`/restaurants`);
};
export const getRestaurantById = async ({ queryKey }) => {
  const [_, id] = queryKey;

  return client.get(`/restaurants/${id}`);
};
export const deleteRestaurant = async (id) => {
  return client.delete(`/restaurants/${id}`);
};
