import { Button, Grid, TextField } from '@material-ui/core';
import { ChangeEvent, FormEvent } from 'react';

type Props = {
  errorMessage: string;
  onSubmit: Function;
};
const LoginForm = ({ errorMessage, onSubmit }: Props) => {
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    onSubmit(e);
  };
  return (
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
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            type="password"
            id="password"
            fullWidth
            label="Password"
            multiline
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
  );
};

export default LoginForm;
