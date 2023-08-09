import { render, screen } from '@testing-library/react';
import App from './App';
import Login from'./components/Login';
import ProfilePage from './components/ProfilePage';
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('render login component',()=>{
  render(<ProfilePage/>);
  const linkElement = screen.getAllByText(/NAME/i)
  expect(linkElement).toBeInTheDocument();
})