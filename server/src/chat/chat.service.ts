import { BadRequestException, Injectable } from "@nestjs/common"
import { Chat, Message, User } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"
import { AddMessageDTO } from "./chat.dto"

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(participantId: number, userId: number) {
    const exists = await this.prisma.chat.findFirst({
      where: { participantIds: { hasEvery: [participantId, userId] } },
      include: {
        participants: true,
        messages: { take: 30, orderBy: { id: "desc" }, include: { sender: true } },
      },
    })

    if (exists) {
      const participant = this.extractParticipant(exists.participants, userId)
      delete exists.participants
      exists.messages = this.removeFieldsFromMessages(exists.messages).reverse()
      return { ...exists, participant }
    }

    const participants = [participantId, userId].reduce((acc, id) => {
      acc.push({ id })
      return acc
    }, [])

    const chat = await this.prisma.chat.create({
      data: { participants: { connect: participants }, participantIds: [participantId, userId] },
      include: { participants: true, messages: { take: 30, include: { sender: true } } },
    })

    const participant = this.extractParticipant(chat.participants, userId)
    delete chat.participants
    return { ...chat, participant }
  }

  async addMessage(dto: AddMessageDTO, participantId: number): Promise<Message> {
    const exists = await this.prisma.chat.findUnique({ where: { id: dto.chatId } })

    if (!exists) {
      const newChat = await this.createChat(participantId, dto.senderId)
      dto.chatId = newChat.id
    }

    const msg = await this.prisma.message.create({
      data: {
        text: dto.text,
        chat: { connect: { id: dto.chatId } },
        sender: { connect: { id: dto.senderId } },
      },
      include: {
        sender: true,
      },
    })

    await this.prisma.chat.update({
      where: { id: dto.chatId },
      data: { messages: { connect: { id: msg.id } } },
    })

    return msg
  }

  async getChatById(id: number, userId: number, take = 30) {
    const chat = await this.prisma.chat.findUnique({
      where: { id },
      include: {
        participants: true,
        messages: { take, orderBy: { id: "desc" }, include: { sender: true } },
      },
    })

    if (!chat) {
      throw new BadRequestException("Chat with this ID not found")
    }

    const count = await this.prisma.message.count({ where: { chatId: chat.id } })
    const lastPage = Math.ceil(count / take)

    chat.messages = this.removeFieldsFromMessages(chat.messages).reverse()

    const participant = this.extractParticipant(chat.participants, userId)
    delete chat.participants
    return { ...chat, participant, lastPage }
  }

  async getMyChats(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    let chats = await this.prisma.chat.findMany({
      include: {
        participants: true,
        messages: { orderBy: { createdAt: "desc" }, take: 1, include: { sender: true } },
      },
      where: { participants: { some: user } },
    })

    chats = chats.reduce((acc, chat) => {
      const participant = this.extractParticipant(chat.participants, user.id)
      let lastMessage = {}
      if (chat.messages.length > 0) {
        delete chat.messages[0].sender.password
        lastMessage = chat.messages[0]
      }
      delete chat.participants
      delete chat.messages
      acc.push({ ...chat, participant, lastMessage })
      return acc
    }, [])

    return chats
  }

  async getMoreMessages(chatId: number, skip: number, take = 30): Promise<Message[]> {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        messages: { take, skip: skip * take, orderBy: { id: "desc" }, include: { sender: true } },
      },
    })

    if (!chat) {
      throw new BadRequestException("Chat with this ID not found")
    }

    chat.messages = this.removeFieldsFromMessages(chat.messages).reverse()
    return chat.messages
  }

  removeFieldsFromMessages(messages: (Message & { sender: User })[]) {
    const msgs = messages.reduce((acc, msg) => {
      delete msg.sender.password
      const m = { ...msg }
      acc.push(m)
      return acc
    }, [])
    return msgs
  }

  extractParticipant(participants: User[], userId: number) {
    const p = participants.filter((u) => u.id != userId)[0]
    delete p.password
    return p
  }
}
