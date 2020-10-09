# Image Search

## Setup instructions for development

To setup and start both the API and web part follow these instructions:

1. Install dependencies with `npm i` command.
2. Create a copy of API .env file: `cp apps/api/.env.example apps/api/.env` and enter an Unsplash API access key.
3. Start the backend with `npm run nx -- serve api` on port 3333 by default. You can change it by setting the `PORT` environment variable.
4. Serve the frontend with `npm start`. You can configure the port with the `--port` flag.
5. Open http://localhost:4200 to access the website.

Both API and web are using hot reload for easier development.

## Test

The code is mostly tested, however it is not complete due to time constraints. E2E tests have not been written yet.
Code coverage can be generated to the coverage directory.

```sh
# Web unit tests
npm t

# Generate code coverage for web part
npm t -- --code-coverage

# API unit tests
npm run nx -- test api

# Generate code coverage for API
npm run nx -- test api --code-coverage
```

## Build

To build the apps for deployment.

```sh
# Build web
npm run build

# Build API
npm run build -- api
```

## Folder structure

- `apps`: Contains the apps
- `apps/api`: NestJs project containing API code
- `apps/web`: Angular project containing frontend part
- `apps/web-e2e`: Code for E2E testing, not used currently
- `libs`: Contains the shared libraries between apps
- `libs/api-interfaces`: Interfaces for API requests, responses

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

Data is serialized from JSON into string when saving and the reverse happens when reading. UUID v4 is used for generating IDs for data in Local Storage.

## Notes

- The app is designed to be responsive. Has some design differences between mobile and desktop UI to accomodate screen sizes. Mainly in photo cards.
- Improvement idea: Unsplash's API does not allow to fetch multiple photos in a single request. Currently the backend fetches each photo ID separately. This could be improved by using the collection feautre of Unsplash (required user account at Unsplash). Also photo data could be cached on the backend with Redis.
- Lazy loading: The webapp uses lazy loading for features, however there is only one feature module for now.
- Pagination: Search currently only returns the default 10 images from Unsplash. Pagination or infinite scrolling could be implemented to search for more.
- Browser compatibility: Currently all major modern browsers are supported. Can be configured in `apps/web/.browserslistrc` and checked with `npx browserslist`.
- TODO: Currently there is no way to delete a list, it can only be cleared in the local storage manually.
- TODO: Increase unit test code coverage.
- TODO: Refine UI and website elements. Create CSS classes to reduce TailwindCSS class usage in HTML.
- TODO: Add e2e tests.
- TODO about SEO: Set page `<title>`, `<description>` etc. depending on active route.
