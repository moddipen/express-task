import { postRequest } from "./RequestService";

export const login = data => {
  return postRequest("loginValidate.php", data);
};
