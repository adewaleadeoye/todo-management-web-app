import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ErrorPage from 'next/error';
import { useSession, getSession, getCsrfToken } from 'next-auth/client';
import { Container } from '@material-ui/core';

import TodoForm from '../../components/todoForm/todoForm';
import TodoType from '../../types/todo';
import { readTodo } from '../../lib/api';
import { updateTodoItem } from '../../services/todoService';
import Layout from '../../components/layout/layout';
import ErrorModal from '../../components/modal/modal';

type Props = {
  todo: TodoType;
  csrfToken: string;
};

const Todo = ({ todo, csrfToken }: Props) => {
  const [session] = useSession();
  const router = useRouter();

  const [modal, setModal] = useState({ show: false, content: '' });

  const updateTodo = async (todo: TodoType, xCsrf: string) => {
    await updateTodoItem(todo, xCsrf);
    router.push('/');
  };

  if (!router.isFallback && !todo?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout title={todo.todoTitle} isAuthenticated={session ? true : false}>
      <Container maxWidth="md">
        <TodoForm
          edit={true}
          todo={todo}
          handleTodo={updateTodo}
          csrfToken={csrfToken}
        />
      </Container>
      {modal?.show && (
        <ErrorModal
          show={modal?.show}
          content={modal?.content}
          setModal={setModal}
        />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const slug = context?.params?.slug;
  const todo = readTodo(slug);
  const csrfToken = await getCsrfToken(context);

  return {
    props: { session, todo, csrfToken },
  };
};

export default Todo;
