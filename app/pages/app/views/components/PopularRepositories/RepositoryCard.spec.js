const React = require('react');
const { render, screen } = require('@testing-library/react');

const { RepositoryCard } = require('./RepositoryCard');

jest.mock('moment', () => () => ({
  ...jest.requireActual('moment'),
  fromNow: () => 'a few seconds ago (mocked)',
}));

describe('RepositoryCard component', () => {
  let someRepo;

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
  });

  test('should render expected values', () => {
    render(<RepositoryCard {...someRepo} />);

    screen.getByRole('link', { name: someRepo.owner_name });
    screen.getByRole('link', { name: someRepo.repo_name });
    screen.getByRole('button', { name: `Star ${someRepo.star_count}` });
    screen.getByText(someRepo.description);
    screen.getByText('Updated a few seconds ago (mocked)');
    screen.getByText(someRepo.language);
  });
});
