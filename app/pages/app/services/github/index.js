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

  _transformRepository(repository) {
    return ({
      repo_name: repository.name,
      repo_url: repository.html_url,
      owner_name: repository.owner.login,
      owner_url: repository.owner.html_url,
      star_count: repository.stargazers_count,
      last_updated: repository.updated_at,
      description: repository.description,
      language: repository.language,
      id: repository.id,
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
    return data.items.map(this._transformRepository);
  }

  async getRepository({ id }) {
    const url = `/repositories/${id}`;
    const { data } = await this.restclient.get(url);
    return this._transformRepository(data); // TODO - Could use "If-None-Match" header with Etag value to cache this request
  }

  async getRepositories({ repositories, offset, endOffset }) {
    const offsetRepositories = repositories.slice(offset, endOffset);
    const data = await Promise.all(offsetRepositories.map(id => (
      this.getRepository({ id })
    )));
    return data;
  }
}

module.exports = {
  GithubService,
};
