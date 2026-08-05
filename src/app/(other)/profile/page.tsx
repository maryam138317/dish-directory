'use client';
 
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContent';
import { Box, Paper, Typography, Avatar, CircularProgress } from '@mui/material';
import { getAllRecipe } from '@/services/recipes.services';
import RecipeCard from '@/components/recipes/recipe-card';
 
export default function Profile() {
  const { user, isAuthed, isLoading } = useAuth();
  const router = useRouter();
 
  const { data, isLoading: recipesLoading, isError: recipesError } = getAllRecipe(true);
 
  const userRecipes = useMemo(() => {
    if (!data || !user) return [];
    return data.recipes.filter(item => item.userId === user.id);
  }, [data, user]);
 
  useEffect(() => {
    if (!isLoading && !isAuthed) {
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
      <Paper sx={{ mx: 'auto', p: 4, borderRadius: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={user.image} sx={{ width: 64, height: 64 }} />
          <Box>
            <Typography variant="h5">
              {user.username}&apos;s Profile
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
          </Box>
        </Box>
      </Paper>
 
      <Typography variant="h5" sx={{ mb: 2, color: 'primary.dark' }}>
        Your Recipes
      </Typography>
 
      {recipesLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress size={28} />
        </Box>
      )}
 
      {recipesError && (
        <Typography color="error">Couldn&apos;t load your recipes.</Typography>
      )}
 
      {!recipesLoading && !recipesError && userRecipes.length === 0 && (
        <Typography color="text.secondary">
          You haven&apos;t added any recipes yet.
        </Typography>
      )}
 
      {!recipesLoading && !recipesError && userRecipes.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {userRecipes.map(item => (
            <RecipeCard key={item.id} data={item} />
          ))}
        </Box>
      )}
    </Box>
  );
}
 
