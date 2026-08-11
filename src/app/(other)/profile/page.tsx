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
    <Box sx={{ px: { xs: 2, sm: 3, md: 0 }, maxWidth: 900, mx: 'auto' }}>
      <Paper
        sx={{
          mx: 'auto',
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
          mb: { xs: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            textAlign: { xs: 'center', sm: 'left' },
            width: '100%',
          }}
        >
          <Avatar
            src={user.image}
            sx={{
              width: { xs: 56, sm: 64 },
              height: { xs: 56, sm: 64 },
              mx: { xs: 'auto', sm: 0 },
            }}
          />
          <Box sx={{ minWidth: 0, width: '100%', textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, wordBreak: 'break-word' }}>
              {user.username}&apos;s Profile
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
              Email: {user.email}
            </Typography>
          </Box>
        </Box>
      </Paper>
 
      <Typography
        variant="h5"
        sx={{ mb: 2, color: 'primary.dark', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
      >
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
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', sm: 'flex-start' },
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {userRecipes.map(item => (
            <RecipeCard key={item.id} data={item} />
          ))}
        </Box>
      )}
    </Box>
  );
}