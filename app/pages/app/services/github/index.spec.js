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
    let language;
    let date;
    let apiResponse;

    beforeEach(() => {
      language = null;
      date = '2022-02-11';
      apiResponse = {
        items: [
          {
            id: 458907326,
            name: 'melody',
            owner: {
              login: 'yoav-lavi',
              html_url: 'https://github.com/yoav-lavi',
            },
            html_url: 'https://github.com/yoav-lavi/melody',
            description: 'Melody is a language that compiles to regular expressions and aims to be more easily readable and maintainable',
            stargazers_count: 123,
            language: 'Javascript',
            updated_at: '2022-02-19T22:26:39Z',
          },
        ],
      };
    });

    test('should fetch repositories from Github API\'s endpoint', async () => {
      const repository = apiResponse.items[0];
      const response = {
        repo_name: repository.name,
        repo_url: repository.html_url,
        owner_name: repository.owner.login,
        owner_url: repository.owner.html_url,
        star_count: repository.stargazers_count,
        last_updated: repository.updated_at,
        description: repository.description,
        language: repository.language,
        id: repository.id,
      };
      nock(baseURL)
        .get('/search/repositories')
        .query({
          sort: 'stars',
          order: 'desc',
          per_page: 25,
          q: `language:${language} created:>${date}`,
        })
        .reply(200, apiResponse);
      const data = await service.searchRepositories({ language, date });

      expect(data[0]).toMatchObject(response);
    });

    // TODO - Add tests for params
  });

  describe('getRepositories', () => {
    let repositories;
    let apiResponse;

    beforeEach(() => {
      repositories = [
        458907326,
      ];
      apiResponse = {
        id: 458907326,
        name: 'melody',
        owner: {
          login: 'yoav-lavi',
          html_url: 'https://github.com/yoav-lavi',
        },
        html_url: 'https://github.com/yoav-lavi/melody',
        description: 'Melody is a language that compiles to regular expressions and aims to be more easily readable and maintainable',
        stargazers_count: 123,
        language: 'Javascript',
        updated_at: '2022-02-19T22:26:39Z',
      };
    });

    test('should get repositories from Github API\'s endpoint', async () => {
      const response = {
        repo_name: apiResponse.name,
        repo_url: apiResponse.html_url,
        owner_name: apiResponse.owner.login,
        owner_url: apiResponse.owner.html_url,
        star_count: apiResponse.stargazers_count,
        last_updated: apiResponse.updated_at,
        description: apiResponse.description,
        language: apiResponse.language,
        id: apiResponse.id,
      };
      nock(baseURL)
        .get(`/repositories/${apiResponse.id}`)
        .reply(200, apiResponse);
      const data = await service.getRepositories({ repositories });

      expect(data[0]).toMatchObject(response);
    });
  });

  describe('getRepository', () => {
    let apiResponse;

    beforeEach(() => {
      apiResponse = {
        id: 458907326,
        name: 'melody',
        owner: {
          login: 'yoav-lavi',
          html_url: 'https://github.com/yoav-lavi',
        },
        html_url: 'https://github.com/yoav-lavi/melody',
        description: 'Melody is a language that compiles to regular expressions and aims to be more easily readable and maintainable',
        stargazers_count: 123,
        language: 'Javascript',
        updated_at: '2022-02-19T22:26:39Z',
      };
    });

    test('should get repository from Github API\'s endpoint', async () => {
      const response = {
        repo_name: apiResponse.name,
        repo_url: apiResponse.html_url,
        owner_name: apiResponse.owner.login,
        owner_url: apiResponse.owner.html_url,
        star_count: apiResponse.stargazers_count,
        last_updated: apiResponse.updated_at,
        description: apiResponse.description,
        language: apiResponse.language,
        id: apiResponse.id,
      };
      nock(baseURL)
        .get(`/repositories/${apiResponse.id}`)
        .reply(200, apiResponse);
      const data = await service.getRepository({ id: apiResponse.id });

      expect(data).toMatchObject(response);
    });
  });
});
