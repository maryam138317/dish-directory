'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import RecipeCard from "@/components/recipes/recipe-card";
import { getAllRecipe, getLimitedRecipe, getRecipesByTag } from "@/services/recipes.services";
import { Box, Typography, CircularProgress, Button, TextField } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TuneIcon from '@mui/icons-material/Tune';
import TagsCard from '@/components/tags/tag-card';
 
export default function Recipes() {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
 
  
  const limited = getLimitedRecipe();
  const all = getAllRecipe(showAll);
  const byTag = getRecipesByTag(selectedTag ?? '');
 

  const active = selectedTag ? byTag : showAll ? all : limited;
  const { data, isLoading, isError } = active;
 
  
  const filteredRecipes = useMemo(() => {
    if (!data) return [];
    const term = searchTerm.trim().toLowerCase();
    if (!term) return data.recipes;
 
    return data.recipes.filter(item => {
      const haystack = [
        item.name,
        item.cuisine,
        item.difficulty,
        ...(item.tags ?? []),
        ...(item.mealType ?? []),
      ]
        .join(' ')
        .toLowerCase();
 
      return haystack.includes(term);
    });
  }, [data, searchTerm]);
 
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', py: 12 }}>
        <CircularProgress />
      </Box>
    );
  }
 
  if (isError || !data) {
    return (
      <Box sx={{ textAlign: 'center', py: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 2 }}>
        <Typography color="error">Something went wrong loading recipes.</Typography>
        <Button component={Link} href="/" startIcon={<ChevronLeftIcon />} variant="outlined">
          Back to Home Page
        </Button>
      </Box>
    );
  }
 
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: 2, mb: 2 }}>
        <Typography variant="h3" sx={{ color: 'primary.dark' }}>
          Recipes
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative' }}>
          <TextField
            label="Search recipes..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            size="small"
          />
          <Button
            sx={{
              border: '1px solid',
              borderColor: selectedTag ? 'primary.main' : 'grey.300',
              minWidth: 0,
              px: 1.5,
            }}
            onClick={() => setShowTagFilter(!showTagFilter)}
          >
            <TuneIcon />
          </Button>
 
          {showTagFilter && (
            <Box
              sx={{
                position: 'absolute',
                top: '100%',
                right: 0,
                mt: 1,
                p: 2,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
                zIndex: 10,
                minWidth: 260,
              }}
            >
              <TagsCard selectedTag={selectedTag ?? undefined} onSelectTag={setSelectedTag} />
            </Box>
          )}
        </Box>
      </Box>
 
      {selectedTag && (
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Filtering by tag: <strong>{selectedTag}</strong>{' '}
          <Button size="small" onClick={() => setSelectedTag(null)}>Clear</Button>
        </Typography>
      )}
 
      {filteredRecipes.length === 0 ? (
        <Typography sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          No recipes match your search{selectedTag ? ` and "${selectedTag}"` : ''}.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: { xs: 'center', md: 'flex-start' },
            gap: 2,
          }}
        >
          {filteredRecipes.map(item => (
            <RecipeCard key={item.id} data={item} />
          ))}
        </Box>
      )}
 
      {!showAll && !searchTerm && !selectedTag && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            endIcon={<ChevronRightIcon />}
            variant="contained"
            color="primary"
            onClick={() => setShowAll(true)}
          >
            View More
          </Button>
        </Box>
      )}
    </Box>
  );
}
