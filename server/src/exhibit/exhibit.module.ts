import { CloudinaryProvider } from "./../cloudinary/cloudinary.provider"
import { Module } from "@nestjs/common"
import { ExhibitService } from "./exhibit.service"
import { ExhibitController } from "./exhibit.controller"
import { PrismaService } from "src/prisma/prisma.service"
import { CloudinaryService } from "src/cloudinary/cloudinary.service"

@Module({
  providers: [ExhibitService, PrismaService, CloudinaryProvider, CloudinaryService],
  controllers: [ExhibitController],
})
export class ExhibitModule {}
