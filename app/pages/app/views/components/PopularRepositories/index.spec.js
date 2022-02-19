const React = require('react');
const nock = require('nock');
const { MemoryRouter } = require('react-router-dom');
const { render, screen } = require('@testing-library/react');

const { PopularRepositories } = require('.');

const baseURL = 'http://localhost/api';

describe('PopularRepositories component', () => {
  let someRepo;
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
    nock.cleanAll();
    someRepo = {
      id: 1,
      full_name: 'me/my-repo',
    };
    baseProps = {
      initialFetch: {
        data: null,
      },
    };
  });

  test('should render Explore tab', async () => {
    nock(baseURL)
      .get('/popular-repos/search')
      .once()
      .reply(200, [someRepo]);
    render(<PopularRepositories {...baseProps} />, { wrapper: Contextualized() });

    screen.getByText(/Showing the most popular/);
    screen.getByText(/Loading/);

    await screen.findByText(/Repo Name/);
    screen.getByText(someRepo.full_name);
    expect(screen.queryByText(/Loading/)).toBeNull();
  });

  test('should show error if request fails', async () => {
    nock.cleanAll();
    nock(baseURL)
      .get('/popular-repos/search')
      .once()
      .reply(400, { message: 'some error' });
    render(<PopularRepositories {...baseProps} />, { wrapper: Contextualized() });

    screen.getByText(/Showing the most popular/);
    await screen.findByText(/Whoops! Error/);
  });

  test('should not make request if initialFetch has data', async () => {
    nock.cleanAll();
    baseProps.initialFetch = {
      data: [someRepo],
    };
    const mockSearch = nock(baseURL)
      .get('/popular-repos/search')
      .once()
      .reply(200, [someRepo]);
    render(<PopularRepositories {...baseProps} />, { wrapper: Contextualized() });

    screen.getByText(/Showing the most popular/);
    await screen.findByText(/Repo Name/);
    screen.getByText(someRepo.full_name);
    expect(mockSearch.pendingMocks()).toHaveLength(1);
  });

  test('should render My Starred tab', async () => {
    baseProps.initialFetch = {
      data: [],
    };
    render(<PopularRepositories {...baseProps} />, { wrapper: Contextualized({
      routerProps: {
        initialEntries: ['/my-starred'],
      },
    })});

    await screen.findByText(/My Starred repositories/);
  });

  test('should redirect to Explore tab if pathname is not found', async () => {
    render(<PopularRepositories {...baseProps} />, { wrapper: Contextualized({
      routerProps: {
        initialEntries: ['/some-pathname'],
      },
    })});

    screen.getByText(/Showing the most popular/);
  });
});
