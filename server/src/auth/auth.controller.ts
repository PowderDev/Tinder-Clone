import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  UseInterceptors,
  UploadedFile,
  Get,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { Request, Response } from "express"
import { CloudinaryService } from "src/cloudinary/cloudinary.service"
import { User } from "src/user/user.decorator"
import { CreateUserDTO } from "src/user/user.dto"
import { LoginUserDTO } from "./auth.dto"
import { AuthService } from "./auth.service"
import { JwtAuthGuard } from "./jwt.guard"

@Controller("auth")
export class AuthController {
  constructor(private service: AuthService, private cloudinaryService: CloudinaryService) {}

  @Post("register")
  @UseInterceptors(FileInterceptor("photo"))
  async register(
    @Body() dto: CreateUserDTO,
    @Res({ passthrough: true }) res: Response,
    @UploadedFile() file: Express.Multer.File
  ) {
    const photoResponse = await this.cloudinaryService.uploadFile(file)
    const tokens = await this.service.register({ ...dto, photoURL: photoResponse.url })
    res.cookie("refreshToken", tokens.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30 })
    return { accessToken: tokens.accessToken }
  }

  @Post("login")
  async login(@Body() dto: LoginUserDTO, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.service.login(dto)
    res.cookie("refreshToken", tokens.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30 })
    return { accessToken: tokens.accessToken }
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  async logout(@User("id", ParseIntPipe) userId: number) {
    await this.service.logout(userId)
    return { success: true }
  }

  @Get("refresh")
  async refresh(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const tokens = await this.service.refresh(req.cookies["refreshToken"])
    res.cookie("refreshToken", tokens.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30 })
    return { accessToken: tokens.accessToken }
  }
}
