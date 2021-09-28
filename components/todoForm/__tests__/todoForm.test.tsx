import { render, screen } from '@testing-library/react';
import TodoForm from '../todoForm';

describe('Todo Form', () => {
  const handleTodo = jest.fn();
  it('renders initial Todo form', () => {
    const todo = {
      slug: '',
      todoTitle: '',
      todoDueDate: '',
      todoStatus: '',
    };

    render(<TodoForm todo={todo} edit={false} handleTodo={handleTodo} />);

    expect(
      screen.getByRole('textbox', { name: 'Enter Todo Title' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('renders Todo form for editing', () => {
    const todo = {
      slug: 'some-title',
      todoTitle: 'Some Title',
      todoDueDate: '22/09/2021',
      todoStatus: 'unfinished',
    };

    render(<TodoForm todo={todo} edit={true} handleTodo={handleTodo} />);

    expect(
      screen.getByRole('textbox', { name: 'Enter Todo Title' })
    ).toHaveDisplayValue('Some Title');

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });
});
