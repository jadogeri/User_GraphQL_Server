import { User } from "../src/user/user.entity";
import { UserResolver } from '../src/user/user.resolver';

// server/src/user/user.resolver.spec.ts
describe('UserResolver.users() users method', () => {
  // Happy Paths
  describe('Happy paths', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return an array of users when users exist', async () => {
      // This test aims to verify that the users method returns an array of users when User.find() resolves with user objects.
      const mockUsers = [
        { id: 1, name: 'Alice', email: 'alice@example.com' } as unknown as User,
        { id: 2, name: 'Bob', email: 'bob@example.com' } as unknown as User,
      ];
      jest.spyOn(User, 'find').mockResolvedValueOnce(mockUsers);

      const resolver = new UserResolver();
      const result = await resolver.users();

      expect(User.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUsers);
    });

    it('should return an empty array when no users exist', async () => {
      // This test aims to verify that the users method returns an empty array when User.find() resolves with an empty array.
      jest.spyOn(User, 'find').mockResolvedValueOnce([]);

      const resolver = new UserResolver();
      const result = await resolver.users();

      expect(User.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
  });

  // Edge Cases
  describe('Edge cases', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should propagate errors thrown by User.find()', async () => {
      // This test aims to verify that the users method correctly propagates errors thrown by User.find().
      const error = new Error('Database connection failed');
      jest.spyOn(User, 'find').mockRejectedValueOnce(error);

      const resolver = new UserResolver();

      await expect(resolver.users()).rejects.toThrow('Database connection failed');
      expect(User.find).toHaveBeenCalledTimes(1);
    });

    it('should return users with minimal properties if User.find returns such objects', async () => {
      // This test aims to verify that the users method can handle user objects with only minimal properties.
      const mockUsers = [
        { id: 1 } as User,
        { id: 2 } as User,
      ];
      jest.spyOn(User, 'find').mockResolvedValueOnce(mockUsers);

      const resolver = new UserResolver();
      const result = await resolver.users();

      expect(User.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUsers);
    });
  });
});