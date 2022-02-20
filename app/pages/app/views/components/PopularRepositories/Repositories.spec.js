const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');

const { Repositories } = require('./Repositories');
const { StargazerContext } = require('../../../contexts/stargazer');

jest.mock('moment', () => () => ({
  ...jest.requireActual('moment'),
  fromNow: () => 'a few seconds ago (mocked)',
}));

describe('Repositories component', () => {
  let repositories;
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
    repositories = [{
      repo_name: 'melody',
      repo_url: 'https://github.com/yoav-lavi/melody',
      owner_name: 'yoav-lavi',
      owner_url: 'https://github.com/yoav-lavi',
      star_count: 123,
      last_updated: '2022-02-19T22:26:39Z',
      description: 'Melody is a language that compiles to regular expressions and aims to be more easily readable and maintainable',
      language: 'Javascript',
      id: 458907326
    }];
  });

  test('should render RepositoryCard', () => {
    const someRepo = repositories[0];
    render(<Repositories repositories={repositories} />, { wrapper: Contextualized() });

    screen.getByRole('link', { name: someRepo.owner_name });
    screen.getByRole('link', { name: someRepo.repo_name });
    screen.getByRole('button', { name: `Star ${someRepo.star_count}` });
    screen.getByText(someRepo.description);
    screen.getByText('Updated a few seconds ago (mocked)');
    screen.getByText(someRepo.language);
    screen.getByTestId('outline-star');
  });

  test('should show when repository is starred', () => {
    const someRepo = repositories[0];
    const stargazerService = {
      getStarred: jest.fn().mockImplementation(() => [someRepo.id]),
    };

    render(<Repositories repositories={repositories} />, { wrapper: Contextualized({ stargazerContext: { stargazerService } }) });

    screen.getByTestId('filled-star');
  });

  test('should be able to show one starred and one non-starred repositories', () => {
    const someRepo = repositories[0];
    const someOtherRepo = {
      ...someRepo,
      id: 1,
    };
    repositories.push(someOtherRepo);
    const stargazerService = {
      getStarred: jest.fn().mockImplementation(() => [someRepo.id]),
    };

    render(<Repositories repositories={repositories} />, { wrapper: Contextualized({ stargazerContext: { stargazerService } }) });

    screen.getByTestId('filled-star');
    screen.getByTestId('outline-star');
  });

  test('should call toggleStarred when clicking on star button', () => {
    const someRepo = repositories[0];
    const mockToggleStarred = jest.fn();
    const stargazerService = {
      getStarred: jest.fn().mockImplementation(() => [someRepo.id]),
      toggleStarred: mockToggleStarred,
    };

    render(<Repositories repositories={repositories} />, { wrapper: Contextualized({ stargazerContext: { stargazerService } }) });

    screen.getByTestId('filled-star');
    expect(mockToggleStarred).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: `Star ${someRepo.star_count}` }));

    expect(mockToggleStarred).toHaveBeenCalledWith(someRepo.id);
    expect(screen.queryByTestId('filled-star')).toBeNull();
    screen.getByTestId('outline-star');
  });

  test('should call toggleStarred when pressing enter on star button', () => {
    const someRepo = repositories[0];
    const mockToggleStarred = jest.fn();
    const stargazerService = {
      getStarred: jest.fn().mockImplementation(() => [someRepo.id]),
      toggleStarred: mockToggleStarred,
    };

    render(<Repositories repositories={repositories} />, { wrapper: Contextualized({ stargazerContext: { stargazerService } }) });

    screen.getByTestId('filled-star');
    expect(mockToggleStarred).not.toHaveBeenCalled();
    fireEvent.keyPress(
      screen.getByRole('button', { name: `Star ${someRepo.star_count}` }),
      { charCode: 13 },
    );

    expect(mockToggleStarred).toHaveBeenCalledWith(someRepo.id);
    expect(screen.queryByTestId('filled-star')).toBeNull();
    screen.getByTestId('outline-star');
  });

  test('should render expected message if no repositories are passed', () => {
    repositories = [];
    render(<Repositories repositories={repositories} />, { wrapper: Contextualized() });

    screen.getByText(/We could not find any results/);
  });
});
