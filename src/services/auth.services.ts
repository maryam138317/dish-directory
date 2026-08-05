import { useMutation } from "@tanstack/react-query";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export const useLoginUser = () => {
  return useMutation<User, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Invalid username or password');
      }

      return res.json();
    },
  });
};