# Dive Into Vietnamese

**Dive Into Vietnamese** is an active full-stack Vietnamese learning platform project focused on structured lesson content, multilingual interface design, and localization-first architecture.

The project is designed as both a practical teaching tool and a portfolio project. It supports public lesson browsing and protected lesson management for admin/teacher users.

## Live Demo

Live site: https://diveintovietnamese.com

API domain: https://api.diveintovietnamese.com

## Project Status

This project is currently in private beta / active development.

The current deployed version includes a working backend/frontend lesson flow, public lesson browsing, protected admin lesson management, authentication, role-based authorization, and production deployment.

Current focus:

* improving the lesson experience and content structure
* adding more polished lesson content
* improving teacher-friendly content editing
* expanding backend and frontend testing
* preparing the project for stronger portfolio presentation
* preparing for small-scale usability testing

## Features Implemented

* Public landing page
* Public lesson level navigation
* Public lesson detail page
* Lesson create, edit, and delete flow for admin/teacher users
* Backend CRUD endpoints for lessons
* PostgreSQL persistence through Entity Framework Core
* DTO-based API responses
* Backend validation with FluentValidation
* ASP.NET Identity authentication
* Role-based authorization for Admin and Teacher users
* Protected lesson write endpoints
* Protected frontend admin route
* Login and logout flow
* Swagger/OpenAPI support for local API testing
* Reusable frontend lesson components
* Lesson levels and filtering
* Multilingual UI foundation
* Structured lesson content fields, including:

  * conversation JSON
  * vocabulary JSON
  * questions JSON
  * grammar JSON
  * practice links

## Tech Stack

### Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* React Router
* TanStack Query
* i18next / react-i18next
* VS Code

### Backend

* ASP.NET Core / .NET 10
* C#
* Minimal APIs
* Entity Framework Core
* PostgreSQL
* ASP.NET Identity
* FluentValidation
* Visual Studio

### Hosting and Infrastructure

* Cloudflare Pages for frontend hosting
* Railway for backend API hosting
* Supabase PostgreSQL for production database
* Cloudflare DNS and domain management

### Development Tools

* Git and GitHub
* Swagger/OpenAPI
* Feature-folder / VSA-inspired backend structure

## Architecture

The backend uses a compact feature-folder structure inspired by Vertical Slice Architecture.

Instead of organizing code only by technical layers such as controllers, services, and repositories, lesson-related files are grouped around the lesson feature.

Example backend structure:

```txt
Features/
  Lessons/
    Create.cs
    Update.cs
    Delete.cs
    GetAll.cs
    GetById.cs
    Endpoints.cs
    Lesson.cs
    LessonDto.cs
    LessonValidator.cs
```

This keeps related endpoint logic, validation, mapping, and data handling close together while keeping the project simple enough for the current stage.

Authentication-related code is grouped separately under the auth feature area, including Identity integration, session checks, and production seeding utilities.

The frontend is also organized around feature areas:

```txt
src/
  features/
    auth/
      pages/
      api.ts
      ProtectedAdminRoute.tsx

    lessons/
      components/
      pages/
      api.ts
      schema.ts
      types.ts
```

This structure is intended to make the application easier to grow as new features are added, such as teacher tools, student progress, Anki export, and interactive transcripts.

## Security Model

Public visitors can browse lesson content without logging in.

Lesson creation, editing, and deletion are protected by backend authorization and restricted to users with lesson-management permissions.

The frontend admin route is also protected, so anonymous users are redirected to the login page before the admin editor is shown.

Current security measures include:

* ASP.NET Identity authentication
* session-cookie based login
* Admin/Teacher role-based authorization
* protected backend lesson write endpoints
* protected frontend admin route
* public lesson read endpoints
* production secrets stored outside the repository
* frontend environment variables used only for non-secret public configuration
* local development secrets excluded from Git

## Localization-First Direction

Dive Into Vietnamese is designed with a localization-first direction.

The project aims to demonstrate:

* multilingual UI planning
* structured content for language learning
* correct rendering of Vietnamese diacritics
* separation between lesson content and interface text
* externalized interface strings
* content structures that can later support multiple explanation languages
* future support for teacher-managed lesson material
* future support for audio-linked transcripts and vocabulary workflows

This makes the project relevant not only as a full-stack web application, but also as a localization engineering and multilingual content workflow case study.

## Testing and Evaluation

The project includes a dedicated backend test project, although automated test coverage is still being expanded.

Planned testing focus:

* validation tests for lesson creation and updates
* API tests for public lesson reading
* API tests for protected lesson write operations
* authentication and authorization tests
* regression tests for deployed admin flows
* manual frontend smoke tests for learner and admin flows

Because this is a learning platform, usability testing is also part of the planned evaluation process. Before wider use, the project will be tested with a small group of users to evaluate:

* whether learners understand the lesson flow
* whether Vietnamese text, translations, vocabulary, grammar, and practice links are presented clearly
* whether the interface is easy for students to navigate
* whether teacher/admin content editing is understandable for non-technical users
* whether the platform supports realistic teaching and self-study scenarios

This reflects the long-term goal of developing the project not only as a technical prototype, but as a usable educational product.

## Current Limitations

The project is not yet a finished production platform.

Known limitations:

* lesson content is still limited
* teacher-friendly structured editing needs improvement
* some admin editing fields are still JSON-based
* lesson detail presentation needs more polish
* automated test coverage is still limited
* student accounts and progress tracking are planned for later
* audio and transcript features are still planned or early-stage

## Roadmap

### Near-Term Roadmap

* add one or more polished production sample lessons
* improve lesson detail layout
* improve frontend lesson filtering and navigation
* add teacher-friendly structured editors
* add backend tests for authentication and protected endpoints
* add backend tests for lesson validation
* run final deployed smoke tests
* add README screenshots
* improve CV/LinkedIn project presentation
* conduct small-scale usability testing with selected learners and teacher/admin users

### Future Product Roadmap

* teacher-friendly lesson editor
* structured editors for vocabulary, grammar, conversation, questions, and practice links
* audio player and transcript improvements
* Anki export
* student accounts and progress tracking
* more Vietnamese lessons
* private beta with selected students
* possible paid or premium lesson content later

## Local Development

The project has separate frontend and backend applications.

### Frontend

```bash
cd web
npm install
npm run dev
```

### Backend

Open the backend solution in Visual Studio and run the ASP.NET Core API project.

The backend uses PostgreSQL through Entity Framework Core. Local database configuration should be handled with local development settings or environment variables.

Do not commit real database passwords, API keys, connection strings, or production secrets.

## Portfolio Value

This project demonstrates:

* full-stack development with React, TypeScript, ASP.NET Core, EF Core, and PostgreSQL
* practical API design with Minimal APIs
* authentication and authorization with ASP.NET Identity
* protected backend/frontend admin flows
* validation and DTO-based lesson data handling
* structured multilingual learning content
* localization-first product thinking
* safe separation between public lesson reading and protected lesson editing
* deployment with Cloudflare Pages, Railway, and Supabase
* incremental architecture and roadmap planning
* awareness of automated testing, manual smoke testing, and usability evaluation

## About

Dive Into Vietnamese is an ongoing personal/product project built to support Vietnamese learning and teaching. It is also used as a portfolio project to demonstrate full-stack development, localization-aware architecture, and long-term product thinking.
