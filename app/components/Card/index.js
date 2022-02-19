const React = require('react');

const Card = ({ children }) => (
  <div className="card">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="card-header">
    {children}
  </div>
);

const CardBody = ({ children }) => (
  <div className="card-body">
    {children}
  </div>
);

const CardFooter = ({ children }) => (
  <div className="card-footer">
    {children}
  </div>
);

module.exports = {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
};
