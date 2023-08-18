import { IUserLogin, IUserRegister } from "@interfaces/auth/auth.interface";
import { postRequest } from "utils/axios";
import { getCurrentFormattedTime } from "utils/functions";
import userService from "./user.service";

const register = async (userData: IUserRegister) => {
  try {
    const response = await postRequest("auth/register", userData);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const login = async (userData: IUserLogin) => {
  const response = await postRequest("auth/login", userData);
  if (response.data.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
    const body = {
      userId: response.data.data._id,
      type: "LOGIN",
      value: getCurrentFormattedTime(),
    };
    await userService.createUserHistory(body)
  }
  return response.data.data;
};

const logout = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "");
    if (user) {
      const body = {
        userId: user._id,
        type: "LOGOUT",
        value: getCurrentFormattedTime(),
      };
      await userService.createUserHistory(body)
    }
    return localStorage.removeItem("user");
  } catch (error) {

  }
};

export default {
  register,
  login,
  logout,
};
