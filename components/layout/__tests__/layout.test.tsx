import { render, screen } from '@testing-library/react';
import Layout from '../layout';

describe('Layout', () => {
  it('renders layout', () => {
    render(<Layout title={'Some Title'} isAuthenticated={false} />);

    expect(screen.getByText('Todo App')).toBeInTheDocument();
  });
  it('also renders logout button', () => {
    render(<Layout title={'Some Title'} isAuthenticated={true} />);
    const logoutBtn = screen.getByRole('button');
    expect(logoutBtn).toHaveTextContent('Logout');
  });
});
