import { Button, Container, Grid, TextField } from '@material-ui/core';

type Props = {
  errorMessage: string;
  csrfToken: string;
};
const LoginForm = ({ errorMessage, csrfToken }: Props) => {
  return (
    <Container maxWidth="xs">
      <form method="post" action="/api/auth/callback/credentials">
        <Grid container spacing={3}>
          <Grid item md={12}>
            <TextField
              type="email"
              id="email"
              fullWidth
              label="Email Address"
              multiline
              variant="outlined"
              required
              name="email"
              margin="normal"
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              type="password"
              id="password"
              fullWidth
              label="Password"
              variant="outlined"
              required
              name="password"
            />
          </Grid>
          <Grid item md={12}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Grid>
        </Grid>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </Container>
  );
};

export default LoginForm;
