import axios from "axios";
import { API_HOST } from "../config/config.dev";

delete axios.defaults.headers.common["Accept"];
const bearer = "Bearer " + localStorage.getItem('token')
axios.defaults.headers.common["Authorization"] = bearer

export const getRequest = api => {
  return new Promise((resolve, reject) => {
    return axios
      .get(API_HOST + api)
      .then(resp => {
        resolve(resp.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const postRequest = (api, data = {}, header = {}) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(API_HOST + api, data, header)
      .then(resp => {
        resolve(resp.data);
      })
      .catch(err => {
        reject(err.response);
      });
  });
};

export const putRequest = (api, data = {}) => {
  console.log(api, data);
  
  return new Promise((resolve, reject) => {
    axios
      .put(API_HOST + api, data)
      .then(resp => {
        resolve(resp.data);
      })
      .catch(err => {
        reject(err.response);
      });
  });
};

export const deleteRequest = api => {
  return new Promise((resolve, reject) => {
    axios
      .delete(API_HOST + api)
      .then(resp => {
        resolve(resp.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
