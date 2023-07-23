import { IUserLogin, IUserRegister } from "@interfaces/auth/auth.interface";
import { postRequest } from "utils/axios";

const register = (userData: IUserRegister) => {
  return postRequest("auth/register", userData);
};

const login = async (userData: IUserLogin) => {
  const response = await postRequest("auth/login", userData);
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
