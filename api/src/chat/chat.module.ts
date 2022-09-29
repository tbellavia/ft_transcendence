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
import { MuteEntity } from "./entities/mute.entity";
import { MuteService } from "./mute.service";

@Module({
  imports: [SocketModule, UsersModule, BlockedModule, TypeOrmModule.forFeature([MessageEntity, ChannelEntity, UserEntity, MuteEntity])],
  providers: [ChatGateway, ChatService, ChannelsService, MuteService]
})
export class ChatModule {}