export interface RegisterDto {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  passwordHash: string;
  confirmPassword: string;
  phone: string;
  roleId?: number;
  updatedAt?: Date | null;
}
