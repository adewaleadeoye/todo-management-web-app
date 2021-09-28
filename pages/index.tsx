import { Container } from '@material-ui/core';
import Layout from '../components/layout/layout';
import TodoForm from '../components/todoForm/todoForm';
import TodoType from '../types/todo';
import { fetchTodos } from '../lib/api';
import { useState } from 'react';
import {
  addTodoItem,
  deleteTodoItem,
  updateTodoItem,
} from '../services/todoService';
import TodoList from '../components/todoList/todoList';
import withSession from '../lib/session';
import UserType from '../types/user';
import { GetServerSideProps } from 'next';
import ErrorModal from '../components/modal/modal';

type Props = {
  todoList: TodoType[];
  csrfToken: string;
  user: UserType;
};

const Home = ({ todoList, csrfToken, user }: Props) => {
  const [todos, setTodos] = useState(todoList);
  const [modal, setModal] = useState({ show: false, content: '' });

  const addTodo = async (todo: TodoType) => {
    const { data = undefined, err = undefined } = await addTodoItem(
      todo,
      csrfToken
    );
    if (data) setTodos(data);

    if (err) {
      setModal({ show: true, content: err.error });
    }
  };

  const deleteTodo = async (slug: string) => {
    const { data = undefined, err = undefined } = await deleteTodoItem(slug);

    if (data) setTodos(data);

    if (err) {
      setModal({ show: true, content: err.error });
    }
  };

  const updateTodoStatus = async (todo: TodoType) => {
    const { data = undefined, err = undefined } = await updateTodoItem(todo);

    if (data) setTodos(data);

    if (err) {
      setModal({ show: true, content: err.error });
    }
  };

  return (
    <Layout title={'ToDo Home'} isAuthenticated={user.isLoggedIn}>
      <Container maxWidth="md">
        <TodoForm handleTodo={addTodo} />
        <TodoList
          todoList={todos}
          deleteTodo={deleteTodo}
          updateTodoStatus={updateTodoStatus}
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

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ req, res }: any) => {
    const user = req.session.get('user');

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const todoList = fetchTodos();

    return {
      props: { user: req.session.get('user'), todoList },
    };
  }
);

export default Home;
