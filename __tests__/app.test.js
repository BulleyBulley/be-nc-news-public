const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
require("jest-sorted");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api", () => {
  test("200: JSON object with list of endpoints", async () => {
    const { body } = await request(app).get("/api")
    .expect(200);
    expect(Object.keys(body).length > 1)
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
    const { body } = await request(app).get("/api/articles/99999").expect(404);
    expect(body.msg).toBe("Article Not Found");
  });
  test("400: bad article_id", async () => {
    const { body } = await request(app)
      .get("/api/articles/whatabadarticleyouare")
      .expect(400);
    expect(body.msg).toBe("Bad Request");
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: Accepts update object and responds with updated article", async () => {
    const article_id = 4;
    const articleUpdate = { inc_votes: 25 };
    const { body } = await request(app)
      .patch(`/api/articles/${article_id}`)
      .send(articleUpdate)
      .expect(200);
    expect(body.article).toMatchObject([{
      author: expect.any(String),
      title: expect.any(String),
      article_id: expect.any(Number),
      body: expect.any(String),
      topic: expect.any(String),
      created_at: expect.any(String),
      votes: expect.any(Number),
    }]);
  });
  test("Vote count should increase by 25 to 125 for article_id 1", async () => {
    const article_id = 1;
    const articleUpdate = { inc_votes: 25 };
    const { body } = await request(app)
      .patch(`/api/articles/${article_id}`)
      .send(articleUpdate);
    expect(body.article[0].votes).toEqual(125);
  });
  test("404: valid but non-existent article_id", async () => {
    const article_id = 9999;
    const articleUpdate = { inc_votes: 25 };
    const { body } = await request(app)
      .patch(`/api/articles/${article_id}`)
      .send(articleUpdate)
      .expect(404);
    expect(body.msg).toBe("Article Not Found");
  });
  test("400: bad article_id", async () => {
    const articleUpdate = { inc_votes: 25 };
    const { body } = await request(app)
      .patch("/api/articles/whatabadarticleyouare")
      .send(articleUpdate)
      .expect(400);
    expect(body.msg).toBe("Bad Request");
  });
  test("400: no inc_votes on request body", async () => {
    const article_id = 1;
    const articleUpdate = { inc_nothing: 5 };
    const { body } = await request(app)
      .patch(`/api/articles/${article_id}`)
      .send(articleUpdate)
      .expect(400);
    expect(body.msg).toBe("Bad Request");
  });
  test("400: Other property on request body", async () => {
    const article_id = 1;
    const articleUpdate = { inc_votes: 5, favourite_bucket: "medium bucket" };
    const { body } = await request(app)
      .patch(`/api/articles/${article_id}`)
      .send(articleUpdate)
      .expect(400);
    expect(body.msg).toBe("Bad Request");
  });
});

describe.only("GET /api/articles", () => {
  test("200: Responds with an array of articles, with comment count added", async () => {
    const { body } = await request(app)
    .get(`/api/articles`)
    .expect(200);
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
  });
  test("200: Sorts all articles by date by default", async () => {
    const { body } = await request(app).get(`/api/articles`).expect(200);
    expect(body.allArticles).toBeSorted({
      key: "created_at",
      descending: true,
    });
  });
  test("200: Sorts all articles by title", async () => {
    const { body } = await request(app)
      .get(`/api/articles?sort_by=title`)
      .expect(200);
    expect(body.allArticles).toBeSorted({ key: "title", descending: true });
  });
  test("200: Sorts all articles ascending by author", async () => {
    const { body } = await request(app)
      .get(`/api/articles?sort_by=author&order=asc`)
      .expect(200);
    expect(body.allArticles).toBeSorted({ key: "author", descending: false });
  });
  test("200: Sorts all articles ascending by article_id", async () => {
    const { body } = await request(app)
      .get(`/api/articles?sort_by=article_id&order=asc`)
      .expect(200);
    expect(body.allArticles).toBeSorted({ key: "article_id", descending: false });
  });
  test("200: Shows only topics by query passed", async () => {
    const { body } = await request(app)
      .get(`/api/articles?topic=cats`)
      .expect(200);
    body.allArticles.forEach((article) => {
      expect(article.topic).toEqual("cats");
    });
  });
  test("400: column does not exist", async () => {
    const { body } = await request(app)
      .get(`/api/articles?sort_by=catswholikestayingawakeallday`)
      .expect(400);
    expect(body.msg).toBe("Bad Request");
  });
  test("400: order is not asc or desc", async () => {
  const { body } = await request(app)
    .get(`/api/articles?order=wobbly`)
    .expect(400);
  expect(body.msg).toBe("Bad Request");
  });
  test("404: topic not in database", async () => {
  const { body } = await request(app)
    .get(`/api/articles?topic=badgerpruning`)
    .expect(404);
  expect(body.msg).toBe("Not Found");
  });
  test('200: Responds with the first 10 articles by default ', async () => {
    const { body } = await request(app)
    .get(`/api/articles`)
    .expect(200);
    expect(body.allArticles).toHaveLength(10)
  });
  test.only('200: responds to changes to page query', async () => {
    const { body } = await request(app)
    .get(`/api/articles?p=2`)
    .expect(200);
    expect(body.allArticles).toHaveLength(2)
  })


});

describe('GET /api/articles/:article_id/comments', () => {
  test("200: Responds with an array of comments for given article", async () => {
    const article_id = 1
    const { body } = await request(app)
    .get(`/api/articles/${article_id}/comments`)
    .expect(200);
    body.commentsByArticleId.forEach((comment) => {
    expect(comment).toMatchObject({
      comment_id: expect.any(Number),
      votes: expect.any(Number),
      body: expect.any(String),
      created_at: expect.any(String),
    });
  })
  });
  test("404: Not Found for empty article", async () => {
    const article_id = 999999
    const { body } = await request(app)
    .get(`/api/articles/${article_id}/comments`)
    .expect(404);
    expect(body.msg).toBe("Not Found");
  })
  test("400: Bad request for invalid article_id", async () => {
    const article_id = 'splatoon'
    const { body } = await request(app)
    .get(`/api/articles/${article_id}/comments`)
    .expect(400);
    expect(body.msg).toBe("Bad Request");
  })
});

describe('POST /api/articles/:article_id/comments', () => {
  test('201: Request body accepts object, responds with posted comment', async () => {
    const article_id = 1
    const newComment = {
      username: 'butter_bridge',
      body: "Right here, is a new comment..........."
    }
    const { body } = await request(app)
    .post(`/api/articles/${article_id}/comments`)
    .send(newComment)
    .expect(201);
      expect(body.postedComment).toMatchObject([{
      comment_id: expect.any(Number),
      article_id: expect.any(Number),
      votes: expect.any(Number),
      body: expect.any(String),
      created_at: expect.any(String),
    }]);
  });
  
  test('400: Bad Request for invalid id', async () => {
    const newComment = {
      username: 'butter_bridge',
      body: "Right here, is a new comment..........."
    }
    const { body } = await request(app)
    .post(`/api/articles/*&hg/comments`)
    .send(newComment)
    .expect(400);
    expect(body.msg).toBe("Bad Request");
  });
});

describe('DELETE /api/comments/:comment_id', () => {
  test('204: Deletes given comment by comment_id', async () => {
    const comment_id = 1
    const { body } = await request(app)
    .delete(`/api/comments/${comment_id}`)
    .expect(204);
    
  });
  test('400: Bad Request for invalid id', async () => {
      const { body } = await request(app)
    .delete(`/api/comments/$hg`)
    .expect(400);
    expect(body.msg).toBe("Bad Request");
});
test('404: Not Found for non existent comment_id', async () => {
  const comment_id = 9999999
  const { body } = await request(app)
.delete(`/api/comments/${comment_id}`)
.expect(404);
expect(body.msg).toBe("Not Found");
});
})

describe('GET /api/users', () => {
  test('200: Responds with an array of objects of usernames', async () => {
    const { body } = await request(app)
    .get('/api/users')
    .expect(200);
    body.allUsers.forEach((user) => {
      expect(user).toMatchObject({
        username: expect.any(String),
      });
    }); 
  });
  test("404: Invalid URL returns 404 error and message", async () => {
    const res = await request(app).get("/api/usrs").expect(404);
    expect(res.body.msg).toBe("Invalid URL");
  });
});

describe('GET api/users/:username', () => {
  test('200: Responds with a specified user object', async () => {
    const { body } = await request(app)
    .get(`/api/users/rogersop`)
    .expect(200);
      expect(body.user).toMatchObject([{
        username: expect.any(String),
        avatar_url: expect.any(String),
        name: expect.any(String),
      }]);
    });
    test("404: valid but non-existent username", async () => {
      const { body } = await request(app)
      .get("/api/users/notauser123").expect(404);
      expect(body.msg).toBe("User Not Found");
    });
  });

  describe('PATCH /api/comments/:comment_id', () => {
    test('200: Accepts update object and responds with updated comment', async () => {
        const comment_id = 1;
        const commentUpdate = { inc_votes : 15 };
        const { body } = await request(app)
         .patch(`/api/comments/${comment_id}`)
         .send(commentUpdate)
         .expect(200);
         expect(body.comment).toMatchObject([{
          body: expect.any(String),
          votes: expect.any(Number),
          author: expect.any(String),
          article_id: expect.any(Number),
          created_at: expect.any(String),
        }])
    })
    test('Vote count increases by 20 for comment_id 5', async () => {
      const comment_id = 5;
      const commentUpdate = { inc_votes: 20 };
      const { body } = await request(app)
        .patch(`/api/comments/${comment_id}`)
        .send(commentUpdate);
      expect(body.comment[0].votes).toEqual(20);
    });
  

    test("404: valid but non-existent comment_id", async () => {
      const comment_id = 9999;
      const commentUpdate = { inc_votes: 25 };
      const { body } = await request(app)
        .patch(`/api/comments/${comment_id}`)
        .send(commentUpdate)
        .expect(404);
      expect(body.msg).toBe("Comment Not Found");
    });
    test("400: bad comment_id", async () => {
      const commentUpdate = { inc_votes: 25 };
      const { body } = await request(app)
        .patch("/api/comments/whatasillycommentyouare")
        .send(commentUpdate)
        .expect(400);
      expect(body.msg).toBe("Bad Request");
    });
    test("400: no inc_votes on request body", async () => {
      const comment_id = 1;
      const commentUpdate = { inc_nothing: 5 };
      const { body } = await request(app)
        .patch(`/api/comments/${comment_id}`)
        .send(commentUpdate)
        .expect(400);
      expect(body.msg).toBe("Bad Request");
    });
    test("400: Other property on request body", async () => {
      const comment_id = 1;
      const commentUpdate = { inc_votes: 5, favourite_cracker: "prawn" };
      const { body } = await request(app)
        .patch(`/api/comments/${comment_id}`)
        .send(commentUpdate)
        .expect(400);
      expect(body.msg).toBe("Bad Request");
    });
    
  });
