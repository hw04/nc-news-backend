const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/");
const endPoint = require("../endpoints.json");
beforeEach(() => seed(testData));

afterAll(() => {
  db.end();
});

describe("Get topics", () => {
  test("App request should return an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((result) => {
        result.body.forEach((topic) => {
          expect(topic).toHaveProperty("slug", expect.any(String));
          expect(topic).toHaveProperty("description", expect.any(String));
          expect(result.body).toHaveLength(3);
        });
      });
  });
});

describe("Get API", () => {
  test("API request should return the object from endpoints.json", () => {
    return request(app)
      .get("/api/")
      .expect(200)
      .then((result) => {
        expect(endPoint).toEqual(result.body);
        /*expect(result.body).toHaveProperty("GET /api", expect.any(Object));
        expect(result.body).toHaveProperty("GET /api/topics", expect.any(Object));
        expect(result.body).toHaveProperty("GET /api/articles", expect.any(Object));*/
      });
  });
});

describe("Get API", () => {
  test("API request should return the object from endpoints.json", () => {
    return request(app)
      .get("/api/")
      .expect(200)
      .then((result) => {
        expect(endPoint).toEqual(result.body);
      });
  });
});

describe("Get article by ID", () => {
  test("A request for a particular id should return an article object with the correct properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((result) => {
        expect(result.body).toHaveProperty("article_id", 1);
        expect(result.body).toHaveProperty(
          "title",
          "Living in the shadow of a great man"
        );
      });
  });
  test("A request for a particular id should return an article object with the correct properties", () => {
    return request(app)
      .get("/api/articles/7")
      .expect(200)
      .then((result) => {
        expect(result.body).toHaveProperty("article_id", 7);
        expect(result.body).toHaveProperty("title", "Z");
      });
  });
});
