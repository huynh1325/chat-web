import { Controller, Get, Post, Body, Patch, Param, Delete, OnModuleInit } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  // constructor(private readonly messageGateway: MessageGateway) {}


  // @Post()
  // sendMessage(@Body() body: { content: string; sender: string }) {
  //   const message = {
  //     content: body.content,
  //     sender: body.sender,
  //     createdAt: new Date(),
  //   };

  //   this.messageGateway.sendMessage(message);

  //   return message;
  // }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
