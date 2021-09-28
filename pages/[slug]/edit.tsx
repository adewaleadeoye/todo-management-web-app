import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import TodoForm from '../../components/todoForm/todoForm';
import TodoType from '../../types/todo';
import { readTodo } from '../../lib/api';
import { updateTodoItem } from '../../services/todoService';
import Layout from '../../components/layout/layout';
import { Container } from '@material-ui/core';
import withSession from '../../lib/session';
import UserType from '../../types/user';

type Props = {
  todo: TodoType;
  user: UserType;
};

const Todo = ({ todo, user }: Props) => {
  const router = useRouter();

  const updateTodo = async (todo: TodoType) => {
    await updateTodoItem(todo);
    router.push('/');
  };

  if (!router.isFallback && !todo?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout title={todo.todoTitle} isAuthenticated={user.isLoggedIn}>
      <Container maxWidth="md">
        <TodoForm edit={true} todo={todo} handleTodo={updateTodo} />
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ params, req, res }: any) => {
    const user = req.session.get('user');

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    const slug = params?.slug;
    const todo = readTodo(slug);

    return {
      props: { user: req.session.get('user'), todo },
    };
  }
);

export default Todo;
