import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";
import { authenticator } from "otplib";
import { UserEntity } from "src/users/entities/user.entity";

@Injectable()
export class TwoFactorAuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService
  ) {}

  /**
   * Generate otpurl and secret shared password for user's account on
   * app
   * @param user the user account which secret is generated
   * @returns object that contains the secret and the otpUrl to forward to client
   */
  public async generateSharedSecretAndUrl(user: UserEntity) {
    const secret = authenticator.generateSecret();

    const otpUrl = authenticator.keyuri(
      user.username,
      this.configService.get("APP_NAME"),
      secret
    );

    //TODO: save it in data base

    return {
      secret,
      otpUrl,
    };
  }
}
