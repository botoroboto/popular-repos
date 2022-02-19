const React = require('react');
const { render, screen } = require('@testing-library/react');

const { Repositories } = require('./Repositories');

describe('Repositories component', () => {
  let repositories;

  beforeEach(() => {
    repositories = [
      { id: 1, full_name: 'me/my-repo'},
    ];
  });

  // TODO - Add tests after changing the main components to Cards

  test('should render expected message if no repositories are passed', async () => {
    repositories = [];
    render(<Repositories repositories={repositories} />);

    screen.getByText(/We could not find any results/);
  });
});
