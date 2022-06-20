import { JwtAuthGuard } from "./../auth/jwt.guard";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { AddMessageDTO } from "./chat.dto";
import { ChatService } from "./chat.service";
import { Socket, Server } from "socket.io";

@WebSocketGateway({
  namespace: "chat",
  cors: { origin: "http://localhost:3000" },
})
export class ChatGateway {
  constructor(private service: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("joinChat")
  async joinChat(@ConnectedSocket() socket: Socket, @MessageBody() body: { chatId: number }) {
    if (!socket.rooms.has(body.chatId.toString())) {
      socket.join(body.chatId.toString());
    }
  }

  @SubscribeMessage("leaveChat")
  async leaveChat(@ConnectedSocket() socket: Socket, @MessageBody() body: { chatId: number }) {
    socket.leave(body.chatId.toString());
  }

  @SubscribeMessage("addMessage")
  async handleMessage(@MessageBody() body: AddMessageDTO) {
    const dto = { senderId: body.senderId, text: body.text, chatId: body.chatId };
    const message = await this.service.addMessage(dto, body.participantId);
    this.server.in(body.chatId.toString()).emit("messageAdded", message);
  }
}
