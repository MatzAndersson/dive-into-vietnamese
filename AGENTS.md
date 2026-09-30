# Dive Into Vietnamese – Codex Instructions

## Project

Dive Into Vietnamese is a full-stack Vietnamese-learning platform.

Keep the project:
- simple
- maintainable
- testable
- localization-friendly
- suitable as a professional portfolio project

Prefer small incremental improvements over large rewrites.

## Tech stack

Frontend:
- React 19
- TypeScript
- Tailwind CSS
- Vite

Backend:
- ASP.NET Core / C#
- Entity Framework Core
- PostgreSQL

Testing:
- Existing .NET test project

Deployment:
- Frontend: Cloudflare Pages
- Backend: Railway

## Architecture

Preserve the existing architecture unless the current GitHub Issue explicitly requires a change.

Backend:
- Follow the existing Vertical Slice Architecture-inspired organization.
- Keep related lesson functionality inside the Lessons feature while it belongs to the same user flow.
- Do not introduce Repository or Service layers unless there is a concrete need.
- Avoid unnecessary abstractions.

Frontend:
- Follow the existing feature-based organization.
- Keep feature-specific components, API code, validation, schemas and types together.
- Reuse existing components where practical.

## Coding principles

Follow:
- Clean Code
- SOLID where it improves clarity
- DRY without premature abstraction
- clear naming
- small focused functions
- simple control flow

Prefer readable code over clever code.

Do not refactor unrelated code while implementing a ticket.

Avoid overengineering.

## GitHub Issue workflow

Work on ONE GitHub Issue at a time.

For each issue:

1. Read the issue and acceptance criteria.
2. Inspect the relevant existing code before editing.
3. Stay within the issue scope.
4. Make the smallest coherent change that satisfies the issue.
5. Do not add unrelated features or refactors.
6. Run relevant checks and tests.
7. Summarize:
   - files changed
   - behavior changed
   - checks/tests run
   - anything requiring manual verification

Do not automatically begin another issue.

## Testing

Backend changes:
- run `dotnet build`
- run relevant tests
- use `dotnet test` when appropriate

Frontend changes:
- run `npm run build`
- run linting when relevant

Never claim a test or build passed unless it was actually run.

Add focused tests for important validation, business logic and bug fixes when reasonable.

## Security

Never:
- commit secrets
- expose API keys
- expose passwords
- expose connection strings
- place secrets in source-controlled files
- weaken authentication or authorization without explicit instruction

Treat `.env`, Railway variables, Cloudflare secrets, Supabase credentials and production configuration as sensitive.

Do not modify production secrets.

Do not deploy to production unless explicitly instructed.

Do not run destructive production database commands.

Do not automatically apply production migrations.

## Git rules

Do not push directly to `main`.

Do not automatically merge pull requests.

Do not force-push.

Do not rewrite Git history.

Do not delete branches unless explicitly instructed.

Preferred workflow:

GitHub Issue -> implementation branch -> checks -> pull request -> human review -> merge

## Database

When changing EF Core models:
- determine whether a migration is required
- do not create speculative migrations
- do not apply migrations to production
- clearly report migration requirements

Avoid destructive schema changes unless explicitly required.

## Frontend

Use TypeScript properly.

Avoid `any` unless there is a clear reason.

Follow the existing Tailwind and design-token patterns.

Do not hardcode duplicated UI text when it belongs in the localization system.

Preserve Vietnamese Unicode and diacritics.

Maintain responsive behavior.

## Localization

This is a localization-first project.

Prefer:
- externalized UI strings
- reusable locale keys
- UTF-8-safe handling
- layouts tolerant of different string lengths
- separation between Vietnamese lesson content and localized UI/support content

Avoid introducing hardcoded English UI strings when localization should be used.

## Scope control

If an issue appears to require a substantially larger architectural change than described:

1. Stop before making the larger change.
2. Explain the problem.
3. Suggest the smallest reasonable alternatives.
4. Wait for approval before expanding scope.

If existing code conflicts with these instructions, preserve working behavior and report the conflict rather than performing a large unsolicited rewrite.