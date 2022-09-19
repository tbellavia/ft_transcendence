import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlockedModule } from "src/blocked/blocked.module";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersModule } from "src/users/users.module";
import { SocketModule } from "../socket/socket.module";
import { ChannelsService } from "./channels.service";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { ChannelEntity } from "./entities/channel.entity";
import { MessageEntity } from "./entities/message.entity";

@Module({
  imports: [SocketModule, UsersModule, BlockedModule, TypeOrmModule.forFeature([MessageEntity, ChannelEntity, UserEntity])],
  providers: [ChatGateway, ChatService, ChannelsService]
})
export class ChatModule {}