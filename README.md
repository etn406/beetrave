# Beetrave

Main goals of this application:

1. **Navigate through a full [beets](https://beets.readthedocs.io) library stored on a server.**
   Here the _Beetrave_ [NestJS](https://nestjs.com/) back-end will take advantage of _beets_ by reading its SQLite library file, and serve a simple API to the [NextJS](https://nextjs.org/) front-end.

2. **Select albums or individual tracks and have them automatically synchronized on an other device.** For that, we'll need [Syncthing](https://syncthing.net/) installed on the server and sharing the beets library folder, and Beetrave will edit a `.stignore` file to select individual tracks to share with other devices.

## To-Do List

- [x] Configure the application for it to run in Docker containers (backend, frontend, db)

- [x] Connect to the beet's library database

- [x] Display some data from beet's library on the frontend

- [ ] Create a paginated table on the frontend with tracks, grouped by albums

- [ ] Read Syncthing `.stignore`

- [ ] Make items selectable for synchronisation on the frontend item table

- [ ] Add a _Save_ button on the item table to send changes to the backend

- [ ] Write Syncthing `.stignore` with selected tracks

- [ ] Verify that the configuration works well in production

- [ ] Make tracks playable simply on the frontend (no playlist)

## Installation

- Clone the repository:

```sh
git clone https://github.com/etn406/beets-rave.git
cd beets-rave
```

### Development

Create a file named `docker-compose.dev.yml` file to override basic settings :

```sh
touch docker-compose.dev.yml
```

```yml
services:
  frontend:
    build:
      target: development
    volumes:
      - ./frontend:/app
    command: npm run dev
    environment:
      NODE_ENV: development
      BEETRAVE_FRONT_PORT: 3000
      BEETRAVE_API_URL: http://localhost:3001/api

  backend:
    build:
      target: development
    volumes:
      - ./backend:/app
      - type: bind
        source: ./library.db
        target: /app/beets-library.db
    environment:
      NODE_ENV: development
      BEET_LIBRARY_ROOT: /path/to/beet-library
      BEET_LIBRARY_DB: /path/to/library.db
```

Build and run the project:

```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Building again shouldn't be necessary after this,
unless you modified `package.json` or `Dockerfile`.

#### Migrations

```sh
# First, build the project
docker-compose exec backend npm run build
```

```sh
# Creates an empty migration
docker-compose exec backend npm migration:create --name=MyNewMigration

# Generates a new migration reflecting the difference between the database and the Entities definitions
docker-compose exec backend npm migration:generate --name=MyNewMigration

# Run/revert migrations
docker-compose exec backend npm migration:run
docker-compose exec backend npm migration:revert
```

### Production

Create a file named `docker-compose.prod.yml` file to override basic settings :

```sh
touch docker-compose.prod.yml
```

```yml
services:
  frontend:
    environment:
      NODE_ENV: production
      BEETRAVE_API_URL: https://<production.website>/api
    build:
      target: production

  backend:
    build:
      target: production
    environment:
      NODE_ENV: development
      BEET_LIBRARY_ROOT: /path/to/beet-library
      BEET_LIBRARY_DB: /path/to/library.db
      POSTGRES_DATABASE_HOST: db
      POSTGRES_DATABASE_PORT: 5433
      POSTGRES_DATABASE_USER: beetrave
      POSTGRES_DATABASE_PASSWORD: beetrave
      POSTGRES_DATABASE_NAME: beetrave
      BACKEND_PORT: 3001
```

```sh
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```
