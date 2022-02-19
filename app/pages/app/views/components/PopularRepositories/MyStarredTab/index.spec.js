const React = require('react');
const { render, screen } = require('@testing-library/react');

const { MyStarredTab } = require('.');

describe('MyStarredTab component', () => {
  test('should render title', async () => {
    render(<MyStarredTab />);

    screen.getByText(/My Starred repositories/);
  });
});
