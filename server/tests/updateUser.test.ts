import { User } from "../src/user/user.entity";
import { UserResolver } from '../src/user/user.resolver';

// user.resolver.updateUser.spec.ts
// Mock for SaveOptions (not used directly, but per instructions)
interface MockSaveOptions {
  // Add properties/methods as needed for simulation
  save: jest.Mock<any, any>;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  id?: number;
}

// Helper to create a mock User entity
class MockUser implements MockSaveOptions {
  public id: number = 1;
  public firstName: string = 'John';
  public lastName: string = 'Doe';
  public email: string = 'john@example.com';
  public password: string = 'password123';
  public save = jest.fn().mockResolvedValue(this as any);
}

describe('UserResolver.updateUser() updateUser method', () => {
  // Happy Paths
  describe('Happy paths', () => {
    it('should update all fields when all arguments are provided', async () => {
      // This test ensures that all updatable fields are set and saved correctly.
      const mockUser = new MockUser();
      jest.spyOn(User, 'findOneBy').mockResolvedValue(mockUser as any as never);

      const resolver = new UserResolver();
      const updatedUser = await resolver.updateUser(
        1,
        'Jane',
        'Smith',
        'jane@example.com',
        'newpassword'
      );

      expect(User.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockUser.firstName).toBe('Jane');
      expect(mockUser.lastName).toBe('Smith');
      expect(mockUser.email).toBe('jane@example.com');
      expect(mockUser.password).toBe('newpassword');
      expect(mockUser.save).toHaveBeenCalled();
      expect(updatedUser).toBe(mockUser);
    });

    it('should update only firstName when only firstName is provided', async () => {
      // This test checks that only the firstName is updated and others remain unchanged.
      const mockUser = new MockUser();
      jest.spyOn(User, 'findOneBy').mockResolvedValue(mockUser as any as never);

      const resolver = new UserResolver();
      const updatedUser = await resolver.updateUser(
        1,
        'Alice',
        undefined,
        undefined,
        undefined
      );

      expect(mockUser.firstName).toBe('Alice');
      expect(mockUser.lastName).toBe('Doe');
      expect(mockUser.email).toBe('john@example.com');
      expect(mockUser.password).toBe('password123');
      expect(mockUser.save).toHaveBeenCalled();
      expect(updatedUser).toBe(mockUser);
    });

    it('should update only lastName when only lastName is provided', async () => {
      // This test checks that only the lastName is updated.
      const mockUser = new MockUser();
      jest.spyOn(User, 'findOneBy').mockResolvedValue(mockUser as any as never);

      const resolver = new UserResolver();
      const updatedUser = await resolver.updateUser(
        1,
        undefined,
        'Williams',
        undefined,
        undefined
      );

      expect(mockUser.firstName).toBe('John');
      expect(mockUser.lastName).toBe('Williams');
      expect(mockUser.email).toBe('john@example.com');
      expect(mockUser.password).toBe('password123');
      expect(mockUser.save).toHaveBeenCalled();
      expect(updatedUser).toBe(mockUser);
    });

    it('should update only email when only email is provided', async () => {
      // This test checks that only the email is updated.
      const mockUser = new MockUser();
      jest.spyOn(User, 'findOneBy').mockResolvedValue(mockUser as any as never);

      const resolver = new UserResolver();
      const updatedUser = await resolver.updateUser(
        1,
        undefined,
        undefined,
        'alice@example.com',
        undefined
      );

      expect(mockUser.firstName).toBe('John');
      expect(mockUser.lastName).toBe('Doe');
      expect(mockUser.email).toBe('alice@example.com');
      expect(mockUser.password).toBe('password123');
      expect(mockUser.save).toHaveBeenCalled();
      expect(updatedUser).toBe(mockUser);
    });

    it('should update only password when only password is provided', async () => {
      // This test checks that only the password is updated.
      const mockUser = new MockUser();
      jest.spyOn(User, 'findOneBy').mockResolvedValue(mockUser as any as never);

      const resolver = new UserResolver();
      const updatedUser = await resolver.updateUser(
        1,
        undefined,
        undefined,
        undefined,
        'supersecret'
      );

      expect(mockUser.firstName).toBe('John');
      expect(mockUser.lastName).toBe('Doe');
      expect(mockUser.email).toBe('john@example.com');
      expect(mockUser.password).toBe('supersecret');
      expect(mockUser.save).toHaveBeenCalled();
      expect(updatedUser).toBe(mockUser);
    });

    it('should update multiple fields when some arguments are provided', async () => {
      // This test checks that multiple fields are updated when provided.
      const mockUser = new MockUser();
      jest.spyOn(User, 'findOneBy').mockResolvedValue(mockUser as any as never);

      const resolver = new UserResolver();
      const updatedUser = await resolver.updateUser(
        1,
        'Bob',
        undefined,
        'bob@example.com',
        undefined
      );

      expect(mockUser.firstName).toBe('Bob');
      expect(mockUser.lastName).toBe('Doe');
      expect(mockUser.email).toBe('bob@example.com');
      expect(mockUser.password).toBe('password123');
      expect(mockUser.save).toHaveBeenCalled();
      expect(updatedUser).toBe(mockUser);
    });

    it('should call save and return the updated user', async () => {
      // This test ensures that the save method is called and its result is returned.
      const mockUser = new MockUser();
      const saveResult = { ...mockUser, firstName: 'Updated' };
      mockUser.save = jest.fn().mockResolvedValue(saveResult as any);
      jest.spyOn(User, 'findOneBy').mockResolvedValue(mockUser as any as never);

      const resolver = new UserResolver();
      const updatedUser = await resolver.updateUser(
        1,
        'Updated',
        undefined,
        undefined,
        undefined
      );

      expect(mockUser.save).toHaveBeenCalled();
      expect(updatedUser).toBe(saveResult);
    });
  });

  // Edge Cases
  describe('Edge cases', () => {
    it('should return null if user is not found', async () => {
      // This test checks that null is returned when no user is found for the given id.
      jest.spyOn(User, 'findOneBy').mockResolvedValue(null as any as never);

      const resolver = new UserResolver();
      const result = await resolver.updateUser(
        999,
        'Ghost',
        'User',
        'ghost@example.com',
        'nopassword'
      );

      expect(User.findOneBy).toHaveBeenCalledWith({ id: 999 });
      expect(result).toBeNull();
    });

    it('should not update any fields if no updatable arguments are provided', async () => {
      // This test checks that if no updatable fields are provided, the user is still saved but unchanged.
      const mockUser = new MockUser();
      jest.spyOn(User, 'findOneBy').mockResolvedValue(mockUser as any as never);

      const resolver = new UserResolver();
      const updatedUser = await resolver.updateUser(
        1,
        undefined,
        undefined,
        undefined,
        undefined
      );

      expect(mockUser.firstName).toBe('John');
      expect(mockUser.lastName).toBe('Doe');
      expect(mockUser.email).toBe('john@example.com');
      expect(mockUser.password).toBe('password123');
      expect(mockUser.save).toHaveBeenCalled();
      expect(updatedUser).toBe(mockUser);
    });

    it('should propagate errors thrown by save', async () => {
      // This test checks that if save throws, the error is propagated.
      const mockUser = new MockUser();
      const error = new Error('Save failed');
      mockUser.save = jest.fn().mockRejectedValue(error as never);
      jest.spyOn(User, 'findOneBy').mockResolvedValue(mockUser as any as never);

      const resolver = new UserResolver();

      await expect(
        resolver.updateUser(1, 'Error', undefined, undefined, undefined)
      ).rejects.toThrow('Save failed');
      expect(mockUser.save).toHaveBeenCalled();
    });

    it('should propagate errors thrown by findOneBy', async () => {
      // This test checks that if findOneBy throws, the error is propagated.
      const error = new Error('DB error');
      jest.spyOn(User, 'findOneBy').mockRejectedValue(error as never);

      const resolver = new UserResolver();

      await expect(
        resolver.updateUser(1, 'Error', undefined, undefined, undefined)
      ).rejects.toThrow('DB error');
    });
  });
});