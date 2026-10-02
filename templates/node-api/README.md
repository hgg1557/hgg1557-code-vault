# Node API Template

Recommended baseline for small REST APIs.

- TypeScript
- request validation on the server
- centralized API response format
- authentication and authorization enforced server-side
- rate limiting for sensitive endpoints
- structured error handling
- environment variables for secrets
- HTTPS in production

Keep business logic separate from HTTP handlers so it can be reused and tested.
