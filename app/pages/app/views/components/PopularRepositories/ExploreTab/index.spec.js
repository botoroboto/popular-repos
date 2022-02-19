const React = require('react');
const nock = require('nock');
const { render, screen } = require('@testing-library/react');

const { ExploreTab } = require('.');

const baseURL = 'http://localhost/api';

describe('ExploreTab component', () => {
  let someRepo;
  let baseProps;

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
    render(<ExploreTab {...baseProps} />);

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
    render(<ExploreTab {...baseProps} />);

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
    render(<ExploreTab {...baseProps} />);

    screen.getByText(/Showing the most popular/);
    await screen.findByText(/Repo Name/);
    screen.getByText(someRepo.full_name);
    expect(mockSearch.pendingMocks()).toHaveLength(1);
  });

  test('should show expected message if data is an array with no items', async () => {
    baseProps.initialFetch = {
      data: [],
    };
    render(<ExploreTab {...baseProps} />);

    screen.getByText(/Showing the most popular/);
    screen.getByText(/We could not find any results/);
  });
});
