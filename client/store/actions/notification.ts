import $api from "../../helpers/http";
import { Notification } from "../../types/notification";

export const createNotification = async (toId: number) => {
  try {
    await $api.post(`/notification/like?toId=${toId}`);
  } catch (err: any) {
    console.error(err);
    console.log(err?.response?.data?.message);
  }
};

export const dislikeNotification = async (id: number) => {
  try {
    await $api.put(`/notification/dislike/${id}`);
  } catch (err: any) {
    console.error(err);
    console.log(err?.response?.data?.message);
  }
};

export const getMyNotifications = async () => {
  try {
    const { data } = await $api.get<{ myNotifications: Notification[]; liked: Notification[] }>(
      "/notification/my"
    );
    return data;
  } catch (err: any) {
    console.error(err);
    console.log(err?.response?.data?.message);
  }
};

export const deleteNotification = async (id: number) => {
  try {
    await $api.delete(`/notification/${id}`);
  } catch (err: any) {
    console.error(err);
    console.log(err?.response?.data?.message);
  }
};
