const nock = require('nock');

const { StargazerService } = require('.');

const baseURL = 'http://localhost/api';

describe('StargazerService', () => {
  let user = 'someUser';
  let service = new StargazerService(user);

  beforeEach(() => {
    user = 'someUser';
    service = new StargazerService(user);
  });

  describe('getStarred', () => {
    test('should return empty array if isServerSide', () => {
      const mockWindow = jest.spyOn(window, 'window', 'get');
      mockWindow.mockImplementationOnce(() => undefined);
      expect(new StargazerService(user).getStarred()).toHaveLength(0);
      mockWindow.mockRestore();
    });

    test('should return localStorage item if not on server', () => {
      const someRepo = 123;
      const mockGetItem = jest.fn();
      mockGetItem.mockImplementation(() => JSON.stringify({ starred: [someRepo] }));
      const mockWindow = jest.spyOn(window, 'localStorage', 'get');
      mockWindow.mockImplementationOnce(() => ({
        getItem: mockGetItem,
      }));

      expect(mockGetItem).not.toHaveBeenCalled();
      const starredRepositories = service.getStarred();
      expect(mockGetItem).toHaveBeenCalledWith(user);
      expect(starredRepositories).toHaveLength(1);
      expect(starredRepositories[0]).toBe(someRepo);
      mockWindow.mockRestore();
    });

    test('should return empty array if localStorage item does not have expected attribute', () => {
      const someRepo = 123;
      const mockGetItem = jest.fn();
      mockGetItem.mockImplementation(() => JSON.stringify({ whatever: [someRepo] }));
      const mockWindow = jest.spyOn(window, 'localStorage', 'get');
      mockWindow.mockImplementationOnce(() => ({
        getItem: mockGetItem,
      }));

      expect(mockGetItem).not.toHaveBeenCalled();
      const starredRepositories = service.getStarred();
      expect(mockGetItem).toHaveBeenCalledWith(user);
      expect(starredRepositories).toHaveLength(0);
      mockWindow.mockRestore();
    });

    test('should return empty array if localStorage item is not serializable', () => {
      const mockGetItem = jest.fn();
      mockGetItem.mockImplementation(() => 'some random stuff');
      const mockWindow = jest.spyOn(window, 'localStorage', 'get');
      mockWindow.mockImplementationOnce(() => ({
        getItem: mockGetItem,
      }));

      expect(mockGetItem).not.toHaveBeenCalled();
      const starredRepositories = service.getStarred();
      expect(mockGetItem).toHaveBeenCalledWith(user);
      expect(starredRepositories).toHaveLength(0);
      mockWindow.mockRestore();
    });
  });

  describe('toggleStarred', () => {
    test('should return empty data array if isServerSide', () => {
      const expectedResponse = {
        error: null,
        data: [],
      };
      const mockWindow = jest.spyOn(window, 'window', 'get');
      mockWindow.mockImplementationOnce(() => undefined);
      expect(new StargazerService(user).toggleStarred()).toMatchObject(expectedResponse);
      mockWindow.mockRestore();
    });

    test('should push new item to localStorage if entry is already created', () => {
      const someRepo = 123;
      const someNewRepo = 456;
      const mockSetItem = jest.fn();
      const mockGetItem = jest.fn();
      mockGetItem.mockImplementation(() => JSON.stringify({ starred: [someRepo] }));

      const mockWindow = jest.spyOn(window, 'localStorage', 'get');
      mockWindow.mockImplementation(() => ({
        getItem: mockGetItem,
        setItem: mockSetItem
      }));

      expect(mockGetItem).not.toHaveBeenCalled();
      expect(mockSetItem).not.toHaveBeenCalled();
      const starredRepositories = service.toggleStarred(someNewRepo);
      expect(mockGetItem).toHaveBeenCalledWith(user);
      expect(mockSetItem).toHaveBeenCalledWith(user, JSON.stringify({ starred: [someRepo, someNewRepo] }));
      expect(starredRepositories.error).toBeNull();
      expect(starredRepositories.data).toHaveLength(2);
      expect(starredRepositories.data[0]).toBe(someRepo);
      expect(starredRepositories.data[1]).toBe(someNewRepo);
      mockWindow.mockRestore();
    });

    test('should create and push new item to localStorage if entry does not exist', () => {
      const someRepo = 123;
      const mockSetItem = jest.fn();
      const mockGetItem = jest.fn();
      mockGetItem.mockImplementation(() => 'non serializable stuff');

      const mockWindow = jest.spyOn(window, 'localStorage', 'get');
      mockWindow.mockImplementation(() => ({
        getItem: mockGetItem,
        setItem: mockSetItem
      }));

      expect(mockGetItem).not.toHaveBeenCalled();
      expect(mockSetItem).not.toHaveBeenCalled();
      const starredRepositories = service.toggleStarred(someRepo);
      expect(mockGetItem).toHaveBeenCalledWith(user);
      expect(mockSetItem).toHaveBeenCalledWith(user, JSON.stringify({ starred: [someRepo] }));
      expect(starredRepositories.error).toBeNull();
      expect(starredRepositories.data).toHaveLength(1);
      expect(starredRepositories.data[0]).toBe(someRepo);
      mockWindow.mockRestore();
    });

    test('should delete item from localStorage if entry is already created', () => {
      const someRepo = 123;
      const someNewRepo = 456;
      const mockSetItem = jest.fn();
      const mockGetItem = jest.fn();
      mockGetItem.mockImplementation(() => JSON.stringify({ starred: [someRepo, someNewRepo] }));

      const mockWindow = jest.spyOn(window, 'localStorage', 'get');
      mockWindow.mockImplementation(() => ({
        getItem: mockGetItem,
        setItem: mockSetItem
      }));

      expect(mockGetItem).not.toHaveBeenCalled();
      expect(mockSetItem).not.toHaveBeenCalled();
      const starredRepositories = service.toggleStarred(someNewRepo);
      expect(mockGetItem).toHaveBeenCalledWith(user);
      expect(mockSetItem).toHaveBeenCalledWith(user, JSON.stringify({ starred: [someRepo] }));
      expect(starredRepositories.error).toBeNull();
      expect(starredRepositories.data).toHaveLength(1);
      expect(starredRepositories.data[0]).toBe(someRepo);
      mockWindow.mockRestore();
    });

    test('should return error when it happens', () => {
      const someRepo = 123;
      const someError = new Error('whoops!');
      const mockSetItem = jest.fn();
      const mockGetItem = jest.fn();
      mockGetItem.mockImplementation(() => {
        throw someError;
      });

      const mockWindow = jest.spyOn(window, 'localStorage', 'get');
      mockWindow.mockImplementation(() => ({
        getItem: mockGetItem,
        setItem: mockSetItem
      }));

      expect(mockGetItem).not.toHaveBeenCalled();
      expect(mockSetItem).not.toHaveBeenCalled();
      const starredRepositories = service.toggleStarred(someRepo);
      expect(mockGetItem).toHaveBeenCalledWith(user);
      expect(mockSetItem).not.toHaveBeenCalled();
      expect(starredRepositories.data).toBeNull();
      expect(starredRepositories.error.message).toBe(someError.message);
      mockWindow.mockRestore();
    });
  });

  describe('fetchStarred', () => {
    test('should return empty data array if isServerSide', async () => {
      const expectedResponse = {
        data: [],
        error: null,
      };
      const mockWindow = jest.spyOn(window, 'window', 'get');
      mockWindow.mockImplementationOnce(() => undefined);
      expect(await new StargazerService(user).fetchStarred()).toMatchObject(expectedResponse);
      mockWindow.mockRestore();
    });

    test('should make request to API and return expected object', async () => {
      const someRepo = 123;
      const someOtherRepo = 456;
      const apiResponse = [
        {
          id: someRepo,
          full_name: 'me/my_repo',
        },
        {
          id: someOtherRepo,
          full_name: 'me/my_other_repo',
        },
      ];
      const mockGetItem = jest.fn();
      mockGetItem.mockImplementation(() => JSON.stringify({ starred: [someRepo, someOtherRepo] }));
      const mockWindow = jest.spyOn(window, 'localStorage', 'get');
      mockWindow.mockImplementationOnce(() => ({
        getItem: mockGetItem,
      }));

      nock(baseURL)
        .get('/my-starred/repositories')
        .query({ repositories: `${someRepo},${someOtherRepo}` })
        .reply(200, apiResponse);

      expect(mockGetItem).not.toHaveBeenCalled();
      const starredRepositories = await service.fetchStarred();
      expect(mockGetItem).toHaveBeenCalledWith(user);
      expect(starredRepositories.error).toBeNull();
      expect(starredRepositories.data).toHaveLength(2);
      expect(starredRepositories.data[0]).toMatchObject(apiResponse[0]);
      expect(starredRepositories.data[1]).toMatchObject(apiResponse[1]);
      mockWindow.mockRestore();
    });

    test('should return error from API', async () => {
      const someRepo = 123;
      const mockGetItem = jest.fn();
      mockGetItem.mockImplementation(() => JSON.stringify({ starred: [someRepo] }));
      const mockWindow = jest.spyOn(window, 'localStorage', 'get');
      mockWindow.mockImplementationOnce(() => ({
        getItem: mockGetItem,
      }));

      nock(baseURL)
        .get('/my-starred/repositories')
        .query({ repositories: `${someRepo}` })
        .reply(400);

      expect(mockGetItem).not.toHaveBeenCalled();
      const starredRepositories = await service.fetchStarred();
      expect(mockGetItem).toHaveBeenCalledWith(user);
      expect(starredRepositories.data).toBeNull();
      expect(starredRepositories.error).toMatchObject(new Error('Request failed with status code 400'));
      mockWindow.mockRestore();
    });
  });
});
