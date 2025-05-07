import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';

import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatService: ChatService) {}

  // @SubscribeMessage('getChats')
  // async handleGetChats(
  //   @MessageBody() userId: string,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   const chats = await this.chatService.getAllUserChats(userId);
  //   client.emit('chats', chats);
  //   this.server.emit('chats', chats);
  //   return chats;
  // }

  @SubscribeMessage('createChat')
  async handleCreateChat(
    @MessageBody() createChatDto: CreateChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    const newChat = await this.chatService.createChat(createChatDto);
    const updatedChats = await this.chatService.getAllUserChats(
      createChatDto.userId1,
    );
    this.server.emit('chatsUpdated', updatedChats);
    client.emit('chatCreated', newChat);
    return newChat;
  }

  @SubscribeMessage('getAllChats')
  async getAllChats(@ConnectedSocket() client) {
    const chats = await this.chatService.getAllChats();
    this.server.emit('chats', chats);
    client.emit('chats', chats);
  }

  @SubscribeMessage('getUserChats')
  async getUserChats(@ConnectedSocket() client, @MessageBody() userId: string) {
    const userChats = await this.chatService.getAllUserChats(userId);
    this.server.emit('userChats', userChats);
    client.emit('userChats', userChats);
  }

  @SubscribeMessage('sendMessage')
  async create(
    @MessageBody() createChatDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(client);
    const message = await this.chatService.createMessage(createChatDto);
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('getMessages')
  async handleGetMessage(@MessageBody() chatId: string) {
    return this.chatService.getMessages(chatId);
  }
}
