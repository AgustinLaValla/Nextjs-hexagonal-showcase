import React from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthContext } from '@/presentation/providers';

type Props = {
  authButtonLabel?: string;
  children: JSX.Element | JSX.Element[];
}

export const Layout: React.FC<Props> = ({
  children,
  authButtonLabel = 'Log in'
}) => {

  const { isLoggedIn } = useAuthContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task manager
          </Typography>

          <Button color="inherit">
            {isLoggedIn ? 'Log out' : authButtonLabel}
          </Button>
        </Toolbar>
      </AppBar>

      <main>
        {children}
      </main>
    </Box>
  )
}
