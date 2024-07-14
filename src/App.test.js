import { render, screen } from '@testing-library/react';
import { act } from 'react'; // 从 'react' 而不是 'react-dom/test-utils' 导入
import App from './App';

test('renders Notion Components title', () => {
  act(() => {
    render(<App />);
  });
  const titleElement = screen.getByText(/Notion Components/i);
  expect(titleElement).toBeInTheDocument();
});
