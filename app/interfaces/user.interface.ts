export interface User {
  username: string;
  two_factor_auth_secret?: string;
  is_two_factor_auth_enabled: boolean;
  creation_data: Date;
}