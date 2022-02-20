const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const { MemoryRouter } = require('react-router-dom');

const { Navbar } = require('.');

const mockNavigateFunction = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigateFunction,
}));


describe('Navbar component', () => {
  const defaultRouterProps = {
    initialEntries: ['/explore'],
  };

  const Contextualized = ({ routerProps } = { routerProps: defaultRouterProps }) => ({ children }) => (
    <MemoryRouter {...routerProps}>
      {children}
    </MemoryRouter>
  );

  beforeEach(() => {
    mockNavigateFunction.mockClear();
  });

  test('should render Octicon with Github link', () => {
    render(<Navbar />, { wrapper: Contextualized() });

    const anchor = screen.getByLabelText('Go to Github');
    expect(anchor.href).toBe('https://github.com/');
    screen.getByTestId('octicon');
  });

  test('should render Explore tab and navigate when clicked', () => {
    render(<Navbar />, { wrapper: Contextualized() });

    expect(mockNavigateFunction).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText('Explore'));

    expect(mockNavigateFunction).toHaveBeenCalledWith('/explore');
  });

  test('should render Explore tab and navigate when pressing enter while focused', () => {
    render(<Navbar />, { wrapper: Contextualized() });

    expect(mockNavigateFunction).not.toHaveBeenCalled();
    fireEvent.keyPress(screen.getByText('Explore'), { charCode: 13 });

    expect(mockNavigateFunction).toHaveBeenCalledWith('/explore');
  });

  test('should render My Starred tab and navigate when clicked', () => {
    render(<Navbar />, { wrapper: Contextualized() });

    expect(mockNavigateFunction).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText('My Starred'));

    expect(mockNavigateFunction).toHaveBeenCalledWith('/my-starred');
  });

  test('should render My Starred tab and navigate when pressing enter while focused', () => {
    render(<Navbar />, { wrapper: Contextualized() });

    expect(mockNavigateFunction).not.toHaveBeenCalled();
    fireEvent.keyPress(screen.getByText('My Starred'), { charCode: 13 });

    expect(mockNavigateFunction).toHaveBeenCalledWith('/my-starred');
  });
});
