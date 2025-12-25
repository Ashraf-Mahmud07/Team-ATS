// types/User.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: string;
  profession: string;
  facebook: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  data: User[];
}
