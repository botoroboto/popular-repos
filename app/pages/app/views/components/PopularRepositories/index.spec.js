const React = require('react');
const { MemoryRouter } = require('react-router-dom');
const { render, screen } = require('@testing-library/react');

const { PopularRepositories } = require('.');

describe('PopularRepositories component', () => {
  let baseProps;
  const defaultRouterProps = {
    initialEntries: ['/explore'],
  };

  const Contextualized = ({ routerProps } = { routerProps: defaultRouterProps }) => ({ children }) => (
    <MemoryRouter {...routerProps}>
      {children}
    </MemoryRouter>
  );

  beforeEach(() => {
    baseProps = {
      initialFetch: {
        data: [],
      },
    };
  });

  test('should render Explore tab', () => {
    render(<PopularRepositories {...baseProps} />, { wrapper: Contextualized() });

    screen.getByText(/Showing the most popular/);
  });

  test('should render My Starred tab', () => {
    render(<PopularRepositories {...baseProps} />, { wrapper: Contextualized({
      routerProps: {
        initialEntries: ['/my-starred'],
      },
    })});

    screen.getByText(/My Starred repositories/);
  });

  test('should redirect to Explore tab if pathname is not found', () => {
    render(<PopularRepositories {...baseProps} />, { wrapper: Contextualized({
      routerProps: {
        initialEntries: ['/some-pathname'],
      },
    })});

    screen.getByText(/Showing the most popular/);
  });
});
