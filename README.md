# backend-exercise

## Overview

* A simple CRUD API, for users to read, create, update and delete to-do list items.
* Users can filter todo items by category or searching for matching text in it's description
* Logins and authentication logic handled with JWT
* Validation and error handling with Yup
* Integration testing with Mocha and Chai
* Relational database connection/configuration setup with PostgreSQL

## Quickstart

After downloading and extracting the project folder, locate into the root of the project and run the following commands on the terminal:

```sh
npm install
```
Now add a .env file at the root of the folder with the following variables:

```sh
DATABASE_URL=url # NOTE: link in the url must match the link in docker-compose.yml (by default it is db)
PORT=port # NOTE: for docker, you must change both "EXPOSE port" in dockerfile and "ports: - port:port" in docker-compose.yml to match
SECRET="secret" # NOTE: this is for password hashing and authentication
```

To run the app in a container using Docker, run the following command at the root of the project folder:
```sh
docker compose up --build
```