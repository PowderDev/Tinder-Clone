import $api from "../../helpers/http";
import { CreateExhibitDTO, Exhibit, Tag } from "../../types/exhibit";

export const getMyFeed = async () => {
  try {
    const { data } = await $api.get<Exhibit[]>("/exhibit/feed");
    return data;
  } catch (err: any) {
    console.error(err);
    console.log(err?.response?.data?.message);
  }
};

export const getExhibitById = async (id: number) => {
  try {
    const { data } = await $api.get<Exhibit>(`/exhibit/${id}`);
    return data;
  } catch (err: any) {
    console.error(err);
    console.log(err?.response?.data?.message);
  }
};

export const getAllTags = async () => {
  try {
    const { data } = await $api.get<Tag[]>(`/tag/all`);
    return data;
  } catch (err: any) {
    console.error(err);
    console.log(err?.response?.data?.message);
  }
};

export const getMyExhibit = async () => {
  try {
    const { data } = await $api.get<Exhibit>(`/exhibit/my`);
    return data;
  } catch (err: any) {
    console.error(err);
    console.log(err?.response?.data?.message);
  }
};

export const createNewExhibit = async (dto: FormData) => {
  try {
    const { data } = await $api.post<Exhibit>(`/exhibit/create`, dto);
    return data;
  } catch (err: any) {
    console.error(err);
    return err?.response?.data?.message;
  }
};
