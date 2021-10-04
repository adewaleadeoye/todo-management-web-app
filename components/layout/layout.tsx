import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import { Button, Container } from '@material-ui/core';
import { logoutUser } from '../../services/userService';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';

const useStyles = makeStyles({
  toolbar: {
    textAlign: 'center',
    height: 80,
  },
  heading: {
    margin: 'auto',
  },
});

type Props = {
  children: React.ReactNode;
  title: string;
  isAuthenticated?: boolean;
};

const Layout = ({ children, title, isAuthenticated }: Props) => {
  const classes = useStyles();
  const router = useRouter();

  const logout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/login' });
    router.push(data.url);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.heading} variant="h5" align="center">
              Todo App
            </Typography>
            {isAuthenticated && (
              <Button variant="contained" color="secondary" onClick={logout}>
                Logout
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </>
  );
};

export default Layout;
