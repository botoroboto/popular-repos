const React = require('react');
const { useNavigate, useLocation } = require('react-router');
const { Octicon } = require('../../../../../assets/Octicon');

const NavbarLink = ({ path, children }) => {
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();

  const navigateTo = (path) => () => {
    navigate(path);
  };

  const onEnterHandler = (callback) => ({ charCode }) => {
    if (charCode === 13) {
      callback();
    }
  };

  return (
    <a
      tabIndex={0}
      role='button'
      onClick={navigateTo(path)}
      onKeyPress={onEnterHandler(navigateTo(path))}
      className={currentPath === path ? 'selected' : ''}
    >
      {children}
    </a>
  );
};

const Navbar = () => (
  <div className="navbar">
    <a
      className='octicon'
      aria-label="Go to Github"
      href="https://github.com/"
      target="_blank"
      rel="noreferrer"
    >
      <Octicon />
    </a>
    <div className="tabs">
      <NavbarLink path="/explore">
        Explore
      </NavbarLink>
      <NavbarLink path="/my-starred">
        My Starred
      </NavbarLink>
    </div>
  </div>
);

module.exports = {
  Navbar,
  NavbarLink,
};
