export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isEmailVerified: boolean;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Role = 'ADMIN' | 'CUSTOMER';

export interface UserResponse {
  user: User;
  access_token: string;
}
