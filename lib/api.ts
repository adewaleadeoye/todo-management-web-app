import TodoType from '../types/todo';

import fs from 'fs';
import UserType from '../types/user';

// add a todo item //
export const addTodo = (todo: TodoType) => {
  const todos = fetchTodos();

  const duplicatetodos = findTodo(todo?.slug, todos);

  if (duplicatetodos?.length === 0) {
    todos.push(todo);
    saveTodos(todos);
    return todo;
  }
};

// delete a todo item //
export const deleteTodo = (slug: string | string[]) => {
  var todos = fetchTodos();
  var filteredtodos = todos.filter((todo: TodoType) => todo.slug !== slug);
  saveTodos(filteredtodos);

  return todos.length !== filteredtodos.length;
};

export const updateTodo = (todo: TodoType) => {
  const todos = fetchTodos();
  const updatedTodos = todos.map((todoEntry: TodoType) => {
    if (todoEntry.slug === todo.slug) {
      todoEntry = { ...todo };
    }
    return todoEntry;
  });
  saveTodos(updatedTodos);
  return updatedTodos;
};

// read a todo item //
export const readTodo = (slug?: string | string[]) => {
  const todos = fetchTodos();
  const filteredTodos = findTodo(slug, todos);
  if (filteredTodos) return filteredTodos[0];
};

// utility functions
export const findTodo = (slug?: string | string[], todos?: TodoType[]) => {
  return todos?.filter((todo: TodoType) => todo?.slug === slug);
};

export const fetchTodos = () => {
  try {
    const filePath = `${process.cwd()}/data/todos.json`;
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (e) {
    return [];
  }
};

export const saveTodos = (todos: TodoType[]) => {
  if (!todos?.length) return;
  const databaseJson = JSON.stringify(todos);
  const filePath = `${process.cwd()}/data/todos.json`;
  fs.writeFileSync(filePath, databaseJson);
};

export const fetchUsers = () => {
  try {
    const filePath = `${process.cwd()}/data/users.json`;
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (e) {
    return [];
  }
};

export const findUser = (
  email: string,
  password: string,
  users: UserType[]
) => {
  return users?.filter(
    (user) => user.email === email && user.password === password
  );
};
