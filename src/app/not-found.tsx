'use client';
 
import { Box, Button, Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from "next/navigation";
 
export default function NotFound() {
  const router = useRouter();
 
  const handleGoBack = () => {
    // If there's no real history to go back to (e.g. someone landed here
    // directly via a bad link), router.back() would do nothing — fall back home.
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };
 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 12 }}>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        The requested page wasn&apos;t found!
      </Typography>
      <Button startIcon={<ChevronLeftIcon />} variant="outlined" onClick={handleGoBack}>
        Go Back
      </Button>
    </Box>
  );
}
