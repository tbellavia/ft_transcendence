import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseWsExceptionFilter} from "@nestjs/websockets";

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    super.catch(exception, host);
  }
}