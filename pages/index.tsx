import { GetServerSideProps } from 'next';
import { Container } from '@material-ui/core';
import { useState } from 'react';
import { useSession, getSession, getCsrfToken } from 'next-auth/client';

import Layout from '../components/layout/layout';
import TodoForm from '../components/todoForm/todoForm';
import TodoType from '../types/todo';
import { fetchTodos } from '../lib/api';
import {
  addTodoItem,
  deleteTodoItem,
  updateTodoItem,
} from '../services/todoService';
import TodoList from '../components/todoList/todoList';
import UserType from '../types/user';
import ErrorModal from '../components/modal/modal';

type Props = {
  todoList: TodoType[];
  csrfToken: string;
  user: UserType;
};

const Home = ({ todoList, csrfToken }: Props) => {
  const [session] = useSession();
  const [todos, setTodos] = useState(todoList);
  const [modal, setModal] = useState({ show: false, content: '' });

  const addTodo = async (todo: TodoType, xCsrf: string) => {
    const { data = undefined, err = undefined } = await addTodoItem(
      todo,
      xCsrf
    );
    if (data) setTodos(data);

    if (err) {
      setModal({ show: true, content: err?.error });
    }
  };

  const deleteTodo = async (slug: string, xCsrf: string) => {
    const { data = undefined, err = undefined } = await deleteTodoItem(
      slug,
      xCsrf
    );

    if (data) setTodos(data);

    if (err) {
      setModal({ show: true, content: err?.error });
    }
  };

  const updateTodoStatus = async (todo: TodoType, xCsrf: string) => {
    const { data = undefined, err = undefined } = await updateTodoItem(
      todo,
      xCsrf
    );

    if (data) setTodos(data);

    if (err) {
      setModal({ show: true, content: err?.error });
    }
  };

  return (
    <Layout title={'ToDo Home'} isAuthenticated={session ? true : false}>
      <Container maxWidth="md">
        <TodoForm handleTodo={addTodo} csrfToken={csrfToken} />
        <TodoList
          todoList={todos}
          deleteTodo={deleteTodo}
          updateTodoStatus={updateTodoStatus}
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
  const todoList = fetchTodos();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { session, todoList, csrfToken },
  };
};

export default Home;
