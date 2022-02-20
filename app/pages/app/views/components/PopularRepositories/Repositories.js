const React = require('react');
const moment = require('moment');
const { AiOutlineStar } = require('react-icons/ai');

const { Card, CardHeader, CardBody, CardFooter } = require('../../../../../components/Card');

const RepositoryCard = ({ id, repo_name, repo_url, owner_name, owner_url, description, language, last_updated, star_count }) => (
  <Card key={id}>
    <CardHeader>
      <h2 className="repository-title">
        <a className="secondary" href={owner_url} target="_blank" rel="noreferrer">
          {owner_name}
        </a>
        /
        <a className="primary" href={repo_url} target="_blank" rel="noreferrer">
          {repo_name}
        </a>
      </h2>
      {/* TODO - We could do some sort of "gauge" to show popularity */}
      <button className="repository-star-button" onClick={() => console.log(`STAR ${id}`)}>
        <AiOutlineStar size={20} />
        <span className="star-counter">
          {`Star ${star_count}` /* TODO - Could shorten this number */}
        </span>
      </button>
    </CardHeader>
    {description && (
      <CardBody>
        <p>{description}</p>
      </CardBody>
    )}
    <CardFooter>
      <span style={{ marginRight: 24 }}>
        {`Updated ${moment(last_updated).fromNow()}`}
      </span>
      <span>{language}</span>
    </CardFooter>
  </Card>
);

const Repositories = ({ repositories }) => (
  Array.isArray(repositories) && repositories.length > 0 ? (
    <div className="repositories">
      {repositories.map(RepositoryCard)}
    </div>
  ) : (
    <div>We could not find any results.</div>
  )
);

module.exports = {
  Repositories,
  RepositoryCard,
};
