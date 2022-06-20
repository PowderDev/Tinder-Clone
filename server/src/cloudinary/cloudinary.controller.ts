import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { CloudinaryService } from "./cloudinary.service"

@Controller("cloudinary")
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("photo"))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const res = await this.cloudinaryService.uploadFile(file)
    return res.url
  }
}
