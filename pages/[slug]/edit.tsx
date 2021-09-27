import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import TodoForm from '../../components/todoForm/todoForm';
import TodoType from '../../types/todo';
import { readTodo } from '../../lib/api';
import { updateTodoItem } from '../../services/todoService';
import Layout from '../../components/layout/layout';
import { Container } from '@material-ui/core';

type Props = {
  todo: TodoType;
};

const Todo = ({ todo }: Props) => {
  const router = useRouter();

  const updateTodo = async (todo: TodoType) => {
    await updateTodoItem(todo);
    router.push('/');
  };

  if (!router.isFallback && !todo?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout title={todo.todoTitle}>
      <Container maxWidth="md">
        <TodoForm edit={true} todo={todo} handleTodo={updateTodo} />
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context?.params?.slug;

  const todo = readTodo(slug);

  return {
    props: { todo },
  };
};

export default Todo;
