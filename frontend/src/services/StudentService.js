import { postRequest, getRequest, putRequest, deleteRequest } from "./RequestService";


export const loadStudents = () => {
  return getRequest("api/students");
};

export const getStudent = id => {
  return getRequest("api/students/"+id);
};

export const getProjects = id => {
  return getRequest("api/students/projects/"+id);
};

export const saveStudent = data => {
  return postRequest("api/students", data);
};

export const updateStudent = (data, id) => {
  return putRequest("api/students/"+id, data);
};

export const deleteStudent = id => {
  return deleteRequest("api/students/"+id);
};

export const uploadProfile = (data, id) => {
  return putRequest("api/students/profile/"+id, data);
};
