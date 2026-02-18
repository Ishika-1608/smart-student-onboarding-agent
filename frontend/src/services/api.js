import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-student-onboarding-agent.onrender.com/api/",
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
export default API;