import { Sex } from "@prisma/client"

export interface CreateUserDTO {
  email: string
  password: string
  firstName: string
  lastName: string
  age: string
  photoURL: string
  sex: Sex
}
