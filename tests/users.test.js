const request = require("supertest");
const app = require("../src/app");
const usersRoute = require("../src/routes/users");

const validUser = {
  name: "Charlie",
  email: "charlie@example.com",
  age: 28
};

describe("User Management API", () => {
  beforeEach(() => {
    usersRoute.resetUsers();
  });

  test("GET /users returns all users", async () => {
    const response = await request(app).get("/users");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });

  test("POST /users requires API key", async () => {
    const response = await request(app).post("/users").send(validUser);

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Unauthorized");
  });

  test("POST /users creates a user with valid data", async () => {
    const response = await request(app)
      .post("/users")
      .set("x-api-key", "coursera-secret-key")
      .send(validUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("Charlie");
    expect(response.body.email).toBe("charlie@example.com");
  });

  test("POST /users rejects invalid payload", async () => {
    const invalidUser = { name: "A", email: "invalid-email", age: 999 };

    const response = await request(app)
      .post("/users")
      .set("x-api-key", "coursera-secret-key")
      .send(invalidUser);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("ValidationError");
  });

  test("PUT /users/:id updates a user", async () => {
    const updatedUser = {
      name: "Alice Updated",
      email: "alice.updated@example.com",
      age: 25
    };

    const response = await request(app)
      .put("/users/1")
      .set("x-api-key", "coursera-secret-key")
      .send(updatedUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Alice Updated");
  });

  test("DELETE /users/:id deletes a user", async () => {
    const response = await request(app)
      .delete("/users/1")
      .set("x-api-key", "coursera-secret-key");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User deleted successfully");
  });
});
