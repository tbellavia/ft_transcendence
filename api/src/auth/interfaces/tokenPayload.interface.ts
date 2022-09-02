export default interface TokenPayload {
  username: string;
  uuid: string;
  isTwoFactorAuthenticated: boolean;
}