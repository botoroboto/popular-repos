const React = require('react');
const { render, screen } = require('@testing-library/react');

const { PopularRepositories } = require('.');

describe('PopularRepositories component', () => {
  test('should render title', () => {
    render(<PopularRepositories />);

    screen.getByText(/Showing the most popular/);
  });

  // TODO - Add nock test for request
});
