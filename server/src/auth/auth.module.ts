import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { UserModule } from "src/user/user.module"
import { TokenModule } from "src/token/token.module"
import { TokenService } from "src/token/token.service"
import { UserService } from "src/user/user.service"
import { PrismaService } from "src/prisma/prisma.service"
import { CloudinaryService } from "src/cloudinary/cloudinary.service"
import { CloudinaryProvider } from "src/cloudinary/cloudinary.provider"

@Module({
  imports: [UserModule, TokenModule],
  providers: [
    AuthService,
    TokenService,
    UserService,
    PrismaService,
    CloudinaryService,
    CloudinaryProvider,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
