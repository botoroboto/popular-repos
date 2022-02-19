const axios = require('axios');

const { app } = require('../../../../../config');

const { baseURL, timeout } = app.services.github;

class GithubService {
  constructor() {
    // TODO - Could have a common restclient, so it logs whenever you make a req
    this.restclient = axios.create({
      baseURL: baseURL,
      timeout: timeout,
    });
  }

  async searchRepositories({ date, language }) {
    const url = '/search/repositories';
    const params = {
      sort: 'stars',
      order: 'desc',
      per_page: 25,
    };
    const { data } = await this.restclient.get(`${url}?q=${encodeURIComponent(`language:${language} created:>${date}`)}`, { params });
    const transformedData = data.items.map(( repository ) => ({
      repo_name: repository.name,
      repo_url: repository.html_url,
      owner_name: repository.owner.login,
      owner_url: repository.owner.html_url,
      star_count: repository.stargazers_count,
      last_updated: repository.updated_at,
      description: repository.description,
      language: repository.language,
      id: repository.id,
    }));
    return transformedData;
  }
}

module.exports = {
  GithubService,
};
