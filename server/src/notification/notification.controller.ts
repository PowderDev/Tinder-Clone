import { JwtAuthGuard } from "src/auth/jwt.guard"
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common"
import { NotificationService } from "./notification.service"
import { User } from "src/user/user.decorator"

@Controller("notification")
export class NotificationController {
  constructor(private service: NotificationService) {}

  @Get("my")
  @UseGuards(JwtAuthGuard)
  async getAllNotifications(@User("id", ParseIntPipe) userId: number) {
    return await this.service.getMyNotifications(userId)
  }

  @Post("like")
  @UseGuards(JwtAuthGuard)
  async createNotifications(
    @Query() query: { toId: string },
    @User("id", ParseIntPipe) userId: number
  ) {
    await this.service.like(userId, Number(query.toId))
    return { success: true }
  }

  @Put("dislike/:id")
  @UseGuards(JwtAuthGuard)
  async dislike(@Param() params: { id: string }) {
    await this.service.dislike(Number(params.id))
    return { success: true }
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async deleteNotifications(@Param() params: { id: string }) {
    await this.service.deleteNotification(Number(params.id))
    return { success: true }
  }
}
