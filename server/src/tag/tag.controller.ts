import { Body, Controller, Get, Post } from "@nestjs/common"
import { CreateTagDTO } from "./tag.dto"
import { TagService } from "./tag.service"

@Controller("tag")
export class TagController {
  constructor(private service: TagService) {}

  @Post("create")
  async createTag(@Body() dto: CreateTagDTO) {
    return await this.service.createTag(dto)
  }

  @Get("all")
  async getAllTags() {
    return await this.service.getAllTags()
  }
}
