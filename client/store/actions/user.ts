import $api from "../../helpers/http";
import { User } from "../../types/user";

export const getMe = async () => {
  try {
    const { data } = await $api.get<User>("/user/me");
    return data;
  } catch (err: any) {
    localStorage.removeItem("token");
    console.log(err);
    console.log(err?.response?.data?.message);
  }
};
