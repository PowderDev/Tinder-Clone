import { User } from "./user";

export interface Exhibit {
  id: number;
  user: User;
  description: string;
  tags: Tag[];
  photoURLs: string[];
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface CreateExhibitDTO {
  photoURLs: string[];
  tags: number[];
  description: string;
}

export interface FileToUpload {
  id: number;
  value: Blob;
}

export interface photoItem {
  id: number;
  url: string;
}

export interface TagAsSelectOption {
  value: number;
  label: string;
  color: string;
}
