'use client';
 
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/components/auth/AuthContent';
 
interface SavedRecipesContextValue {
  savedIds: number[];
  isSaved: (recipeId: number) => boolean;
  toggleSaved: (recipeId: number) => void;
}
 
const SavedRecipesContext = createContext<SavedRecipesContextValue | null>(null);
 
const storageKey = (userId: number) => `savedRecipes:${userId}`;
 
export function SavedRecipesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState<number[]>([]);
 
  // Reload the saved list whenever the logged-in user changes (login, logout,
  // or switching accounts) — each user has their own key in localStorage.
  useEffect(() => {
    if (!user) {
      setSavedIds([]);
      return;
    }
    const stored = localStorage.getItem(storageKey(user.id));
    setSavedIds(stored ? JSON.parse(stored) : []);
  }, [user]);
 
  const toggleSaved = (recipeId: number) => {
    if (!user) return; // caller is expected to redirect to /login before this is reachable
    setSavedIds(prev => {
      const next = prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId];
      localStorage.setItem(storageKey(user.id), JSON.stringify(next));
      return next;
    });
  };
 
  const isSaved = (recipeId: number) => savedIds.includes(recipeId);
 
  return (
    <SavedRecipesContext.Provider value={{ savedIds, isSaved, toggleSaved }}>
      {children}
    </SavedRecipesContext.Provider>
  );
}
 
export function useSavedRecipes() {
  const context = useContext(SavedRecipesContext);
  if (!context) {
    throw new Error('useSavedRecipes must be used within a SavedRecipesProvider');
  }
  return context;
}
