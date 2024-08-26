import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => jwtDecode(token);
