import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import { Container } from '@material-ui/core';

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
};

const Layout = ({ children, title }: Props) => {
  const classes = useStyles();
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
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </>
  );
};

export default Layout;
