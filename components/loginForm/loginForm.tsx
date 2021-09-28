import { Button, Container, Grid, TextField } from '@material-ui/core';
import { ChangeEvent } from 'react';

type Props = {
  errorMessage: string;
  onSubmit: Function;
};
const LoginForm = ({ errorMessage, onSubmit }: Props) => {
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    onSubmit(e);
  };
  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
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

        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </Container>
  );
};

export default LoginForm;
