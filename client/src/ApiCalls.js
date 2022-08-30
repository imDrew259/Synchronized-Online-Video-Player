import axios from "axios";

const baseURL = "http://localhost:5000/api/auth";

export const LoginCall = async (data) => {
  const res = await axios.post(`${baseURL}/login`, data, {
    withCredentials: true,
  });
  return res;
};

export const RegisterCall = async (data) => {
  console.log(data);
  const res = await axios.post(`${baseURL}/register`, data, {
    withCredentials: true,
  });
  return res;
};

export const getUserCall = async () => {
  const res = await axios.get(`${baseURL}/getUser`, { withCredentials: true });
  return res;
};

export const LogoutCall = async () => {
  const res = await axios.get(`${baseURL}/logout`, { withCredentials: true });
  return res;
};
