'use client';
 
import AddForm from "@/components/add-form";
import { useAuth } from "@/components/auth/AuthContent";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
 
export default function NewRecipe() {
  const { user, isAuthed, isLoading } = useAuth();
  const router = useRouter();
 
  useEffect(() => {
    if (!isAuthed && !isLoading) {
      router.push('/login');
    }
  }, [isAuthed, isLoading, router]);
 
  if (isLoading || !isAuthed || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <CircularProgress />
      </Box>
    );
  }
 
  return (
    <Box>
      <AddForm user={user} />
    </Box>
  );
}
