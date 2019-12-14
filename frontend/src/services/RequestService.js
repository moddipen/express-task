import axios from "axios";

delete axios.defaults.headers.common["Accept"];

export const getRequest = api => {
  return new Promise((resolve, reject) => {
    return axios
      .get(apiHost + api)
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
      .post(apiHost + api, data, header)
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
      .put(apiHost + api, data)
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
      .delete(apiHost + api)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};
