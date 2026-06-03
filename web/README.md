# Dive Into Vietnamese

Dive Into Vietnamese is an active full-stack language-learning platform project for learning Vietnamese. The project focuses on structured lesson content, multilingual interface design, and a localization-first technical architecture.

The goal is to build a practical learning tool that can support Vietnamese teaching and self-study, while also demonstrating full-stack development, multilingual UI design, structured lesson data, and safe backend/frontend architecture.

## Live Demo
Not deployed yet. A live demo will be added after authentication and deployment security have been strengthened.

## Project Status

This project is currently in active development.

The current version has a working backend/frontend lesson flow with public lesson reading and protected lesson write operations during local development. The project is not yet deployed as a public production application.

Current focus:

* improving the lesson experience and content structure
* strengthening authentication and deployment security
* expanding backend and frontend testing
* preparing for small-scale usability testing
* preparing for future deployment and private beta use

## Features Implemented

* Public lesson overview/list page
* Public lesson detail page
* Lesson create, edit, and delete flow for local/admin use
* Backend CRUD endpoints for lessons
* PostgreSQL persistence through Entity Framework Core
* DTO-based API responses
* Backend validation with FluentValidation
* Swagger/OpenAPI support for local API testing
* Reusable frontend lesson components
* Lesson levels and filtering
* Structured lesson content fields, including:

  * conversation JSON
  * vocabulary JSON
  * questions JSON
  * grammar JSON
  * practice links
* Prototype API-key protection for lesson write endpoints during local development

## Tech Stack

### Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* VS Code

### Backend

* ASP.NET Core
* C#
* Minimal APIs
* Entity Framework Core
* PostgreSQL
* FluentValidation
* Visual Studio

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
    LessonMapping.cs
    LessonValidationRules.cs
```

This keeps related endpoint logic, validation, mapping, and data handling close together while keeping the project simple enough for the current stage.

The frontend is also organized around feature areas:

```txt
src/
  features/
    lessons/
      components/
      pages/
      api.ts
      schema.ts
      types.ts
```

This structure is intended to make the application easier to grow as new features are added, such as authentication, teacher tools, student progress, Anki export, and interactive transcripts.

## Localization-First Direction

Dive Into Vietnamese is designed with a localization-first direction.

The project aims to demonstrate:

* multilingual UI planning
* structured content for language learning
* correct rendering of Vietnamese diacritics
* separation between lesson content and interface text
* content structures that can later support multiple explanation languages
* future support for teacher-managed lesson material
* future support for audio-linked transcripts and vocabulary workflows

This makes the project relevant not only as a full-stack web application, but also as a localization engineering and multilingual content workflow case study.

## Testing and Evaluation

The project includes a dedicated test project for backend testing, although automated test coverage is still being expanded.

Planned testing focus:

* validation tests for lesson creation and updates
* API tests for public lesson reading
* API tests for protected lesson write operations
* regression tests when authentication is replaced with ASP.NET Identity
* manual frontend smoke tests for the main learner and admin flows

Because this is a learning platform, usability testing is also part of the planned evaluation process. Before a wider release, the project will be tested with a small group of users to evaluate:

* whether learners understand the lesson flow
* whether Vietnamese text, translations, vocabulary, grammar, and practice links are presented clearly
* whether the interface is easy for students to navigate
* whether teacher/admin content editing is understandable for non-technical users
* whether the platform supports realistic teaching and self-study scenarios

This reflects the long-term goal of developing the project not only as a technical prototype, but as a usable educational product.


## Security Notes

The current API-key protection is used only for local prototype development.

It is not intended as production security, because frontend environment variables prefixed with `VITE_` are exposed in the browser bundle.

Before any online admin or teacher access is deployed, the project will replace this prototype protection with proper authentication and authorization, likely using ASP.NET Core Identity.

Planned production security direction:

* public users can read and use lessons
* only authenticated admin/teacher users can create, edit, or delete lessons
* secrets stored outside the repository
* Swagger disabled or protected outside development
* CORS restricted to the real frontend domain
* public registration disabled or restricted

## Current Limitations

The project is not yet a finished production platform.

Known limitations:

* admin authentication is still prototype-only
* teacher-friendly content editing is not finished
* some lesson content is still test/sample content
* deployment is not yet finalized
* the level filter may need frontend cleanup
* full student accounts and progress tracking are planned for later

## Roadmap

### Near-Term Roadmap


* review frontend lesson filter behavior
* review and update the backend framework and dependencies in a controlled upgrade
* replace prototype API-key protection with ASP.NET Identity
* protect lesson write endpoints with real authorization
* connect a proper frontend login flow
* prepare a safe private beta
* add backend tests for lesson validation and protected endpoints
* run manual frontend smoke tests before private beta
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

The project currently has separate frontend and backend applications.

### Frontend

```bash
cd web
npm install
npm run dev
```

### Backend

Open the backend solution in Visual Studio and run the ASP.NET Core API project.

The backend uses PostgreSQL through Entity Framework Core. Local database configuration should be handled with local development settings or environment variables.

Do not commit real database passwords, API keys, or production secrets.

## Portfolio Value

This project demonstrates:

* full-stack development with React, TypeScript, ASP.NET Core, EF Core, and PostgreSQL
* practical API design with Minimal APIs
* validation and DTO-based lesson data handling
* structured multilingual learning content
* localization-first product thinking
* safe separation between public lesson reading and protected lesson editing
* incremental architecture and roadmap planning
* awareness of automated testing, manual smoke testing, and usability evaluation

## About

Dive Into Vietnamese is an ongoing personal/product project built to support Vietnamese learning and teaching. It is also used as a portfolio project to demonstrate full-stack development, localization-aware architecture, and long-term product thinking.