const React = require('react');
const { Octicon } = require('../../../../../assets/Octicon');

const Navbar = () => (
  <div className="navbar">
    <a
      className='octicon'
      aria-label="Go to Github"
      href="https://github.com"
      target="_blank"
      rel="noreferrer"
    >
      <Octicon />
    </a>
  </div>
);

module.exports = {
  Navbar,
};
