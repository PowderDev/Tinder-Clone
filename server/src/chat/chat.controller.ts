import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/auth/jwt.guard"
import { User } from "src/user/user.decorator"
import { CreateMessageDTO } from "./chat.dto"
import { ChatService } from "./chat.service"

@Controller("chat")
export class ChatController {
  constructor(private service: ChatService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard)
  async createChat(
    @Body() body: { participantId: number },
    @User("id", ParseIntPipe) userId: number
  ) {
    return await this.service.createChat(body.participantId, userId)
  }

  @Post("message/add")
  @UseGuards(JwtAuthGuard)
  async addMessage(
    @Body() dto: CreateMessageDTO,
    @User("id", ParseIntPipe) userId: number,
    @Query() query: { participantId: string }
  ) {
    return await this.service.addMessage(
      { ...dto, senderId: userId },
      parseInt(query.participantId)
    )
  }

  @Get("message/more")
  @UseGuards(JwtAuthGuard)
  async moreMessages(@Query() query: { skip: string; chatId: string }) {
    return await this.service.getMoreMessages(parseInt(query.chatId), parseInt(query.skip))
  }

  @Get("my")
  @UseGuards(JwtAuthGuard)
  async getMyChats(@User("id", ParseIntPipe) userId: number) {
    return await this.service.getMyChats(userId)
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getChatById(@Param() params: { id: string }, @User("id", ParseIntPipe) userId: number) {
    return await this.service.getChatById(parseInt(params.id), userId)
  }
}
