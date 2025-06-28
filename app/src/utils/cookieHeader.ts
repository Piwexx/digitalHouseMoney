import { Cookie } from "@/types/cookies";

export const cookieHeader = ({ name, value, hours }: Cookie) => {
  const expireAt = new Date(Date.now() + 1000 * 60 * 60 * (hours || 1)).toUTCString();

  return `${name}=${value};Expires=${expireAt};Path=/;HttpOnly;Secure`;
};