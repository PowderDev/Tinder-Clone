import {
  Controller,
  Get,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { JwtAuthGuard } from "src/auth/jwt.guard"
import { CloudinaryService } from "src/cloudinary/cloudinary.service"
import { User } from "./user.decorator"
import { UserService } from "./user.service"

@Controller("user")
export class UserController {
  constructor(private service: UserService, private cloudinaryService: CloudinaryService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getUser(@User("id", ParseIntPipe) userId: number) {
    return await this.service.getMe(userId)
  }

  @Post("avatar")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("photo"))
  async updateAvatar(
    @UploadedFile() file: Express.Multer.File,
    @User("id", ParseIntPipe) userId: number
  ) {
    const res = await this.cloudinaryService.uploadFile(file)
    return await this.service.updateAvatar(userId, res.url)
  }
}
