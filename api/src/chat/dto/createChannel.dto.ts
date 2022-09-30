import { IsBoolean } from "class-validator";
import { JoinChannelDTO } from "./joinChannel.dto";

export class CreateChannelDTO extends JoinChannelDTO {
  @IsBoolean()
  private: boolean
}