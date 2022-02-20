const React = require('react');
const { render, screen } = require('@testing-library/react');

const { MyStarredTab } = require('.');
const { StargazerContext } = require('../../../../contexts/stargazer');

describe('MyStarredTab component', () => {
  const Contextualized = ({ stargazerContext } = { stargazerContext: { stargazerService: {} } }) => ({ children }) => (
    <StargazerContext.Provider value={stargazerContext}>
      {children}
    </StargazerContext.Provider>
  );

  test('should render title', () => {
    render(<MyStarredTab />, { wrapper: Contextualized() });

    screen.getByText(/My Starred repositories/);
  });
});
