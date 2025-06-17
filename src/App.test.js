import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const heading = screen.getByText(/solo leveling: real life/i);
  expect(heading).toBeInTheDocument();
});
