const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api", () => {
  test("200: JSON object with msg key", async () => {
    const { body } = await request(app).get("/api").expect(200);
    expect(body).toHaveProperty("msg", "Connection Success");
  });
  test("404: Invalid URL returns 404 error and message", async () => {
    const res = await request(app).get("/api/thropics").expect(404);
    expect(res.body.msg).toBe("Invalid URL");
  });
});

describe("GET /api/topics", () => {
  test("200: Returns all topics available", async () => {
    const { body } = await request(app).get("/api/topics").expect(200);
    expect(body.topics.length).toBeGreaterThan(1);
    body.topics.forEach((topic) => {
      expect(topic).toMatchObject({
        slug: expect.any(String),
        description: expect.any(String),
      });
    });
  });
});

describe.only("GET /api/articles/:article_id", () => {
  test("200: Responds with an article object, with comment count added", async () => {
    const article_id = 9;
    const { body } = await request(app)
      .get(`/api/articles/${article_id}`)
      .expect(200);
    expect(body.article.length).toBeGreaterThan(0);
    body.article.forEach((article) => {
      expect(article).toMatchObject({
        author: expect.any(String),
        title: expect.any(String),
        article_id: expect.any(Number),
        body: expect.any(String),
        topic: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        comment_count: expect.any(Number),
      });
    });
  });
});

// test("200: Sorts all treasures by age by default", () => {
//   return request(app)
//     .get("/api/treasures")
//     .expect(200)
//     .then((res) => {
//       expect(res.body.treasures).toBeSortedBy("age");
//     });
// });
// test("200: Sorts treasures by query passed", () => {
//   return request(app)
//     .get("/api/treasures?sort_by=cost_at_auction")
//     .expect(200)
//     .then((res) => {
//       // console.log(res.body.treasures)
//       expect(res.body.treasures).toBeSortedBy("cost_at_auction", {
//         coerce: true,
//       });
//     });
// });
// test("200: Sorts treasures by user order passed - age by default", () => {
//   return request(app)
//     .get("/api/treasures?order=desc")
//     .expect(200)
//     .then((res) => {
//       // console.log(res.body.treasures)
//       expect(res.body.treasures).toBeSortedBy("age", { descending: true });
//     });
// });
// test.only("200: Responds with gold treasures only when passed colour query of gold", () => {
//   return request(app)
//   .get('/api/treasures?colour=gold')
//   .expect(200)
//   .then((res) => {
//     res.body.treasures.forEach((treasure) => {
//       expect(treasure.colour).toBe('gold');
//     })
//   })
// });
