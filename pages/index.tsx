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

type Props = {
  todoList: TodoType[];
};

const Home = ({ todoList }: Props) => {
  const [todos, setTodos] = useState(todoList);

  const addTodo = async (todo: TodoType) => {
    const data = await addTodoItem(todo);
    if (data) setTodos(data);
  };

  const deleteTodo = async (slug: string) => {
    const data = await deleteTodoItem(slug);
    if (data) setTodos(data);
  };

  const updateTodoStatus = async (todo: TodoType) => {
    const data = await updateTodoItem(todo);
    if (data) setTodos(data);
  };

  return (
    <Layout title={'ToDo Home'}>
      <Container maxWidth="md">
        <TodoForm handleTodo={addTodo} />
        <TodoList
          todoList={todos}
          deleteTodo={deleteTodo}
          updateTodoStatus={updateTodoStatus}
        />
      </Container>
    </Layout>
  );
};

export async function getServerSideProps() {
  const todoList = fetchTodos();
  return { props: { todoList } };
}

export default Home;
