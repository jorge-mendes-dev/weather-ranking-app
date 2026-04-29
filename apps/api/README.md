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

### Environment Variables

Copy the example environment file and rename it to `.env` before running the application:

```bash
cp .env.example .env
```

Then, edit `.env` to provide any required secrets or configuration values.

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

## Ranking Logic

The `RankingService` computes activity rankings for a given location and 7-day weather forecast. Each activity (e.g., surfing, skiing, hiking) is scored per day based on weather conditions:

- **Temperature:** Penalty for being outside the ideal range for the activity.
- **Wind Speed:** Penalty for exceeding the activity's wind threshold.
- **Precipitation:** Penalty for excess precipitation.
- **UV Index:** Flat penalty if outside the acceptable range.

Scores are normalized to a 0–100 scale. See `src/ranking/ranking.service.ts` for details.

### Example Ranking Query

```
query {
  rankings(latitude: 38.7167, longitude: -9.1333) {
    day
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

## Testing & Coverage

- Unit and e2e tests are provided for all core services.
- To run all tests:

```bash
npm run test
npm run test:e2e
npm run test:cov
```

### Test Coverage Notes
- Mocks are used for weather data in ranking tests.
- Contributors should ensure mocks match the actual service method signatures and data structures.
- Add tests for error handling and edge cases (e.g., invalid input, empty weather data).

## Contributor Recommendations

- Add error handling and input validation in services.
- Update and expand tests to cover edge cases and error scenarios.
- Add comments to clarify complex logic, especially in scoring.
- Follow NestJS and project best practices (see `.github/skills/`).

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

## API Flow Diagram

Below is a high-level overview of the API request/response flow:

```mermaid
graph TD
  Client[Client (GraphQL Playground/HTTP)]
  Gateway[NestJS App (Apollo Server)]
  Resolver[GraphQL Resolver]
  Service[NestJS Service Layer]
  WeatherAPI[External Weather API]
  Ranking[Ranking Logic]
  DB[(Database?)]

  Client-->|GraphQL Query|Gateway
  Gateway-->|Parse & Route|Resolver
  Resolver-->|Call|Service
  Service-->|Fetch Weather|WeatherAPI
  Service-->|Compute Rankings|Ranking
  Service-->|(Optional: DB Access)|DB
  Service-->|Return Data|Resolver
  Resolver-->|GraphQL Response|Gateway
  Gateway-->|Response|Client

  classDef ext fill:#f9f,stroke:#333,stroke-width:2px;
  class WeatherAPI ext;
```

---

**Flow Explanation:**
- The client sends a GraphQL query to the NestJS API (Apollo Server).
- The request is routed to the appropriate GraphQL resolver.
- The resolver calls the relevant service(s).
- The service fetches weather data from an external API, computes activity rankings, and (optionally) accesses a database.
- The service returns the result to the resolver, which formats the GraphQL response.
- The response is sent back to the client.

## 🔧 Backend Improvements

### Testing & Reliability
- Stabilize unit tests by properly mocking external dependencies
- Expand E2E coverage to validate full request flow (GraphQL → service → external API)
- Introduce CI pipeline to enforce test reliability

### Architecture & Consistency
- Standardize input validation using DTOs and `class-validator`
- Extract external API logic into a dedicated provider
- Introduce a domain layer to better separate business logic from infrastructure

### Performance & Scalability
- Add caching layer (e.g., Redis) to reduce external API calls
- Implement rate limiting to protect the API and upstream services
- Optimize resolver execution to avoid redundant calls

### Observability
- Introduce structured logging (e.g., Pino)
- Add error tracking (e.g., Sentry)
- Improve error handling and standardization