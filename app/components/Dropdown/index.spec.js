const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');

const { Dropdown } = require('.');

describe('Dropdown component', () => {
  let baseProps;

  beforeEach(() => {
    baseProps = {
      options: [
        { label: 'firstLabel', value: 'firstValue' },
        { label: 'secondLabel', value: 'secondValue' },
      ],
      onChange: jest.fn(),
    };
  });

  test('should show list items when clicking on placeholder', () => {
    render(<Dropdown {...baseProps} />);

    expect(screen.queryByText('firstLabel')).toBeNull();
    expect(screen.queryByText('secondLabel')).toBeNull();
    fireEvent.click(screen.getByText('Select a language'));

    screen.getByText('firstLabel');
    screen.getByText('secondLabel');
  });

  test('should show list items when pressing enter on placeholder', () => {
    render(<Dropdown {...baseProps} />);

    expect(screen.queryByText('firstLabel')).toBeNull();
    expect(screen.queryByText('secondLabel')).toBeNull();
    fireEvent.keyPress(screen.getByText('Select a language'), { charCode: 13 });

    screen.getByText('firstLabel');
    screen.getByText('secondLabel');
  });

  test('should select item and send through callback onChange', () => {
    const mockOnChange = jest.fn();
    baseProps.onChange = mockOnChange;
    render(<Dropdown {...baseProps} />);

    expect(mockOnChange).not.toHaveBeenCalled();
    expect(screen.queryByText('secondLabel')).toBeNull();
    fireEvent.click(screen.getByText('Select a language'));

    fireEvent.click(screen.getByText('firstLabel'));
    expect(mockOnChange).toHaveBeenCalledWith('firstValue');
  });

  test('should select item with enter and send through callback onChange', () => {
    const mockOnChange = jest.fn();
    baseProps.onChange = mockOnChange;
    render(<Dropdown {...baseProps} />);

    expect(mockOnChange).not.toHaveBeenCalled();
    expect(screen.queryByText('secondLabel')).toBeNull();
    fireEvent.click(screen.getByText('Select a language'));

    fireEvent.keyPress(screen.getByText('firstLabel'), { charCode: 13 });
    expect(mockOnChange).toHaveBeenCalledWith('firstValue');
  });

  test('should be able to clear selection after pressing list item', () => {
    const mockOnChange = jest.fn();
    baseProps.onChange = mockOnChange;
    render(<Dropdown {...baseProps} />);

    expect(mockOnChange).not.toHaveBeenCalled();
    expect(screen.queryByTestId('clear-button')).toBeNull();
    fireEvent.click(screen.getByText('Select a language'));

    fireEvent.click(screen.getByText('firstLabel'));
    expect(mockOnChange).toHaveBeenCalledWith('firstValue');

    fireEvent.click(screen.getByTestId('clear-button'));
    expect(screen.queryByTestId('clear-button')).toBeNull();
    expect(mockOnChange).toHaveBeenCalledWith(null);
  });

  test('should be able to clear selection with enter after pressing list item', () => {
    const mockOnChange = jest.fn();
    baseProps.onChange = mockOnChange;
    render(<Dropdown {...baseProps} />);

    expect(mockOnChange).not.toHaveBeenCalled();
    expect(screen.queryByTestId('clear-button')).toBeNull();
    fireEvent.click(screen.getByText('Select a language'));

    fireEvent.click(screen.getByText('firstLabel'));
    expect(mockOnChange).toHaveBeenCalledWith('firstValue');

    fireEvent.keyPress(screen.getByTestId('clear-button'), { charCode: 13 });
    expect(screen.queryByTestId('clear-button')).toBeNull();
    expect(mockOnChange).toHaveBeenCalledWith(null);
  });
});
