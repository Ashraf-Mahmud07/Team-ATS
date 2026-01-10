import { AdminUser } from "@/types/users";

export const hasAccess = (
  createdBy: string,
  userData?: AdminUser | null
): boolean => {
  if (userData?.role === "admin") return true;
  if (userData?.email === createdBy) return true;
  return false;
};
