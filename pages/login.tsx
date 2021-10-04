import { GetServerSideProps } from 'next';
import { getCsrfToken } from 'next-auth/client';
import { Container } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import LoginForm from '../components/loginForm/loginForm';

type Props = {
  csrfToken: string;
};
const Login = ({ csrfToken }: Props) => {
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const error = router?.query?.error;

  useEffect(() => {
    error &&
      error === 'CredentialsSignin' &&
      setErrorMsg('Incorrect login details provided');
  }, [error]);

  return (
    <Layout title={'Login'} isAuthenticated={false}>
      <Container maxWidth="md">
        <LoginForm errorMessage={errorMsg} csrfToken={csrfToken} />
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

export default Login;
