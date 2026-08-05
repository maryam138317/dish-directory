'use client';

import { FormSchema, LoginFormValues } from "@/Schema/form-schema";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginUser } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContent";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: yupResolver(FormSchema) });

  const loginUser = useLoginUser();
  const { setUser } = useAuth();
  const router = useRouter();

  const submitForm = (data: LoginFormValues) => {
    loginUser.mutate(data, {
      onSuccess: (user) => {
        localStorage.setItem('accessToken', user.accessToken);
        setUser(user);
        router.push('/');
      },
    });
  };

  return (
    <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      <Box>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: 'primary.dark' }}>
          Login
        </Typography>
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          onSubmit={handleSubmit(submitForm)}
        >
          <TextField
            label="Username"
            id="username"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="Password"
            type="password"
            id="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          {loginUser.isError && (
            <Typography color="error" variant="body2">
              Invalid username or password.
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || loginUser.isPending}
          >
            {loginUser.isPending ? 'Logging in...' : 'Login User'}
          </Button>
        </form>
      </Box>
    </Paper>
  );
}