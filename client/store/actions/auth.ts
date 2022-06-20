import $api, { deleteCookie } from "../../helpers/http";
import { AuthResponse } from "../../types/user";

export const onSubmitLogin = async (values: Object): Promise<string | undefined> => {
  try {
    const { data } = await $api.post<AuthResponse>("/auth/login", values);
    localStorage.setItem("token", data.accessToken);
  } catch (err: any) {
    console.error(err);
    return err?.response?.data?.message;
  }
};

export const onSubmitRegister = async (data: Object, photo: Blob): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append("photo", photo);
  for (const key in data) {
    if (key === "confirmPassword") continue;
    //@ts-expect-error
    const value = data[key];
    formData.append(key, value);
  }
  try {
    const res = await $api.post<AuthResponse>("/auth/register", formData);
    localStorage.setItem("token", res.data.accessToken);
    return "";
  } catch (err: any) {
    console.error(err);
    return err?.response?.data?.message;
  }
};

export const logout = async () => {
  try {
    await $api.post<AuthResponse>("/auth/logout");
    localStorage.removeItem("token");
    deleteCookie("refreshToken");
    return "";
  } catch (err: any) {
    console.error(err);
    return err?.response?.data?.message;
  }
};
