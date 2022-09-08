import { Module } from "@nestjs/common";
import { SocketModule } from "../socket/socket.module";
import { ChatGateway } from "./chat.gateway";

@Module({
  imports: [SocketModule, SocketModule],
  providers: [ChatGateway]
})
export class ChatModule {}