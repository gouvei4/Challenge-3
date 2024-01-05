**README.md**

# Event & User API with JWT

This is a simple example of an API using Express, MongoDB, JWT, Jest and test coverage for event and user handling.

## Installation

Make sure you have Node.js and npm installed in your environment. Then install the necessary dependencies:

```bash
npm install
```
```bash
git clone https://github.com/gouvei4/Challenge-3.git
npm install
```

## Running the API

```bash
npm run dev
```

The API will be available at `http://localhost:3333`.

## About
Api developed with JWT authentication to access event routes, token is received after login is successful.

## API endpoints

### Users

- **POST /api/v1/users/sign-up**
  - Create a new user.
- **POST /api/v1/users/sign-in**
  - Login an existing user.

### Events

- **POST /api/v1/users/events**
  - Create a new event.
- **GET /events?dayOfWeek={dayOfWeek}**
  - Gets all events for the day entered in the parameter.
- **GET /api/v1/events/:id**
  - Get an event by ID.
- **DELETE /api/v1/events?dayOfWeek={dayOfWeek}**
  - Deletes events from a specific day.
- **DELETE /api/v1/events/:id**
  - Deletes an event by ID.

## Testing the API

```bash
 npm run test
```

This command will run the tests using Jest and display the code coverage.

## Autor

Esta API foi desenvolvido por <a href="https://github.com/gouvei4">Afonso Gouveia</a>.
