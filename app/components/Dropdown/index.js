const { default: classNames } = require('classnames');
const React = require('react');
const { FaTimesCircle } = require('react-icons/fa');

const { useState } = React;

const Dropdown = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleVisibility = () => setIsOpen(prevState => !prevState);

  const onOptionClicked = ({ value, label }) => () => {
    onChange(value);
    setSelectedOption(label);
    setIsOpen(false);
  };

  const onEnterHandler = (callback) => ({ charCode }) => {
    if (charCode === 13) {
      callback();
    }
  };

  const onClear = () => {
    onChange(null);
    setSelectedOption(null);
  };

  return (
    <div className='dropdown-container'>
      <div className='dropdown-header'>
        <span
          className='dropdown-header-title'
          onClick={toggleVisibility}
          onKeyPress={onEnterHandler(toggleVisibility)}
        >
          {selectedOption ? `Language: ${selectedOption}` : 'Select a language'}
        </span>
        {selectedOption && (
          <FaTimesCircle
            data-testid='clear-button'
            className='clear-button'
            onClick={onClear}
            onKeyPress={onEnterHandler(onClear)}
          />
        )}
      </div>
      {isOpen && (
        <div className='dropdown-list-container'>
          <ul className='dropdown-list'>
            {options.map(({ value, label }) => (
              <li
                tabIndex={0}
                onKeyPress={onEnterHandler(onOptionClicked({ value, label }))}
                onClick={onOptionClicked({ value, label })}
                key={value}
                className={classNames({
                  'dropdown-list-item': true,
                  'dropdown-list-item-selected': selectedOption === label,
                })}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

module.exports = {
  Dropdown,
};
