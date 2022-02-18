const React = require('react');
const { render, screen } = require('@testing-library/react');

const { Navbar } = require('.');

describe('Navbar component', () => {
  test('should render Octicon with Github link', () => {
    render(<Navbar />);

    const anchor = screen.getByLabelText('Go to Github');
    expect(anchor.href).toBe('https://github.com/');
    screen.getByTestId('octicon');
  });
});
