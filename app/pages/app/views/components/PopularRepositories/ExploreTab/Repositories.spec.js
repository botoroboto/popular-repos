const React = require('react');
const { render, screen } = require('@testing-library/react');

const { Repositories } = require('./Repositories');

jest.mock('moment', () => () => ({
  ...jest.requireActual('moment'),
  fromNow: () => 'a few seconds ago (mocked)',
}));

describe('Repositories component', () => {
  let repositories;

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
    render(<Repositories repositories={repositories} />);

    screen.getByText(someRepo.owner_name);
    screen.getByText(someRepo.repo_name);
    screen.getByText(`Star ${someRepo.star_count}`);
    screen.getByText(someRepo.description);
    screen.getByText('Updated a few seconds ago (mocked)');
    screen.getByText(someRepo.language);
  });

  test('should render expected message if no repositories are passed', () => {
    repositories = [];
    render(<Repositories repositories={repositories} />);

    screen.getByText(/We could not find any results/);
  });
});
