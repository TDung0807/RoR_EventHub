import { client } from "../http-common";
export const getAllDishedFromRestaurant = async ({ queryKey }) => {
  const [_, id] = queryKey;
  console.log(queryKey);
  return client.get(`/restaurants/${id}/dishes`);
};
export const createdDished = async (dishedData) => {
  return client.post(
    `/restaurants/${dishedData.restaurant_id}/dishes`,
    dishedData
  );
};
