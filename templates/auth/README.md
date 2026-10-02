# Authentication Template

Baseline flow:

1. Register
2. Verify input on the server
3. Login
4. Create a server-side session
5. Read the current user
6. Logout and invalidate the session
7. Re-authenticate before sensitive account changes

For browser sessions, prefer secure HttpOnly cookies rather than putting session identifiers or credentials in localStorage/sessionStorage. Follow the project's authentication and session-management security guidance.
