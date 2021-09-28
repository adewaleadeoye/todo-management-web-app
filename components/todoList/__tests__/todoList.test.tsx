import { render, screen } from '@testing-library/react';
import TodoList from '../todoList';

describe('Todo List', () => {
  const deleteTodo = jest.fn();
  const updateTodoStatus = jest.fn();
  it('renders no data text if list is empty', () => {
    render(
      <TodoList
        todoList={[]}
        deleteTodo={deleteTodo}
        updateTodoStatus={updateTodoStatus}
      />
    );
    expect(screen.getByText('No Data to display')).toBeInTheDocument();
  });

  it('renders todo list', () => {
    const todoList = [
      {
        slug: 'some-title',
        todoTitle: 'Some Title',
        todoDueDate: '27/09/2021',
        todoStatus: 'unfinished',
      },
    ];
    render(
      <TodoList
        todoList={todoList}
        deleteTodo={deleteTodo}
        updateTodoStatus={updateTodoStatus}
      />
    );
    expect(screen.getByText('Some Title')).toBeInTheDocument();
  });
});
