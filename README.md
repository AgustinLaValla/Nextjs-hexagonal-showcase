# Hexagonal Todos App

A full-stack project for showing how to implement Hexagonal Architecture in Next.js, using Typescript, Mongoose, MongoDB, React, Next.js API routes and Material UI. The project has an implementation of an authentication system that uses JSON Web Token to manage user login data, and a service to handle the user todos.

## What is the purpose of this project?
Providing a boilerplate to start your own full-stack Next.js project that implements Hexagonal Architecture.

## Todo
  - Unit tests for Domain Layer
  - Integration tests for Controllers
  - End to End tests for UI

# Quick start

### Prerequisites ###

Create an .env file in project root to register the following required environment variables:
  - `MONGO_DB` - MongoDB connection URL
  - `HTTP_PORT` - port of server
  - `JWT_SECRET` - we will use secret to generate our JSON web tokens


### Install dependencies: ###

```shell
yarn install
```

### Use Docker: ###

You can use Docker to start the app locally. Run the following command:

```shell
docker-compose up
```

### Start the project: ###

```shell
yarn run dev
```