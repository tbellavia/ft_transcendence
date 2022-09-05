import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ChatGateway } from "./chat.gateway";

@Module({
  imports: [AuthModule, ChatGateway],
  providers: []
})
export class ChatModule {}