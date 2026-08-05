'use client';
import { useAuth } from "@/components/auth/AuthContent";
import { useSavedRecipes } from "@/components/saved/saved-recipe-content";
import { getAllRecipe } from "@/services/recipes.services";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import RecipeCard from "@/components/recipes/recipe-card";
 
export default function SavedRecipe() {
  const { user, isAuthed, isLoading } = useAuth();
  const { savedIds } = useSavedRecipes();
  const router = useRouter();
 
  const { data, isLoading: recipesLoading, isError: recipesError } = getAllRecipe(true);
 
  const savedRecipes = useMemo(() => {
    if (!data) return [];
    return data.recipes.filter(item => savedIds.includes(item.id));
  }, [data, savedIds]);
 
  useEffect(() => {
    if (!isAuthed && !isLoading) {
      router.push('/login');
    }
  }, [isLoading, isAuthed, router]);
 
  if (isLoading || !isAuthed || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <CircularProgress />
      </Box>
    );
  }
 
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 4, color: 'primary.dark' }}>
        Saved Recipes
      </Typography>
 
      {recipesLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress size={28} />
        </Box>
      )}
 
      {recipesError && (
        <Typography color="error">Couldn&apos;t load your saved recipes.</Typography>
      )}
 
      {!recipesLoading && !recipesError && savedRecipes.length === 0 && (
        <Typography color="text.secondary">
          You haven&apos;t saved any recipes yet — tap the bookmark icon on a recipe to save it here.
        </Typography>
      )}
 
      {!recipesLoading && !recipesError && savedRecipes.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {savedRecipes.map(item => (
            <RecipeCard key={item.id} data={item} />
          ))}
        </Box>
      )}
    </Box>
  );
}
