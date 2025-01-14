import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@WebSocketGateway({ cors: { origin: ['http://localhost:3000'] }})
export class MessageGateway implements OnModuleInit {
  @WebSocketServer()server: Server;
  constructor(private readonly messageService: MessageService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() message: string, sender: string ) {
    const savedMessage = await this.messageService.saveMessage(message, sender);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: message,
    });

    return savedMessage
  }
}
