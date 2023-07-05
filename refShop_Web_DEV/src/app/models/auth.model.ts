export interface AuthenticationRequest {
  username: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
  user: User;
}

export interface User {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  userRoleId: number;
  phone?: string;
  photoPath?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface TokenPayload {
  sub: string;
  firstName: string;
  lastName: string;
  email: string;
  nameid: string;
}
