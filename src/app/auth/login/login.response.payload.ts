export interface LoginResponse {
  userId?: string;
  authenticationToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  username?: string;
}
