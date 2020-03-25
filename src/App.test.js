import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders hello bmx text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/hello bmx/i);
  expect(linkElement).toBeInTheDocument();
});
