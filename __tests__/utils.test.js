const {
  formatTopicsData,
  formatUsersData,
  formatArticlesData,
  formatCommentsData,
  dateConverter,
} = require("../db/utils/data-manipulation.js");

describe.skip("formatTopicsData", () => {
  test("returns an empty array for no data", () => {
    const topicData = [];
    const expectedFormattedData = [];
    expect(formatTopicsData(topicData)).toEqual(expectedFormattedData);
  });
  test("returns nested arrays in the order (username, comment, rating, game_id)", () => {
    const topicData = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
      },
    ];
    const expectedFormattedData = [["mitch", "The man, the Mitch, the legend"]];
    expect(formatTopicsData(topicData)).toEqual(expectedFormattedData);
  });
  test("does not mutate the original topicData", () => {
    const topicData = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
      },
    ];
    const unMutatedRows = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
      },
    ];
    formatTopicsData(topicData);
    expect(topicData).toEqual(unMutatedRows);
  });
});

describe.skip("formatUsersData", () => {
  test("returns an empty array for no data", () => {
    const userData = [];
    const expectedFormattedData = [];
    expect(formatUsersData(userData)).toEqual(expectedFormattedData);
  });
  test("returns nested arrays in the order (username, avatar_url, name)", () => {
    const userData = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    const expectedFormattedData = [
      [
        "butter_bridge",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
        "jonny",
      ],
    ];
    expect(formatUsersData(userData)).toEqual(expectedFormattedData);
  });
  test("does not mutate the original userData", () => {
    const userData = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    const unMutatedRows = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    formatUsersData(userData);
    expect(userData).toEqual(unMutatedRows);
  });
});

describe.skip("formatArticlesData", () => {
  test("returns an empty array for no data", () => {
    const articleData = [];
    const expectedFormattedData = [];
    expect(formatArticlesData(articleData)).toEqual(expectedFormattedData);
  });
  test("returns nested arrays in the order (title, topic, author, body, created_at, votes)", () => {
    const articleData = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1594329060000),
        votes: 100,
      },
    ];
    const expectedFormattedData = [
      [
        "Living in the shadow of a great man",
        "mitch",
        "butter_bridge",
        "I find this existence challenging",
        "7/9/2020, 22:11:00",
        100,
      ],
    ];
    expect(formatArticlesData(articleData)).toEqual(expectedFormattedData);
  });
  test("does not mutate the original articleData", () => {
    const articleData = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1594329060000),
        votes: 100,
      },
    ];
    const unMutatedRows = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1594329060000),
        votes: 100,
      },
    ];
    formatArticlesData(articleData);
    expect(articleData).toEqual(unMutatedRows);
  });
});

describe.skip("formatCommentsData", () => {
  test("returns an empty array for no data", () => {
    const commentData = [];
    const expectedFormattedData = [];
    expect(formatCommentsData(commentData)).toEqual(expectedFormattedData);
  });
  test("returns nested arrays in the order (comment_id, body, votes, author, article_id, created_at)", () => {
    const commentData = [
      {
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        article_id: 9,
        created_at: new Date(1586179020000),
      },
    ];
    const expectedFormattedData = [
      [
        `Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!`,
        16,
        "butter_bridge",
        9,
        "4/6/2020, 14:17:00",
      ],
    ];
    //console.log(formatCommentsData(commentData))
    expect(formatCommentsData(commentData)).toEqual(expectedFormattedData);
  });
  test("does not mutate the original reviewData", () => {
    const commentData = [
      {
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        article_id: 9,
        created_at: new Date(1586179020000),
      },
    ];
    const unMutatedRows = [
      {
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        article_id: 9,
        created_at: new Date(1586179020000),
      },
    ];
    formatCommentsData(commentData);
    expect(commentData).toEqual(unMutatedRows);
  });
});

// describe('dateConverter', () => {
//     test('returns a date string with input of number of seconds', () => {
//         const dateInput = new Date(1586179020000)
//         const expectedOutput = "06-04-2020"
//         expect(dateConverter(dateInput)).toEqual(
//           expectedOutput
//         );
//       });
// });
