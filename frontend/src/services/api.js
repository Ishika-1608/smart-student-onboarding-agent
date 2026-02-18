import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const getNextAction = (admissionId) => {
  return API.get(`next-action/${admissionId}/`);
};

export const getTasks = (admissionId) => {
  return API.get(`tasks/${admissionId}/`);
};

export const chatWithAgent = (data) => {
  return API.post("chat/", data);
};
