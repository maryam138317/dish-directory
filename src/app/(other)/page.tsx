'use client';
 
import Slider from '@/components/home-slider';
import { Box, Button, Typography, Stack } from '@mui/material';
import Link from 'next/link';
 
export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: { xs: 4, md: 6 },
        width: '100%',
        minHeight: { md: 'calc(100vh - 96px)' }, 
      }}
    >
      <Box sx={{ flex: '1 1 50%', minWidth: 0, width: '100%' , display: 'flex', justifyContent: 'center'}}>
        <Slider />
      </Box>
 
      <Box sx={{ flex: '1 1 45%', minWidth: 0, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '3.5rem' }, color: 'primary.dark' }}>
          Dish Directory
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, mt: 1, mb: 4 }}>
          Find your next meal, or share the one you&apos;re proud of.
        </Typography>
 
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
        >
          <Button
            component={Link}
            href="/recipes"
            variant="contained"
            color="primary"
            size="large"
          >
            Explore Recipes
          </Button>
          <Button
            component={Link}
            href="/recipes/new"
            variant="outlined"
            color="primary"
            size="large"
          >
            Add a Recipe
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
