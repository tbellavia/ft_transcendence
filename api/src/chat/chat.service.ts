import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { MessageEntity } from "./entities/message.entity";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>
  ) {}

  async saveMessage(message: MessageEntity) {
    const newMessage = this.messageRepository.create(message);
    await this.messageRepository.save(newMessage);
  }

  async getAllMessageFromAuthorToTarget(author: UserEntity, target: UserEntity) {
    return await this.messageRepository.find({
      where: {
        author: {
          username: author.username
        },
        target: {
          username: target.username
        }
      },
    });
  }
}