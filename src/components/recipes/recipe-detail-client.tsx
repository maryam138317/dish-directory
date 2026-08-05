'use client';
 
import { getRecipeById } from "@/services/recipes.services";
import { Box, Typography, CircularProgress, Button, Chip, Stack, Paper, Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
 
export default function RecipeDetailClient({ id }: { id: number }) {
  const { data, isLoading, isError } = getRecipeById(id);
 
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', py: 12 }}>
        <CircularProgress />
      </Box>
    );
  }
 
  if (isError || !data) {
    return (
      <Box sx={{ textAlign: 'center', py: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography color="error">Couldn&apos;t load this recipe.</Typography>
        <Button component={Link} href="/recipes" startIcon={<ChevronLeftIcon />} variant="outlined">
          Back to Recipes
        </Button>
      </Box>
    );
  }
 
  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Button
        component={Link}
        href="/recipes"
        startIcon={<ChevronLeftIcon />}
        sx={{ mb: 3 }}
      >
        Back to Recipes
      </Button>
 
      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: '45%' },
            aspectRatio: '4 / 3',
            flexShrink: 0,
          }}
        >
          <Image
            src={data.image}
            alt={data.name}
            fill
            sizes="(max-width: 900px) 100vw, 400px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
 
        <Box sx={{ p: { xs: 3, md: 4 }, flex: 1, minWidth: 0 }}>
          <Typography variant="h4" sx={{ color: 'primary.dark', mb: 1 , display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            {data.name}
            <BookmarkBorderIcon sx={{cursor: 'pointer'}}/> {/* change the icon when it's saved */}
          </Typography>
 
          <Stack direction="row" spacing={3} sx={{ mb: 2, flexWrap: 'wrap' }}>
            <Typography variant="body1" color="text.secondary">
              ★ {data.rating}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {data.cuisine}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {data.difficulty}
            </Typography>
          </Stack>
 
          {data.mealType && data.mealType.length > 0 && (
            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', rowGap: 1 }}>
              {data.mealType.map((meal: string) => (
                <Chip key={meal} label={meal} size="small" color="secondary" />
              ))}
            </Stack>
          )}
 
          {data.tags && data.tags.length > 0 && (
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              {data.tags.map((tag: string) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: 'grey.300', color: 'grey.700' }}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Paper>
 
      {data.ingredients && data.ingredients.length > 0 && (
        <Paper elevation={1} sx={{ borderRadius: 3, p: { xs: 3, md: 4 }, mt: 4 }}>
          <Typography variant="h5" sx={{ color: 'primary.dark', mb: 2 }}>
            Ingredients
          </Typography>
          <Box component="ul" sx={{ pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {data.ingredients.map((ingredient: string, index: number) => (
              <Typography key={index} component="li" variant="body1">
                {ingredient}
              </Typography>
            ))}
          </Box>
        </Paper>
      )}
 
      {data.instructions && data.instructions.length > 0 && (
        <Paper elevation={1} sx={{ borderRadius: 3, p: { xs: 3, md: 4 }, mt: 4 }}>
          <Typography variant="h5" sx={{ color: 'primary.dark', mb: 2 }}>
            Instructions
          </Typography>
          <Stack spacing={2} divider={<Divider flexItem />}>
            {data.instructions.map((step: string, index: number) => (
              <Stack key={index} direction="row" spacing={2} sx={{alignItems:"flex-start"}}>
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    color: 'common.white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </Box>
                <Typography variant="body1" sx={{ pt: 0.25 }}>
                  {step}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
