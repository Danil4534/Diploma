import { Body } from '@nestjs/common';

import {
    ConnectedSocket,
    MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server, Socket } from "socket.io";
import { PrismaService } from "./prisma.service";

export class CreateMessageDTO{
    content:string
    userId: string
}


@WebSocketGateway({cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['content-type'],
    credentials: true, 
  }},)

  export class ChatGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;
    constructor(private prisma: PrismaService) {}
  
    handleConnection(client: Socket) {
      console.log('Client connected: ', client.id);
    }
  
    @SubscribeMessage('sendMessage')
   
   
   async handleMessage(
      @MessageBody() createMessageData: CreateMessageDTO,
      @ConnectedSocket() client: Socket,
    ) {
      const message = await this.prisma.message.create({
        data: {
          content: createMessageData.content,
          userId: createMessageData.userId,
        },
        include: {
          user: true,
        },
      });
      this.server.emit('message', message);
    }
  }