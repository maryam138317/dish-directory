import { Recipe } from "@/type-configuration/data";
import { Box, Typography, Paper } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContent";
import { useSavedRecipes } from "@/components/saved/saved-recipe-content";
 
export default function RecipeCard({ data }: { data: Recipe }) {
  const router = useRouter();
  const { isAuthed } = useAuth();
  const { isSaved, toggleSaved } = useSavedRecipes();
  const saved = isSaved(data.id);
 
  const handleToggleSaved = () => {
    if (!isAuthed) {
      router.push('/login');
      return;
    }
    toggleSaved(data.id);
  };
 
  return (
    <Paper
      elevation={2}
      sx={{
        width: { xs: '100%', sm: 280 },
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '4 / 3' }}>
        <Image
          src={data.image}
          alt={data.name}
          fill
          loading="eager"
          sizes="(max-width: 600px) 100vw, 280px"
          style={{ objectFit: 'cover' }}
        />
      </Box>
 
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href={`/recipes/${data.id}`}>
            {data.name}
          </Link>
          <Box
            component="button"
            onClick={handleToggleSaved}
            aria-label={saved ? 'Remove from saved recipes' : 'Save recipe'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              p: 0.5,
              color: saved ? 'primary.main' : 'grey.500',
            }}
          >
            {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </Box>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ★ {data.rating}
        </Typography>
 
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
          {data.tags.map((tag, index) => (
            <Box
              key={index}
              sx={{
                fontSize: 12,
                px: 1,
                py: 0.25,
                borderRadius: 4,
                backgroundColor: 'grey.100',
                color: 'grey.700',
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
