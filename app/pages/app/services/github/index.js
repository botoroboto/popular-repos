const axios = require('axios');

const { app } = require('../../../../../config');

const { baseURL, timeout } = (app && app.services && app.services.github) || {};

class GithubService {
  constructor() {
    // TODO - Could have a common restclient, so it logs whenever you make a req
    this.restclient = axios.create({
      baseURL: baseURL || '/',
      timeout: timeout || 3000,
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
    return data;
  }
}
module.exports = {
  GithubService,
};
