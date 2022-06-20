import { Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { PrismaService } from "src/prisma/prisma.service"
import { CloudinaryService } from "src/cloudinary/cloudinary.service"
import { CloudinaryProvider } from "src/cloudinary/cloudinary.provider"

@Module({
  providers: [PrismaService, UserService, CloudinaryService, CloudinaryProvider],
  controllers: [UserController],
})
export class UserModule {}
