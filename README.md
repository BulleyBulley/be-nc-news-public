# Northcoders News API

## Background

Northcoders News is an API designed to mimic the building of a real-world backend service, such as Reddit, to then provide information to front end architecture.

There are four different sets of data:

* Articles
* Comments
* Users
* Topics

Articles can have comments posted along with votes.

## Hosted Version

The hosted version can be found on Heroku here:

https://pb-nc-news.herokuapp.com/api

To view, a browser that can interpret JSON information is needed. Firefox does this natively, Google Chrome does it with an extension such as JSON Viewer.
Alternatively an application such as Insomnia can be used for sending the endpoint requests.

## Cloning

Clone by running the following command in terminal.

```bash
git clone https://github.com/BulleyBulley/be-nc-news.git
```

## Install Dependencies

Once cloned, run:
```bash
npm install
```

This will install the required dependencies for the project. Which are:

* dotenv 10.0.0
* express 4.17.1
* pg 8.7.1
* pg-format 1.0.4

* jest 27.2.0
* jest-sorted 1.0.12
* nodemon 2.0.12
* supertest 6.1.6

## Seed the Database

In order to seed the database, run:

```bash
npm run seed
```

## Testing

The test files are in the __tests__ folder, the tests will seed the test data.
To run the tests:
```bash
npm test
```

## .env Files

In order for the database to be located, two files need to be created in the root directory.
* .env.development
which needs to contain
```bash
PGDATABASE=nc_news
```

* .env.test which needs to contain
```bash
PGDATABASE=nc_news_test
```

## Minimum versions
This was created using the following versions and should be considered the minimum versions required to run:
* node.js 14.17.3
* Postgres 13.4

## Author
Phil Bulleyment
