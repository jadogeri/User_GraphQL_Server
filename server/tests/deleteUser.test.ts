import { User } from "../src/user/user.entity";
import { UserResolver } from '../src/user/user.resolver';

describe('UserResolver.deleteUser() deleteUser method', () => {
  // Mock User.delete
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy paths', () => {
    it('should return true when a user is successfully deleted (affected > 0)', async () => {
      // This test ensures that deleteUser returns true when User.delete reports a successful deletion.
      const mockDelete = jest.spyOn(User, 'delete').mockResolvedValue({ affected: 1 } as any);

      const resolver = new UserResolver();
      const result = await resolver.deleteUser(123);

      expect(mockDelete).toHaveBeenCalledWith(123);
      expect(result).toBe(true);
    });

    it('should call User.delete with the correct id', async () => {
      // This test ensures that the correct id is passed to User.delete.
      const mockDelete = jest.spyOn(User, 'delete').mockResolvedValue({ affected: 2 } as any);

      const resolver = new UserResolver();
      await resolver.deleteUser(456);

      expect(mockDelete).toHaveBeenCalledWith(456);
    });
  });

  describe('Edge cases', () => {
    it('should return false when no user is deleted (affected = 0)', async () => {
      // This test ensures that deleteUser returns false when User.delete reports no rows affected.
      jest.spyOn(User, 'delete').mockResolvedValue({ affected: 0 } as any);

      const resolver = new UserResolver();
      const result = await resolver.deleteUser(789);

      expect(result).toBe(false);
    });

    it('should return false when affected is undefined', async () => {
      // This test ensures that deleteUser returns false when User.delete returns an object with undefined affected.
      jest.spyOn(User, 'delete').mockResolvedValue({} as any);

      const resolver = new UserResolver();
      const result = await resolver.deleteUser(101);

      expect(result).toBe(false);
    });

    it('should propagate errors thrown by User.delete', async () => {
      // This test ensures that if User.delete throws, the error is propagated.
      const error = new Error('Database error');
      jest.spyOn(User, 'delete').mockRejectedValue(error);

      const resolver = new UserResolver();

      await expect(resolver.deleteUser(202)).rejects.toThrow('Database error');
    });

    it('should handle large id values correctly', async () => {
      // This test ensures that very large id values are handled and passed to User.delete.
      const largeId = Number.MAX_SAFE_INTEGER;
      const mockDelete = jest.spyOn(User, 'delete').mockResolvedValue({ affected: 1 } as any);

      const resolver = new UserResolver();
      const result = await resolver.deleteUser(largeId);

      expect(mockDelete).toHaveBeenCalledWith(largeId);
      expect(result).toBe(true);
    });

    it('should handle id = 0 correctly', async () => {
      // This test ensures that id=0 is handled and passed to User.delete.
      const mockDelete = jest.spyOn(User, 'delete').mockResolvedValue({ affected: 0 } as any);

      const resolver = new UserResolver();
      const result = await resolver.deleteUser(0);

      expect(mockDelete).toHaveBeenCalledWith(0);
      expect(result).toBe(false);
    });

    it('should handle negative id values correctly', async () => {
      // This test ensures that negative id values are handled and passed to User.delete.
      const mockDelete = jest.spyOn(User, 'delete').mockResolvedValue({ affected: 0 } as any);

      const resolver = new UserResolver();
      const result = await resolver.deleteUser(-1);

      expect(mockDelete).toHaveBeenCalledWith(-1);
      expect(result).toBe(false);
    });
  });
});