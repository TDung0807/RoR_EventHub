import { client } from "../http-common";

export const addRestaurant = async (RestaurantData) => {
  return client.post(`/restaurants`, RestaurantData);
};
export const getRestaurants = async () => {
  return client.get(`/restaurants`);
};
export const getRestaurantById = async (RestaurantId) => {
  return client.get(`/restaurants/${RestaurantId}`);
};
