## Running with Docker

### Build

```sh
docker build -t promotion-ace-slot-machine-be .
```

### Run

```sh
docker run -p 3001:3001 --env-file .env promotion-ace-slot-machine-be
```

This will automatically run migrations on startup and then start the server.
