const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const  seed  = require('../db/seeds/seed.js');
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api", () => {
    test("200: JSON object with msg key", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((res) => {
          console.log(res.body);
          expect(res.body).toHaveProperty("msg", "Connection Success");
        });
    });
  });

  describe.only("GET /api/topics", () => {
    test("200: Returns all topics available", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          expect(res.body.topics.length).toBeGreaterThan(1);
          res.body.topics.forEach((topic) => {
            expect(topic).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
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
  });