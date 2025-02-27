import axios from "axios";

export const client = (() => {
  return axios.create({
    baseURL: "http://52.221.246.66:3000",
    headers: {
      Accept: "application/json",
    },
  });
})();

const request = async (options) => {
  const onSuccess = (response) => {
    const { data } = response;
    return data;
  };

  const onError = function (error) {
    return Promise.reject({
      message: error.message,
      code: error.code,
      response: error.response,
    });
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
