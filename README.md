# Image Search

## Setup instructions

1. Install dependencies with `npm i` command.
2. Create a copy of API .env file: `cp apps/api/.env.example apps/api/.env` and enter an Unsplash API access key.
3. Start the backend with `npm run nx -- serve api` on port 3333 by default. You can change it by setting the `PORT` environment variable.
4. Serve the frontend with `npm start`. You can configure the port with the `--port` flag.
5. Open http://localhost:4200 to access the website.

## Tests

Run unit tests with `npm t` command. To generate code coverage use `npm t -- --code-coverage`.
The code was not tested fully due to time constraints, also e2e were skipped for now.

## Reasons for technologies

### Nrwl Nx

- Dev tool for monorepos
- Shared code, libraries
- Useful CLI

### Angular

- Opinionated framework
- Includes lots of useful libraries
- Strong TypeScript support
- Built-in dependency injection
- Works well with RxJs
- Useful CLI

### NgRx

- State management based on RxJs
- Most popular Angular state management

### NestJs

- Architecture, philosophy heavily inspired by Angular
- Strong TypeScript support
- Useful CLI

### Local Storage

The favorite photos are stored in the browser's Local Storage. In a normal web app the favorites would probably be stored in a remote database after user registration or use Unsplash's collection function.

## Notes

- The app is designed to be responsive. Has some design differences between mobile and desktop UI. (Photo cards)
- Unsplash's API does not allow to fetch multiple photos in a single request. Currently the backend fetches each photo ID separately. This could be improved by using the collection feautre of Unsplash (required user account at Unsplash). Also photo data could be cached on the backend with Redis.
- Currently there is no way to delete a list, it can only be cleared in the local storage manually.
- Increase unit test code coverage.
- Add e2e tests.
- Refine UI and website elements. Create CSS classes to reduce TailwindCSS class usage in HTML.
- Lazy loading: The webapp uses lazy loading for features, however there is only one feature module for now.
- Pagination: Search currently only returns the default 10 images from Unsplash. Pagination or infinite scrolling could be implemented to search for more.
- Browser compatibility: configurable in `apps/web/.browserslistrc`. Can be checked with `npx browserslist`.

## Scripts

### Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.
