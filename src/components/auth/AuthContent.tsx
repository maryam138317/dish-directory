'use client';
 
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
 
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
 
interface AuthContextValue {
  user: User | null;
  isAuthed: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}
 
const AuthContext = createContext<AuthContextValue | null>(null);
 
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  // Starts true — we haven't checked localStorage yet, so we don't know
  // the real auth state. Consumers should wait for this to flip to false
  // before deciding whether to redirect an "unauthenticated" user.
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        setUserState(JSON.parse(saved));
      } catch {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);
 
  const setUser = (newUser: User) => {
    localStorage.setItem('accessToken', newUser.accessToken);
    localStorage.setItem('refreshToken', newUser.refreshToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setUserState(newUser);
  };
 
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUserState(null);
  };
 
  return (
    <AuthContext.Provider value={{ user, isAuthed: !!user, isLoading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
 
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
