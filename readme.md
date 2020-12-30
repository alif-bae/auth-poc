# Role Based Authentication in Express

## Stack

- Runtime: `Node v15.4.0`
- Framework: `ExpressJS`
- Authentication: `PassportJS`
- DB: `Sqlite`
- ORM: `Sequalize`
- Tests: `Mocha` + `Chai`

This project has been a headfirst dive into making a minimal backend application using the Express JS framework.

## Pre-requisites

- node < v12.4.0

## Setup

The following commands should be executed from the project's root path:

1. `npm install` to install dependencies
2. `npm run db:reload:dev` to reload the database (re-runs migrations and seeders)
3. `npm start` to run the development server

## Tests

A subset of resources are being tested, namely: Users, Collections, Items, Roles. Tests included are to test the correct behvaior of global managers and managers interacting with a resource. For the sake of time, tests for regular user roles have not been implemented but should work in practice.

- `npm test`: Runs migrations, seeds the `test.db.sqlite` database and runs the test suite

## Documentation

See the dedicated [API Documentation](./documentation.md) for more information. See the dedicated [Requirements](./requirements.md) for a list of requirements this project is based on.
