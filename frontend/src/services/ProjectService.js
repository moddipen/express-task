import { postRequest, getRequest, putRequest, deleteRequest } from "./RequestService";


export const loadProjects = () => {
  return getRequest("api/projects");
};

export const getProject = id => {
  return getRequest("api/projects/"+id);
};

export const saveProject = data => {
  return postRequest("api/projects", data);
};

export const updateProject = (data, id) => {
  return putRequest("api/projects/"+id, data);
};

export const deleteProject = id => {
  return deleteRequest("api/projects/"+id);
};

export const searchProjects = (search) => {
  return getRequest("api/projects/search?name="+search);
};