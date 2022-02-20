const React = require('react');
const { render, screen } = require('@testing-library/react');

const { MyStarredTab } = require('.');
const { StargazerContext } = require('../../../../contexts/stargazer');

jest.mock('moment', () => () => ({
  ...jest.requireActual('moment'),
  fromNow: () => 'a few seconds ago (mocked)',
}));

describe('MyStarredTab component', () => {
  let someRepo;
  let baseProps;
  const defaultStargazerService = {
    getStarred: jest.fn().mockImplementation(() => []),
    fetchStarred: jest.fn().mockImplementation(() => []),
    toggleStarred: jest.fn().mockImplementation(() => []),
  };

  const Contextualized =  ({ stargazerContext } = {}) => ({ children }) => (
    <StargazerContext.Provider value={stargazerContext || { stargazerService: defaultStargazerService }}>
      {children}
    </StargazerContext.Provider>
  );

  beforeEach(() => {
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

  test('should render MyStarred tab', async () => {
    const mockFetchStarred = jest.fn().mockImplementation(() => ({ error: null, data: [someRepo] }));
    const stargazerService = {
      getStarred: jest.fn().mockImplementation(() => []),
      fetchStarred: mockFetchStarred,
      toggleStarred: jest.fn().mockImplementation(() => []),
    };

    render(<MyStarredTab {...baseProps} />, { wrapper: Contextualized({ stargazerContext: { stargazerService } }) });
    screen.getByText(/My Starred repositories/);
    screen.getByText(/Loading/);

    await screen.findByText(someRepo.owner_name);
    screen.getByText(someRepo.repo_name);
    screen.getByText(`Star ${someRepo.star_count}`);
    screen.getByText(someRepo.description);
    screen.getByText('Updated a few seconds ago (mocked)');
    screen.getByText(someRepo.language);
    expect(mockFetchStarred).toHaveBeenCalled();
    expect(screen.queryByText(/Loading/)).toBeNull();
  });

  test('should show error if request fails', async () => {
    const mockFetchStarred = jest.fn().mockImplementation(() => ({ error: new Error('whoops!'), data: null }));
    const stargazerService = {
      getStarred: jest.fn().mockImplementation(() => []),
      fetchStarred: mockFetchStarred,
      toggleStarred: jest.fn().mockImplementation(() => []),
    };
    render(<MyStarredTab {...baseProps} />, { wrapper: Contextualized({ stargazerContext: { stargazerService } }) });

    screen.getByText(/My Starred repositories/);
    await screen.findByText(/Whoops! Error/);
  });

  test('should also show error if fetchStarred throws', async () => {
    const mockFetchStarred = jest.fn().mockImplementation(() => { throw new Error(); });
    const stargazerService = {
      getStarred: jest.fn().mockImplementation(() => []),
      fetchStarred: mockFetchStarred,
      toggleStarred: jest.fn().mockImplementation(() => []),
    };
    render(<MyStarredTab {...baseProps} />, { wrapper: Contextualized({ stargazerContext: { stargazerService } }) });

    screen.getByText(/My Starred repositories/);
    await screen.findByText(/Whoops! Error/);
  });

  test('should not call fetchStarred if initialFetch has data', async () => {
    baseProps.initialFetch.data = [someRepo];
    const mockFetchStarred = jest.fn().mockImplementation(() => ({ error: null, data: [someRepo] }));
    const stargazerService = {
      getStarred: jest.fn().mockImplementation(() => []),
      fetchStarred: mockFetchStarred,
      toggleStarred: jest.fn().mockImplementation(() => []),
    };
    render(<MyStarredTab {...baseProps} />, { wrapper: Contextualized({ stargazerContext: { stargazerService } }) });

    screen.getByText(/My Starred repositories/);
    // Should not show loading because data has been prefetched
    expect(screen.queryByText(/Loading/)).toBeNull();

    await screen.findByText(someRepo.owner_name);
    screen.getByText(someRepo.repo_name);
    screen.getByText(`Star ${someRepo.star_count}`);
    screen.getByText(someRepo.description);
    screen.getByText('Updated a few seconds ago (mocked)');
    screen.getByText(someRepo.language);
    expect(mockFetchStarred).not.toHaveBeenCalled();
  });
});
