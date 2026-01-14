import { User } from "../user.entity";
import { UserResolver } from '../user.resolver';


// Mock User class
class MockUser {
  public firstName: string = "";
  public lastName: string = "";
  public email: string = "";
  public password: string = "";
  public save = jest.fn().mockResolvedValue(this as any);

  constructor(data: Partial<MockUser>) {
    Object.assign(this, data);
  }

  static create = jest.fn();
}

describe('UserResolver.createUser() createUser method', () => {
  let userResolver: UserResolver;

  beforeEach(() => {
    userResolver = new UserResolver();
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  // Happy Paths
  describe("Happy paths", () => {
    it("should create and save a user with valid input", async () => {
      // This test ensures that a user is created and saved with valid input.
      const mockUser = new MockUser({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "securePassword123",
      });
      // Mock static create to return our mockUser
      jest.mocked(MockUser.create).mockReturnValue(mockUser as any);
      // Patch User.create to our mock
      (User as any).create = MockUser.create;

      // Patch save to resolve to mockUser
      mockUser.save = jest.fn().mockResolvedValue(mockUser as any);

      const result = await userResolver.createUser(
        "John",
        "Doe",
        "john.doe@example.com",
        "securePassword123"
      );

      expect(MockUser.create).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "securePassword123",
      });
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toBe(mockUser as any);
    });

    it("should handle different valid input values", async () => {
      // This test ensures that the method works with different valid input values.
      const mockUser = new MockUser({
        firstName: "Alice",
        lastName: "Smith",
        email: "alice.smith@example.com",
        password: "anotherPassword456",
      });
      jest.mocked(MockUser.create).mockReturnValue(mockUser as any);
      (User as any).create = MockUser.create;
      mockUser.save = jest.fn().mockResolvedValue(mockUser as any);

      const result = await userResolver.createUser(
        "Alice",
        "Smith",
        "alice.smith@example.com",
        "anotherPassword456"
      );

      expect(MockUser.create).toHaveBeenCalledWith({
        firstName: "Alice",
        lastName: "Smith",
        email: "alice.smith@example.com",
        password: "anotherPassword456",
      });
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toBe(mockUser as any);
    });
  });

  // Edge Cases
  describe("Edge cases", () => {
    it("should handle empty strings for all fields", async () => {
      // This test checks if the method can handle empty strings as input.
      const mockUser = new MockUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      jest.mocked(MockUser.create).mockReturnValue(mockUser as any);
      (User as any).create = MockUser.create;
      mockUser.save = jest.fn().mockResolvedValue(mockUser as any);

      const result = await userResolver.createUser("", "", "", "");

      expect(MockUser.create).toHaveBeenCalledWith({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toBe(mockUser as any);
    });

    it("should handle very long strings for all fields", async () => {
      // This test checks if the method can handle very long strings as input.
      const longString = "a".repeat(1000);
      const mockUser = new MockUser({
        firstName: longString,
        lastName: longString,
        email: `${longString}@example.com`,
        password: longString,
      });
      jest.mocked(MockUser.create).mockReturnValue(mockUser as any);
      (User as any).create = MockUser.create;
      mockUser.save = jest.fn().mockResolvedValue(mockUser as any);

      const result = await userResolver.createUser(
        longString,
        longString,
        `${longString}@example.com`,
        longString
      );

      expect(MockUser.create).toHaveBeenCalledWith({
        firstName: longString,
        lastName: longString,
        email: `${longString}@example.com`,
        password: longString,
      });
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toBe(mockUser as any);
    });

    it("should propagate errors thrown by User.create", async () => {
      // This test ensures that if User.create throws, the error is propagated.
      const error = new Error("Create failed");
      jest.mocked(MockUser.create).mockImplementation(() => {
        throw error;
      });
      (User as any).create = MockUser.create;

      await expect(
        userResolver.createUser("Jane", "Doe", "jane.doe@example.com", "pass")
      ).rejects.toThrow("Create failed");
      expect(MockUser.create).toHaveBeenCalled();
    });

    it("should propagate errors thrown by user.save", async () => {
      // This test ensures that if save throws, the error is propagated.
      const mockUser = new MockUser({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        password: "pass",
      });
      jest.mocked(MockUser.create).mockReturnValue(mockUser as any);
      (User as any).create = MockUser.create;
      const error = new Error("Save failed");
      mockUser.save = jest.fn().mockRejectedValue(error as never);

      await expect(
        userResolver.createUser("Jane", "Doe", "jane.doe@example.com", "pass")
      ).rejects.toThrow("Save failed");
      expect(MockUser.create).toHaveBeenCalled();
      expect(mockUser.save).toHaveBeenCalled();
    });

    it("should handle special characters in input", async () => {
      // This test checks if the method can handle special characters in input.
      const specialFirstName = "Jöhn";
      const specialLastName = "Dœ";
      const specialEmail = "jöhn.dœ+test@example.com";
      const specialPassword = "pässwørd!@#";
      const mockUser = new MockUser({
        firstName: specialFirstName,
        lastName: specialLastName,
        email: specialEmail,
        password: specialPassword,
      });
      jest.mocked(MockUser.create).mockReturnValue(mockUser as any);
      (User as any).create = MockUser.create;
      mockUser.save = jest.fn().mockResolvedValue(mockUser as any);

      const result = await userResolver.createUser(
        specialFirstName,
        specialLastName,
        specialEmail,
        specialPassword
      );

      expect(MockUser.create).toHaveBeenCalledWith({
        firstName: specialFirstName,
        lastName: specialLastName,
        email: specialEmail,
        password: specialPassword,
      });
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toBe(mockUser as any);
    });
  });
});