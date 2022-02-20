const React = require('react');
const nock = require('nock');
const { render, screen } = require('@testing-library/react');

const { ExploreTab } = require('.');
const { StargazerContext } = require('../../../../contexts/stargazer');

const baseURL = 'http://localhost/api';

jest.mock('moment', () => () => ({
  ...jest.requireActual('moment'),
  fromNow: () => 'a few seconds ago (mocked)',
}));

describe('ExploreTab component', () => {
  let someRepo;
  let baseProps;

  const defaultStargazerService = {
    getStarred: jest.fn().mockImplementation(() => []),
    fetchStarred: jest.fn().mockImplementation(() => []),
    toggleStarred: jest.fn().mockImplementation(() => []),
  };

  const Contextualized = ({ stargazerContext } = {}) => ({ children }) => (
    <StargazerContext.Provider value={stargazerContext || { stargazerService: defaultStargazerService }}>
      {children}
    </StargazerContext.Provider>
  );

  beforeEach(() => {
    nock.cleanAll();
    someRepo = {
      repo_name: 'melody',
      repo_url: 'https://github.com/yoav-lavi/melody',
      owner_name: 'yoav-lavi',
      owner_url: 'https://github.com/yoav-lavi',
      star_count: 123,
      last_updated: '2022-02-19T22:26:39Z',
      description: 'Melody is a language that compiles to regular expressions and aims to be more easily readable and maintainable',
      language: 'Javascript',
      id: 458907326
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
    render(<ExploreTab {...baseProps} />, { wrapper: Contextualized() });

    screen.getByText(/Showing the most popular/);
    screen.getByText(/Loading/);

    await screen.findByText(someRepo.owner_name);
    screen.getByText(someRepo.repo_name);
    screen.getByText(`Star ${someRepo.star_count}`);
    screen.getByText(someRepo.description);
    screen.getByText('Updated a few seconds ago (mocked)');
    screen.getByText(someRepo.language);
    expect(screen.queryByText(/Loading/)).toBeNull();
  });

  test('should show error if request fails', async () => {
    nock.cleanAll();
    nock(baseURL)
      .get('/popular-repos/search')
      .once()
      .reply(400, { message: 'some error' });
    render(<ExploreTab {...baseProps} />, { wrapper: Contextualized() });

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
    render(<ExploreTab {...baseProps} />, { wrapper: Contextualized() });

    screen.getByText(/Showing the most popular/);
    await screen.findByText(someRepo.owner_name);
    expect(mockSearch.pendingMocks()).toHaveLength(1);
  });

  test('should show expected message if data is an array with no items', () => {
    baseProps.initialFetch = {
      data: [],
    };
    render(<ExploreTab {...baseProps} />, { wrapper: Contextualized() });

    screen.getByText(/Showing the most popular/);
    screen.getByText(/We could not find any results/);
  });
});
