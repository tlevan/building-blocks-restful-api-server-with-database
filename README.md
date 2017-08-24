# Building Blocks | RESTful API Server with Database

This project implements a basic RESTful API server using Node.js, Express, and MongoDB.  It can be used as a starting point for more sophisticated services requiring database interactions.

The server supports [create, read, update, and delete](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) ("CRUD") operations using HTTP request methods POST, GET, PUT, and DELETE.

## Prerequisites

* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)
* [MongoDB](https://www.mongodb.com/)

Node.js [downloads](https://nodejs.org/en/download/) include npm.

To check installed versions, run `node -v`, `npm -v`, and `mongod --version`.

## Install Dependencies

Run `npm install` for package.json dependencies.

## Start Server

Start mongod first, then run `npm start` (or `node server.js`).

## Demonstrate API Operations

To exercise all of the API operations using cURL (and assuming the server is running at localhost:65535), run `perl demonstrate.pl`.

## Stop Server

`Control+C`

