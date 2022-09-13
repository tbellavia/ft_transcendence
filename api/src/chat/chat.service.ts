import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { MessageEntity } from "./entities/message.entity";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  async saveMessage(message: MessageEntity) {
    const newMessage = this.messageRepository.create(message);
    await this.messageRepository.save(newMessage);
  }

  async getAllDirectMessages(user1: UserEntity, user2: UserEntity) {
    return await this.messageRepository.find({
      where: [{
        author: {
          username: user1.username
        },
        target: {
          username: user2.username
        }
      },
      {
        author: {
          username: user2.username
        },
        target: {
          username: user1.username
        }
      }],
      order: {
        creation_date: "ASC"
      }
    })
  }
}