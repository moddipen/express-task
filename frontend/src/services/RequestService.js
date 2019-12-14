import axios from "axios";

delete axios.defaults.headers.common["Accept"];

export const getRequest = api => {
  return new Promise((resolve, reject) => {
    return axios
      .get(process.env.API_HOST + api)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const postRequest = (api, data = {}, header = {}) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(process.env.API_HOST + api, data, header)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const putRequest = (api, data = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .put(process.env.API_HOST + api, data)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const deleteRequest = api => {
  return new Promise((resolve, reject) => {
    axios
      .delete(process.env.API_HOST + api)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};
