import React from 'react'
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '@/presentation/providers';
import { Box } from '@mui/system';
import { Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { isEmail } from '@/infrastucture/utils';

type FormData = {
  email: string,
  password: string,
};

export const Login = () => {

  const router = useRouter();
  const { login } = useAuthContext();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = React.useState(false);

  const onLogin = ({ email, password }: FormData) => {

    setShowError(false);

    login({ email, password })
      .then(() => {
        const destination = router.query.p?.toString() || '/';
        router.replace(destination);

      })
      .catch(() => {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      });
  }


  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
      <form onSubmit={handleSubmit(onLogin)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component="h1">Log in</Typography>
              <Chip
                label="Invalid credentials"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'Required',
                  validate: isEmail

                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Passowrd"
                type='password'
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Required',
                  minLength: { value: 6, message: 'Should be at least 6 characters' }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className='circular-btn'
                size='large'
                fullWidth>
                Submit
              </Button>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink
                href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'} legacyBehavior>
                <Link sx={{cursor: 'pointer'}}>
                  Don't have an account?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>

  )
}
