import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async like(fromId: number, toId: number) {
    const exists = await this.prisma.notification.findFirst({
      where: { fromId: { in: [fromId, toId] }, toId: { in: [fromId, toId] } },
    })
    if (exists) {
      await this.prisma.notification.update({
        where: { id: exists.id },
        data: { liked: [fromId, toId] },
      })
    }
    await this.prisma.notification.create({ data: { fromId, toId, liked: [fromId] } })
  }

  async dislike(id: number) {
    const notif = await this.prisma.notification.findUnique({ where: { id } })
    if (!notif) {
      throw new NotFoundException("Notification with this ID is not found")
    }
    await this.prisma.notification.update({
      where: { id },
      data: { liked: [notif.fromId] },
    })
  }

  async getMyNotifications(userId: number) {
    const myNotifications = await this.prisma.notification.findMany({
      where: { toId: userId },
      include: { from: true },
    })

    const liked = await this.prisma.notification.findMany({
      where: { fromId: userId },
    })

    return { myNotifications, liked }
  }

  async deleteNotification(id: number) {
    await this.prisma.notification.delete({ where: { id } })
  }
}
