export interface User {
  _id: string;
  name?: string;
  image?: string;
  email: string;
  phone?: string;
  isVerified: boolean;
  packages: string;
  favorites: unknown[];
  status: string;
  isDeleted: boolean;
  authProvider?: string;
  examsAttempted: unknown[];
  lastLogin: string,
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  id: string;
}

export interface UserState {
  userData: AdminUser | null;
  access_token: string;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
}
export interface PaginatedUserResponse {
  data: User[];
  meta: Meta;
}
export interface GetUsersResponse {
  success: boolean;
  message: string;
  data: PaginatedUserResponse;
}
export interface IAdmin {
  _id: string;
  id: string;
  name: string;
  password?: string;
  email: string;
  role: "admin" | "moderator";
  isDisabled: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PaginatedAdminResponse {
  data: IAdmin[];
  meta: Meta;
}


export interface GetAdminResponse {
  success: boolean;
  message: string;
  data: PaginatedAdminResponse;
}
export interface GetSingleAdminResponse {
  success: boolean;
  message: string;
  data: IAdmin;
}
