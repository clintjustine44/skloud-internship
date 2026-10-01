## Completed Tasks & Requirements

- [x] **Task 1: Implement Registration**
  - Endpoint: `POST /users`
  - Accepts `fullName`, `email`, and `password`.
- [x] **Task 2: User Login**
  - Endpoint: `POST /sessions`
  - Successful authentication issues and returns a bearer access token.
- [x] **Task 3: Protected Profile Endpoint**
  - Endpoint: `GET /me`
  - Requires authentication and returns the currently authenticated user's details.
- [x] **Task 4: Protect Task Routes**
  - Enforced API authentication middleware on the following endpoints:
    - `GET /tasks`
    - `POST /tasks`
    - `PATCH /tasks/:id`
    - `DELETE /tasks/:id`
- [x] **Task 5: Resource Ownership**
  - A user cannot update or delete another user's task.
  - Current access-token authentication accepts the token through the bearer `Authorization` header, and auth middleware rejects missing, invalid, or expired credentials before protected handlers run.