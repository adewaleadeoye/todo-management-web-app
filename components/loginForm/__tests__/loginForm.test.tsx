import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../loginForm';

describe('Login Form', () => {
  const submit = jest.fn();
  it('renders login form', () => {
    render(<LoginForm errorMessage={''} onSubmit={submit} />);
    expect(
      screen.getByRole('textbox', { name: 'Email Address' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });
  it('allows user to fill the form', () => {
    render(<LoginForm errorMessage={''} onSubmit={submit} />);
    const email = screen.getByRole('textbox', { name: 'Email Address' });
    userEvent.type(email, 'some@email.com');
    expect(email).toHaveDisplayValue('some@email.com');
    userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(submit).toHaveBeenCalled();
  });

  it('should show error message', () => {
    render(<LoginForm errorMessage={'Some Error Message'} onSubmit={submit} />);
    expect(screen.getByText('Some Error Message')).toBeInTheDocument();
  });
});
