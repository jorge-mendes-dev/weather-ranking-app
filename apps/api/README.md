# API — Weather Ranking Backend

GraphQL API built with **NestJS 11** and **Apollo Server v4** that provides weather data and sport activity rankings.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS 11 |
| API protocol | GraphQL (code-first) |
| GraphQL server | Apollo Server v4 via `@nestjs/apollo` |
| Language | TypeScript 5 |
| Runtime | Node.js |
| Shared types | `@weather-app/types` |

## Project Structure

```
src/
├── app.module.ts      # Root module — GraphQL registered here
├── app.controller.ts
├── app.service.ts
└── main.ts
test/
├── app.e2e-spec.ts
└── jest-e2e.json
```

## Getting Started

Install dependencies from the **monorepo root**:

```bash
npm install
```

### Run in development (watch mode)

```bash
# from monorepo root
npm run dev

# or from this directory
npm run start:dev
```

The GraphQL playground is available at `http://localhost:3000/graphql`.

### Build for production

```bash
npm run build
npm run start:prod
```

## GraphQL Schema

The schema is auto-generated (code-first) from TypeScript decorators. After starting the server,
the generated `schema.gql` file will appear in the project root.

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# coverage report
npm run test:cov
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port the server listens on |

## Linting & Formatting

```bash
npm run lint
npm run format
```

## Example Queries

### Search for Cities

```
query {
  searchCities(name: "Lisbon") {
    name
    country
    latitude
    longitude
  }
}
```

**Response:**
```
{
  "data": {
    "searchCities": [
      {
        "name": "Lisbon",
        "country": "PT",
        "latitude": 38.7167,
        "longitude": -9.1333
      },
      ...
    ]
  }
}
```


### Get 7-Day Weather Forecast

```
query {
  weather7Day(latitude: 38.7167, longitude: -9.1333) {
    day
    temperature
    windSpeed
    precipitation
    uvIndex
  }
}
```

**Response:**
```
{
  "data": {
    "weather7Day": [
      {
        "day": "2026-04-19",
        "temperature": 15,
        "windSpeed": 5,
        "precipitation": 0,
        "uvIndex": 6
      },
      {
        "day": "2026-04-20",
        "temperature": 16,
        "windSpeed": 6,
        "precipitation": 1,
        "uvIndex": 7
      },
      ...
    ]
  }
}
```

### Get Activity Rankings by Weather

```
query {
  rankings(latitude: 38.7167, longitude: -9.1333) {
    activity
    score
    conditions {
      temperature
      windSpeed
      precipitation
      uvIndex
    }
  }
}
```

**Response:**
```
{
  "data": {
    "rankings": [
      {
        "activity": "surfing",
        "score": 92,
        "conditions": {
          "temperature": 22,
          "windSpeed": 10,
          "precipitation": 0,
          "uvIndex": 6
        }
      },
      ...
    ]
  }
}
```

## Error Handling

All errors are returned in standard GraphQL error format. Example:

```
{
  "errors": [
    {
      "message": "Invalid weather data from Open-Meteo API",
      "locations": [...],
      "path": ["rankings"]
    }
  ],
  "data": null
}
```

## Notes
- All inputs are validated. Invalid coordinates or missing fields will return a validation error.
- The API is read-only and does not require authentication.
- For more schema details, use the GraphQL playground at `/graphql` after starting the server.
