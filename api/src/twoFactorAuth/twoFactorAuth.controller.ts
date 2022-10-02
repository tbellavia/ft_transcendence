import { Body, Controller, Delete, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { JWTAuthGuard } from "src/auth/guards/jwtauth.guard";
import { RequestWithUser } from "src/auth/interfaces/requestWithUser.interface";
import { Public } from "src/common/decorators/public.decorator";
import { UsersService } from "src/users/users.service";
import { TwoFactorCodeDTO } from "./dto/twoFactorCodeDTO";
import { TwoFactorAuthService } from "./twoFactorAuth.service";

@Controller('2fa')
export class TwoFactorAuthController {
  constructor(
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}

  /**
   * Endpoints to enable 2fa auth and generating qr-code
   * @param requestWithUser 
   * @returns 
   */
  @Post('generate')
  async register(@Req() requestWithUser) {
    const { otpUrl } = await this.twoFactorAuthService.generateSharedSecretAndUrl(requestWithUser.user);

    const qrCode = await this.twoFactorAuthService.generateQRCodeSVG(otpUrl);
    return qrCode;
  }

  /**
   * Endpoint to validate that the 2fa is enabled (we check that it returns a code)
   * @param requestWithUser 
   * @param param1 
   */
  @Post('turn-on')
  async turnOnTwoFactorAuth(@Req() requestWithUser, @Body() { code }: TwoFactorCodeDTO) {
    const isCodeValid = await this.twoFactorAuthService.isTwoFactorAuthCodeValid(
      code,
      requestWithUser.user
    );
    if (!isCodeValid)
      throw new UnauthorizedException('Wrong authentication code');
    await this.userService.turnOnTwoFactorAuth(requestWithUser.user.user_id);
  }

  @Delete('turn-off')
  async turnOffTwoFactorAuth(@Req() request: RequestWithUser) {
    await this.userService.turnOffTwoFactorAuth(request.user.user_id);
  }

  @Public()
  @UseGuards(new JWTAuthGuard())
  @Post('authenticate')
  async authenticate(@Req() requestWithUser, @Body() { code }: TwoFactorCodeDTO, @Res({ passthrough: true}) res) {
    const isCodeValid = await this.twoFactorAuthService.isTwoFactorAuthCodeValid(
      code,
      requestWithUser.user
    );
    if (!isCodeValid)
      throw new UnauthorizedException('Wrong authentication code');

    // Set-Cookie with 2fa enabled into cookie
    const accessToken = await this.authService.login(requestWithUser.user, true);
    res.cookie('Authentication', accessToken);
  }
}