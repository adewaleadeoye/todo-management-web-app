import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../loginForm';

describe('Login Form', () => {
  const csrfToken = 'some-long-token';
  it('renders login form', () => {
    render(<LoginForm errorMessage={''} csrfToken={csrfToken} />);
    expect(
      screen.getByRole('textbox', { name: 'Email Address' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('allows user to fill the form', () => {
    render(<LoginForm errorMessage={''} csrfToken={csrfToken} />);
    const email = screen.getByRole('textbox', { name: 'Email Address' });
    userEvent.type(email, 'some@email.com');
    expect(email).toHaveDisplayValue('some@email.com');
  });

  it('should show error message', () => {
    render(
      <LoginForm errorMessage={'Some Error Message'} csrfToken={csrfToken} />
    );
    expect(screen.getByText('Some Error Message')).toBeInTheDocument();
  });
});
