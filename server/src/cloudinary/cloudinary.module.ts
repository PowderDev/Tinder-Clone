import { Module } from "@nestjs/common"
import { CloudinaryController } from "./cloudinary.controller"
import { CloudinaryProvider } from "./cloudinary.provider"
import { CloudinaryService } from "./cloudinary.service"

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  controllers: [CloudinaryController],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
