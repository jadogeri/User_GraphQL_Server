import { User } from "../src/user/user.entity";
import { UserResolver } from '../src/user/user.resolver';

describe('UserResolver.user() user method', () => {
  // Happy Paths
  describe('Happy paths', () => {
    it('should return a User object when a user with the given id exists', async () => {
      // This test ensures that the method returns the correct user when found.
      const mockUser = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' } as User;
      const findOneBySpy = jest.spyOn(User, 'findOneBy').mockResolvedValueOnce(mockUser);

      const resolver = new UserResolver();
      const result = await resolver.user(1);

      expect(findOneBySpy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toBe(mockUser);

      findOneBySpy.mockRestore();
    });

    it('should call User.findOneBy with the correct id', async () => {
      // This test ensures that the method calls the ORM with the correct argument.
      const mockUser = { id: 42, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' } as User;
      const findOneBySpy = jest.spyOn(User, 'findOneBy').mockResolvedValueOnce(mockUser);

      const resolver = new UserResolver();
      await resolver.user(42);

      expect(findOneBySpy).toHaveBeenCalledWith({ id: 42 });

      findOneBySpy.mockRestore();
    });
  });

  // Edge Cases
  describe('Edge cases', () => {
    it('should return null if no user with the given id exists', async () => {
      // This test ensures that the method returns null when the user is not found.
      const findOneBySpy = jest.spyOn(User, 'findOneBy').mockResolvedValueOnce(null);

      const resolver = new UserResolver();
      const result = await resolver.user(999);

      expect(findOneBySpy).toHaveBeenCalledWith({ id: 999 });
      expect(result).toBeNull();

      findOneBySpy.mockRestore();
    });

    it('should handle the minimum valid id (e.g., 0)', async () => {
      // This test ensures that the method works with the minimum possible id value.
      const mockUser = { id: 0, firstName: 'Zero', lastName: 'User', email: 'zero@example.com' } as User;
      const findOneBySpy = jest.spyOn(User, 'findOneBy').mockResolvedValueOnce(mockUser);

      const resolver = new UserResolver();
      const result = await resolver.user(0);

      expect(findOneBySpy).toHaveBeenCalledWith({ id: 0 });
      expect(result).toBe(mockUser);

      findOneBySpy.mockRestore();
    });

    it('should propagate errors thrown by User.findOneBy', async () => {
      // This test ensures that if the ORM throws, the error is propagated.
      const error = new Error('Database error');
      const findOneBySpy = jest.spyOn(User, 'findOneBy').mockRejectedValueOnce(error);

      const resolver = new UserResolver();

      await expect(resolver.user(1)).rejects.toThrow('Database error');

      findOneBySpy.mockRestore();
    });

    it('should handle very large id values', async () => {
      // This test ensures that the method works with very large id values.
      const largeId = Number.MAX_SAFE_INTEGER;
      const mockUser = { id: largeId, firstName: 'Big', lastName: 'User', email: 'big@example.com' } as User;
      const findOneBySpy = jest.spyOn(User, 'findOneBy').mockResolvedValueOnce(mockUser);

      const resolver = new UserResolver();
      const result = await resolver.user(largeId);

      expect(findOneBySpy).toHaveBeenCalledWith({ id: largeId });
      expect(result).toBe(mockUser);

      findOneBySpy.mockRestore();
    });

    it('should handle negative id values', async () => {
      // This test ensures that the method works with negative id values.
      const negativeId = -1;
      const mockUser = { id: negativeId, firstName: 'Negative', lastName: 'User', email: 'neg@example.com' } as User;
      const findOneBySpy = jest.spyOn(User, 'findOneBy').mockResolvedValueOnce(mockUser);

      const resolver = new UserResolver();
      const result = await resolver.user(negativeId);

      expect(findOneBySpy).toHaveBeenCalledWith({ id: negativeId });
      expect(result).toBe(mockUser);

      findOneBySpy.mockRestore();
    });
  });
});