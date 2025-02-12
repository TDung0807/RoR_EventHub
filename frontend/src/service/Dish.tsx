import { client } from "../http-common";
export const getAllDishedFromRestaurant = async (id) => {
  return client.get(`/restaurants/${id}/dishes`);
};
export const createdDished = async (id, dishedData) => {
  return client.get(`/restaurants/${id}/dishes`, dishedData);
};
