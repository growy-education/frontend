import { jwtDecode } from "jwt-decode";

type TokenInfo = {
  username: string;
  token: string;
};

export const storage = {
  setToken: (token: string) => {
    const { username } = jwtDecode<{ username: string }>(token);
    localStorage.setItem(`token_${username}`, token);
    localStorage.setItem("active_token", `token_${username}`);
  },
  setActiveUser: (username: string) => {
    localStorage.setItem("active_token", `token_${username}`);
  },
  getActiveToken: () => {
    const activeTokenKey = localStorage.getItem("active_token");
    return localStorage.getItem(activeTokenKey);
  },
  getTokens: () => {
    return localStorage.get;
  },
  getAllTokens: (): TokenInfo[] => {
    const tokens: TokenInfo[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("token_")) {
        const token = localStorage.getItem(key);
        if (token) {
          tokens.push({ username: key.replace("token_", ""), token });
        }
      }
    }
    return tokens;
  },
  clearTokenForUser: (username: string) => {
    localStorage.removeItem(`token_${username}`);
  },
  clearAllTokens: () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("token_")) {
        localStorage.removeItem(key);
      }
    }
  },
};
