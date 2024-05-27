# beets-rave

## Installation

* Clone the repository:

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
```

Build and run the project:

```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Building again shouldn't be necessary after this,
unless you modified one of the `package.json` or `Dockerfile`.

### Production

Create a file named `docker-compose.prod.yml` file to override basic settings :

```sh
touch docker-compose.prod.yml
```

```yml
services:
  frontend:
    build:
      target: production

  backend:
    build:
      target: production
```
```sh
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```