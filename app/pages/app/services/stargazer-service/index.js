// If using this on the server, return a dummy object
const StargazerService = (user) => typeof window !== 'undefined' ? ({
  getStarred: () => {
    try {
      const userData = JSON.parse(localStorage.getItem(user));
      let repositories = (userData && userData.starred) || [];
      // TODO - Develop API endpoint
      // if (repositories.length !== 0) {
      //   repositories = await axios.get('/api/my-starred/repositories', { params: { repositories: repositories.join(',') } });
      // }
      return {
        error: null,
        data: repositories,
      };
    } catch (error) {
      console.error('There was an error while trying to get starred repositories.');
      return {
        error,
        data: null,
      };
    }
  },
  toggleStarred: (id) => {
    try {
      let userData = JSON.parse(localStorage.getItem(user));
      if (!userData || !Array.isArray(userData.starred)) {
        console.warn('Could not find starred repositories, will create a new localStorage entry.');
        userData = {
          starred: [id],
        };
      } else if (userData.starred.find(id)) {
        console.warn(`Deleting repository with id: ${id}.`);
        userData.starred = userData.starred.filter(starredRepo => starredRepo.id !== id);
      } else {
        console.warn(`Adding new repository with id: ${id}.`);
        userData.starred.push(id);
      }
      localStorage.setItem(user, JSON.stringify(userData));
      return {
        error: null,
        data: (userData && userData.starred) || [],
      };
    } catch (error) {
      console.error(`There was an error while trying to toggle the repository with id: ${id}.`);
      return {
        error,
        data: null,
      };
    }
  },
}) : {
  getStarred: () => ({
    error: null,
    data: [],
  }),
  toggleStarred: () => ({
    error: null,
    data: [],
  })
};

module.exports = {
  StargazerService,
};
