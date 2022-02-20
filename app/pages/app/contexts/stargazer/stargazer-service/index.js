// TODO - This folder could be moved to "services" folder if it no longer uses localStorage
// TODO - All the logging made in this file should be supressed in production, or changed to a real logging tool
const axios = require('axios');

const INVALID_JSON = 'INVALID_JSON';

const parserHelper = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return INVALID_JSON;
  }
};

class StargazerService {
  constructor(user) {
    this.user = user;
    this.isServerSide = typeof window === 'undefined';
  }

  getStarred() {
    // If using this on the server, return a dummy object
    if (this.isServerSide) {
      return [];
    }
    const userData = parserHelper(localStorage.getItem(this.user));
    if (userData === INVALID_JSON) {
      console.warn('Could not find starred repositories.');
      // Set default response when starred repos do not exist
      return [];
    }
    return (userData && userData.starred) || [];
  }

  async fetchStarred(offset = 0, limit = 6) {
    try {
      let repositories = this.getStarred();
      const total = repositories.length;
      if (total !== 0) {
        const { data } = await axios.get('/api/my-starred/repositories', { params: { repositories: repositories.join(','), offset, limit } });
        repositories = data;
      }
      return {
        error: null,
        data: repositories,
        total,
      };
    } catch (error) {
      console.error('There was an error while trying to fetch starred repositories.', { error });
      return {
        error,
        data: null,
      };
    }
  }

  toggleStarred(id) {
    // If using this on the server, return a dummy object
    if (this.isServerSide) {
      return {
        error: null,
        data: [],
      };
    }
    try {
      const repositories = this.getStarred();
      const userData = { starred: [] };
      if (!Array.isArray(repositories) || repositories.length === 0) {
        console.warn('Could not find starred repositories, will create a new localStorage entry.');
        userData.starred.push(id);
      } else if (repositories.find(starredRepo => starredRepo === id)) {
        console.warn(`Deleting repository with id: ${id}.`);
        userData.starred = repositories.filter(starredRepo => starredRepo !== id);
      } else {
        console.warn(`Adding new repository with id: ${id}.`);
        userData.starred = [...repositories, id];
      }
      localStorage.setItem(this.user, JSON.stringify(userData));
      return {
        error: null,
        data: userData.starred,
      };
    } catch (error) {
      console.error(`There was an error while trying to toggle the repository with id: ${id}.`, { error });
      return {
        error,
        data: null,
      };
    }
  }
}

module.exports = {
  StargazerService,
};
