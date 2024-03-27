import { HttpHandler, HttpResponse, http } from "msw";

import { faker } from "@faker-js/faker";

const basePath = import.meta.env.VITE_API_ENDPOINT;

// Auth handlers
const authHandlers: HttpHandler[] = [
  http.post(`${basePath}local-auth/signup`, async () => {
    return HttpResponse.json(
      {
        token: faker.string.uuid(),
      },
      { status: 200 }
    );
  }),

  http.post(`${basePath}local-auth/login`, async () => {
    return HttpResponse.json(
      {
        token: faker.string.uuid(),
      },
      { status: 200 }
    );
  }),
];
export const handlers: HttpHandler[] = [...authHandlers];
