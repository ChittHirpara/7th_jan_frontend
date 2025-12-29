export interface User {
  _id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

