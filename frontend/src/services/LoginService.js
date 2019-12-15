import { postRequest } from "./RequestService";

export const login = (data = {}) => {
  return postRequest("auth/login", data);
};
