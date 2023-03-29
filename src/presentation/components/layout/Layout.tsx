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

  const navRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const { isLoggedIn, logout } = useAuthContext();

  const onClick = () => {
    if (isLoggedIn) {
      logout();
    }
  }

  return (
    <Box height="100vh">
      <AppBar position='sticky' ref={navRef}>
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

          <Button color="inherit" onClick={onClick}>
            {isLoggedIn ? 'Log out' : authButtonLabel}
          </Button>
        </Toolbar>
      </AppBar>

      <main style={{ height: `calc(100vh - ${navRef.current?.clientHeight || 0})` }}>
        {children}
      </main>
    </Box>
  )
}
