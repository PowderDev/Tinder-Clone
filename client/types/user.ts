export interface AuthResponse {
  accessToken: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  photoURL: string;
  role: "USER" | "ADMIN";
  sex: "MALE" | "FEMALE";
  age: number;
}
