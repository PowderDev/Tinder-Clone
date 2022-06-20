import { CloudinaryService } from "./../cloudinary/cloudinary.service"
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import { FilesInterceptor } from "@nestjs/platform-express"
import { Request } from "express"
import { JwtAuthGuard } from "src/auth/jwt.guard"
import { CreateExhibitDTO } from "./exhibit.dto"
import { ExhibitService } from "./exhibit.service"
import { User } from "src/user/user.decorator"
import { Sex } from "@prisma/client"

@Controller("exhibit")
export class ExhibitController {
  constructor(private service: ExhibitService, private cloudinary: CloudinaryService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("photos", 5))
  async createExhibit(
    @Body() dto: CreateExhibitDTO,
    @User("id", ParseIntPipe) userId: number,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    const UploadedFiles = []
    for (const file of files) {
      const photo_res = await this.cloudinary.uploadFile(file)
      UploadedFiles.push(photo_res.url)
    }
    if (dto.photoURLs) {
      if (dto.photoURLs instanceof Array) {
        dto.photoURLs = dto.photoURLs.concat(UploadedFiles)
      } else {
        dto.photoURLs = UploadedFiles.concat([dto.photoURLs])
      }
    } else {
      dto.photoURLs = UploadedFiles
    }
    return await this.service.createExhibit(dto, userId)
  }

  @Get("feed")
  @UseGuards(JwtAuthGuard)
  async getMyFeed(
    @Query() query: { take?: number; skip?: number },
    @User() user: { sex: Sex; id: number }
  ) {
    return await this.service.getMyFeed(user["sex"], query.take, query.skip, user["id"])
  }

  @Post(":id/saw")
  @UseGuards(JwtAuthGuard)
  async addToSaw(@User("id", ParseIntPipe) userId: number, @Param() params: { id: string }) {
    await this.service.addUserToSaw(parseInt(params.id), userId)
    return { success: true }
  }

  @Get("my")
  @UseGuards(JwtAuthGuard)
  async getMyExhibit(@User("id", ParseIntPipe) userId: number) {
    return await this.service.getMyExhibit(userId)
  }

  @Get(":id")
  async getExhibitById(@Param() params: { id: string }) {
    return await this.service.getExhibitById(parseInt(params.id))
  }
}
