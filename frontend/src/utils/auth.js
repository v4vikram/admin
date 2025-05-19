import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (error) {
    console.error("Token decode error:", error);
    return false;
  }
};
