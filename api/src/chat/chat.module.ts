import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlockedModule } from "src/blocked/blocked.module";
import { UsersModule } from "src/users/users.module";
import { SocketModule } from "../socket/socket.module";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { MessageEntity } from "./entities/message.entity";

@Module({
  imports: [SocketModule, UsersModule, BlockedModule, TypeOrmModule.forFeature([MessageEntity])],
  providers: [ChatGateway, ChatService]
})
export class ChatModule {}