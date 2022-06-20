import { Injectable } from "@nestjs/common"
import { Tag } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateTagDTO } from "./tag.dto"

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async createTag(dto: CreateTagDTO): Promise<Tag> {
    return await this.prisma.tag.create({ data: dto })
  }

  async getAllTags(): Promise<Tag[]> {
    return await this.prisma.tag.findMany()
  }
}
