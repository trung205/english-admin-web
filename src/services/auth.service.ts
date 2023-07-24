import { IUserLogin, IUserRegister } from "@interfaces/auth/auth.interface";
import { postRequest } from "utils/axios";

const register = async (userData: IUserRegister) => {
  try {
    const response = await postRequest("auth/register", userData)
    return response;
  } catch (error) {
    console.log(error)
  }
};

const login = async (userData: IUserLogin) => {
  const response = await postRequest("auth/login", userData);
  if (response.data.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data.data;
};

const logout = () => {
  return localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
