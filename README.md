# Auth POC

Author: Ali Fawad

## Foreword

This project has been a headfirst dive into making a minimal backend application using the Express JS framework.

## Todo

- Better exception handling
- Authorization middleware as per requirements

## Decisions

## Libraries

- Express: API framework
- Morgan: Logging
- Passport: Authentication using the JWT (JSON Web Token) Strategy
- Body Parser: Request parsing
- Sequelize: SQL ORM
- Sqlite: Database

## What I Learned

- Working with Express
- How express uses middlewares
- New ORM for SQL (Sequelize)
- Using Async-Await in Javascript



users, groups. collections and items

- Users can belong to multiple groups or be a global manager
- A group can link to multiple collections
- A collection can belong to a single group
- Items belong to a single collection

A global manager can:

- CRUD all roles users
- CRUD all groups, collections and items

A group manager can:

- CRUD regular and manager roles only under current group
- CRUD collections and items only under current group

- manager:
    - get all roles in allowed groups
    - get all items in allowed groups
    - get all collections in allowed groups
- regular:
    - can only view items and collections under own group
    - cannot create, update or delete
