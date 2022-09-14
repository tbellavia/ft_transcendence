import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { SocketService } from "./socket.service";

@Module({
  imports: [AuthModule, UsersModule],
  providers: [SocketService],
  exports: [SocketService]
})
export class SocketModule {}