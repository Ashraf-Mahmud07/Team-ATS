export interface LoginRequest {
  email: string;
  password: string;
}

export interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface AuthResponseData {
  accessToken: string;
  admin: Admin;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthResponseData;
}
