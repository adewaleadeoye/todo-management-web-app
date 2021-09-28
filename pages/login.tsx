import { Container } from '@material-ui/core';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import Layout from '../components/layout/layout';
import LoginForm from '../components/loginForm/loginForm';
import { loginUser } from '../services/userService';

const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    const response = await loginUser(email, password);
    if (response?.error) {
      setErrorMsg(response?.error);
    } else {
      router.push('/');
    }
  };

  return (
    <Layout title={'Login'} isAuthenticated={false}>
      <Container maxWidth="md">
        <LoginForm errorMessage={errorMsg} onSubmit={handleSubmit} />
      </Container>
    </Layout>
  );
};

export default Login;
