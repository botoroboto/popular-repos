const nock = require('nock');

const { GithubService } = require('.');
const { app } = require('../../../../../config');

const { baseURL } = (app && app.services && app.services.github) || {};

describe('GithubService', () => {
  let service;

  beforeEach(() => {
    service = new GithubService();
  });

  describe('searchRepositories', () => {
    let language, date_filter;
    beforeEach(() => {
      language = undefined;
      date_filter = '2022-02-11';
    });

    test('should fetch repositories from Github API\'s endpoint', async () => {
      const response = { someAttribute: 'someData' };
      nock(baseURL)
        .get('/search/repositories')
        .query({
          sort: 'stars',
          order: 'desc',
          per_page: 25,
          q: `language:${language} created:>${date_filter}`,
        })
        .reply(200, response);
      const data = await service.searchRepositories();

      expect(data).toMatchObject(response);
    });

    // TODO - Add tests for params
  });
});
