
'use client';

import { getTags } from "@/services/recipes.services";
import { Box, Typography, Chip, CircularProgress } from "@mui/material";

interface TagsCardProps {
  selectedTag?: string;
  onSelectTag: (tag: string | null) => void;
}

export default function TagsCard({ selectedTag, onSelectTag }: TagsCardProps) {
  const { data, isLoading, isError } = getTags();

  return (
    <Box sx={{display: ''}}>
      <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
        Filter by Tags
      </Typography>

      {isLoading && <CircularProgress size={20} />}

      {(isError || !data) && !isLoading && (
        <Typography color="error" variant="body2">
          Error getting tags.
        </Typography>
      )}

      {data && data.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {data.map(tag => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
              color={selectedTag === tag ? 'primary' : 'default'}
              variant={selectedTag === tag ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}