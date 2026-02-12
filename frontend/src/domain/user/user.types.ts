// src/domain/user/user.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  coverUrl?: string;
}