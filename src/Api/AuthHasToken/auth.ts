import axiosInstance from "./axios";

export const authLogin = async (body: any) => {
  const res = await axiosInstance.post(`/api/user/login`, body);
  return res;
};

export const authRegister = async (body: any) => {
  const res = await axiosInstance.post(`/api/user/register`, body);
  return res;
};

export const authRefreshToken = async (body: any) => {
  const res = await axiosInstance.post(`/api/user/refresh`, body);
  return res.data;
};

export const guiBinhLuan = async (id: number | string, body: any) => {
  const res = await axiosInstance.post(`/api/comments/${id}`, body);
  return res;
};

  