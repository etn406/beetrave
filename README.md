# Beetrave

Main goals of this application:

1. **Navigate through a full [beets](https://beets.readthedocs.io) library stored on a server.**

2. **Select albums or individual tracks and have them automatically synchronized on an other device.**

## To-Do List

- [x] Configure the application for it to run in Docker containers (app, db)

- [ ] Connect to the beet's library database

- [ ] Display some data from beet's library on the frontend

- [ ] Create a paginated table on the frontend with tracks, grouped by albums

- [ ] Read Syncthing `.stignore`

- [ ] Make items selectable for synchronisation on the frontend item table

- [ ] Add a _Save_ button on the item table to send changes to the backend

- [ ] Write Syncthing `.stignore` with selected tracks

- [ ] Verify that the configuration works well in production

- [ ] Make tracks playable simply on the frontend (no playlist)

## Development

- Clone the repository:

```sh
git clone https://github.com/etn406/beetrave.git
cd beetrave
```

Create a file named `.env` file to specify environment variables. This file will be loaded by SvelteKit in a development environment only, and shouldn't be used in production.

```sh
touch .env
```

```sh
NODE_ENV=development
BEETS_LIBRARY_ROOT=/data/music/library
BEETS_LIBRARY_DB=/data/beets/beets-config/library.db
POSTGRES_DATABASE_HOST=localhost
POSTGRES_DATABASE_PORT=5433
POSTGRES_DATABASE_USER=beetrave
POSTGRES_DATABASE_PASSWORD=beetrave
POSTGRES_DATABASE_NAME=beetrave
```

And then :

```sh
npm install

# Run the database container 
docker compose up --detach db

# Setup the database
npm run db:migrate

# Start the development environment
npm run dev
```

To stop the database:

```sh
docker compose down db
```

## Changelog

### 2023/07/24

Switch to [Sveltekit](https://kit.svelte.dev/), with:
- [Skeleton](https://www.skeleton.dev) for frontend UI
- [Drizzle](https://orm.drizzle.team) for database interactions
- [Zod](https://zod.dev/) (+[drizzl-zod](https://orm.drizzle.team/docs/zod)) for data validation
