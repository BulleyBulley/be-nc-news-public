const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
require('jest-sorted')
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api", () => {
  test("200: JSON object with msg key", async () => {
    const { body } = await request(app)
    .get("/api")
    .expect(200);
    expect(body).toHaveProperty("msg", "Connection Success");
  });
  test("404: Invalid URL returns 404 error and message", async () => {
    const res = await request(app)
    .get("/api/thropics")
    .expect(404);
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

describe("GET /api/articles/:article_id", () => {
  test("200: Responds with an article object, with comment_count added", async () => {
    const article_id = 1;
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
        comment_count: expect.any(String),
      });
    });
  });
  test("404: valid but non-existent article_id", async () => {
    const { body } = await request(app)
    .get("/api/articles/99999")
    .expect(404);
    expect(body.msg).toBe("Article Not Found");
  });
  test("400: bad article_id", async () => {
    const { body } = await request(app)
      .get("/api/articles/whatabadarticleyouare")
      .expect(400);
    expect(body.msg).toBe("Bad Request");
  });
});

  describe('PATCH /api/articles/:article_id', () => {
    test('200: Accepts update object and responds with updated article', async () => {
      const article_id = 4;
      const articleUpdate =  { inc_votes: 25 }
      const { body } = await request(app)
      .patch(`/api/articles/${article_id}`)
      .send(articleUpdate)
      .expect(200)
      expect(body.article).toMatchObject({
        author: expect.any(String),
        title: expect.any(String),
        article_id: expect.any(Number),
        body: expect.any(String),
        topic: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        //comment_count: expect.any(String),
      });
    });
    test('Vote count should increase by 25 to 125 for article_id 1', async () => {
      const article_id = 1;
      const articleUpdate =  { inc_votes: 25 }
      const { body } = await request(app)
      .patch(`/api/articles/${article_id}`)
      .send(articleUpdate)
      expect(body.article.votes).toEqual(125)
    });
    test("404: valid but non-existent article_id", async () => {
      const article_id = 9999;
      const articleUpdate =  { inc_votes: 25 }
      const { body } = await request(app)
      .patch(`/api/articles/${article_id}`)
      .send(articleUpdate)
      .expect(404);
      expect(body.msg).toBe("Article Not Found");
    });
    test("400: bad article_id", async () => {
        const articleUpdate =  { inc_votes: 25 }
        const { body } = await request(app)
        .patch("/api/articles/whatabadarticleyouare")
        .send(articleUpdate)
        .expect(400);
      expect(body.msg).toBe("Bad Request");
    });
    test("400: no inc_votes on request body", async () => {
      const article_id = 1;
      const articleUpdate =  { inc_nothing : 5 }
      const { body } = await request(app)
      .patch(`/api/articles/${article_id}`)
      .send(articleUpdate)
      .expect(400);
    expect(body.msg).toBe("Bad Request");
  });
  test("400: Other property on request body", async () => {
    const article_id = 1;
    const articleUpdate =  { inc_votes : 5, favourite_bucket : 'medium bucket' }
    const { body } = await request(app)
    .patch(`/api/articles/${article_id}`)
    .send(articleUpdate)
    .expect(400);
  expect(body.msg).toBe("Bad Request");
});
  });


  describe("GET /api/articles", () => {
    test("200: Responds with an array of articles, with comment count added", async () => {
      const { body } = await request(app)
        .get(`/api/articles`)
        .expect(200);
      expect(body.allArticles.length).toBe(12);
      body.allArticles.forEach((article) => {
        expect(article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(String),
        });
      });
    })
    test('200: Sorts all articles by date by default' , async () => {
      const { body } = await request(app)
      .get(`/api/articles`)
      .expect(200)
      expect(body.allArticles).toBeSorted({key : 'created_at', descending: true} )
    })
    test('200: Sorts all articles by query passed' , async () => {
      const { body } = await request(app)
      .get(`/api/articles?sort_by=title`)
      .expect(200)
      expect(body.allArticles).toBeSorted({key : 'title', descending: true} )
    })
    test('200: Sorts all articles ascending by query passed' , async () => {
      const { body } = await request(app)
      .get(`/api/articles?sort_by=author&order=asc`)
      .expect(200)
      expect(body.allArticles).toBeSorted({key : 'author', descending: false })
    })
    test('200: Shows only topics by query passed' , async () => {
      const { body } = await request(app)
      .get(`/api/articles?topic=cats`)
      .expect(200)
      body.allArticles.forEach((article) => {
        expect(article.topic).toEqual('cats');
    })

  });

  })



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
