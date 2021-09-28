import { render, screen } from '@testing-library/react';
import Modal from '../modal';

describe('Modal', () => {
  it('renders login form', () => {
    const setModal = jest.fn();
    render(<Modal show={true} content={'Some Content'} setModal={setModal} />);

    expect(screen.getByText('Some Content')).toBeInTheDocument();
  });
});
