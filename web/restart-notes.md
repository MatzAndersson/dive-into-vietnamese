## Backend status


- API starts: yes
- Swagger works: yes
- Lessons endpoint works: yes
- DB works: yes
- pgAdmin update: not blocking, postpone until after current session
## Frontend status
- App starts: yes

- Lesson page exists: yes
- API connected: yes, frontend is making fetch requests to lessons endpoint and receiving 200/201 responses

- i18n installed: 
- Locale switcher exists: no
## What works
## What is broken
## Brand fonts and color palette added

brand-blue:   #0d4866
brand-orange: #f77f00
brand-yellow: #fcbf49
brand-light:  #f4f4f4
brand-dark:   #272727

The following fonts were added:


Be Vietnam Pro = main/default font
Mulish = supporting/body font
Droid Serif = serif/accent font
Remove database default for Lesson.Level
Require Level in Create/Update
Validate Level with IsInEnum()
Run a migration


## What to ignore for now
This repeats the create-form validation for now. Later we can move it to a shared helper.
## MVP target
## Current State

- dynamic title
- dynamic level
- dynamic description
- dynamic image
- dynamic explanation
- dynamic audio player
- dynamic vocabulary

Lesson detail page now supports:
- dynamic title
- dynamic level
- dynamic description
- dynamic image
- dynamic explanation
- dynamic lesson-level audio
- static vocabulary section
## Next concrete coding task

- run vulnerability scan again if not already done
- test frontend lesson list/detail once more
- optionally test register/login locally with a temporary user
- audit real admin authentication before private deployment
- build teacher-friendly lesson editors with optional raw JSON mode

Next steps:

- confirm Swagger still loads after the Auth changes
- optionally test register/login locally with a temporary user
- search solution for remaining MediatR references
- delete obsolete ValidationBehavior.cs and ApiKeyBehavior.cs if no longer used
- remove MediatR registration from Program.cs
- remove MediatR NuGet package from the API project
- run restore, build and vulnerability scan again
- audit real admin authentication before private deployment
- build teacher-friendly lesson editors with optional raw JSON mode
- deploy a secure private test version for lesson entry




Goal:
Improve Exercises section by hiding suggested answers behind a Show answers button.

Files:
LessonDetailPage.tsx

Tasks:
- add local state for showAnswers
- hide suggested answer cards by default
- add Show answers / Hide answers button at the end of the Exercises section
- test on lesson detail page

AutoMapper vulnerability warning remains for later




0. Commit current working Practice-link changes
   - ExercisesJson → practiceLink completed
   - Microsoft.AspNetCore.Mvc.Testing updated to 8.0.27
   - Note that old tests are currently obsolete/unsafe

1. Delete confirmed unsafe/outdated tests
   - GetAllTests.cs
   - UpdateDeleteTests.cs
   - CreateHandlerTests.cs
   - Keep any test files that are still relevant and do not access the real dev database

2. Remove AutoMapper from the Tests project
   - Remove AutoMapper package reference from DiveIntoVietnamese.Tests.csproj
   - Run dotnet restore and dotnet build

3. Remove AutoMapper from the API
   - Replace AutoMapper mapping with manual Lesson → LessonDto mapping
   - Update Create.cs, Update.cs, GetAll.cs and GetById.cs as needed
   - Remove MappingProfile.cs
   - Remove builder.Services.AddAutoMapper(typeof(Program));
   - Remove AutoMapper.Extensions.Microsoft.DependencyInjection from the API project

4. Confirm AutoMapper vulnerability warning is gone
   - Run:
     dotnet restore
     dotnet build
     dotnet list package --vulnerable --include-transitive

5. Remove MediatR while preserving feature folders
   - Keep Features/Lessons/Create.cs, Update.cs, Delete.cs, GetAll.cs, GetById.cs and Endpoints.cs
   - Change endpoints to call the feature methods directly
   - Remove ISender / IRequest / IRequestHandler usage
   - Remove MediatR registration and package reference

6. Move validation to explicit Create/Update validation
   - Keep FluentValidation
   - Validate create/update requests directly in their feature methods
   - Remove MediatR ValidationBehavior after it is no longer used
   - Check whether ApiKeyBehavior is obsolete; keep ApiKeyFilter for current route protection

7. Confirm CRUD still works from the frontend
   - list lessons
   - open lesson detail
   - create lesson
   - edit lesson
   - delete only a temporary test lesson
   - verify Practice link JSON still works

8. Audit real admin authentication before private deployment
   - Confirm that a browser-exposed API key is not relied on for online admin security
   - Decide on ASP.NET Identity/admin login or another secure staging access solution

9. Build teacher-friendly form editors with optional JSON mode
   - simple fields/buttons for normal lesson entry
   - advanced raw JSON textarea toggle for fast LLM-assisted content entry
   - start with Practice links, then Questions, Vocabulary, Grammar and Conversation

10. Deploy private test version online
   - only after admin access is protected
   - let your partner start entering/refining lesson material



4. Add QuestionsJson backend
5. Add QuestionsJson frontend create/edit/display
6. Add GrammarJson backend
7. Add GrammarJson frontend create/edit/display
8. Add ExercisesJson backend
9. Add ExercisesJson frontend create/edit/display
10. Add answer key modal"
Create a real landing page.

Goal:
- make `/` a proper learner-facing home page instead of only redirecting
- show a short hero section
- show level cards for Beginner, Intermediate, Advanced
- link cards to `/levels/beginner`, `/levels/intermediate`, `/levels/advanced`

Suggested steps:
- create `HomePage.tsx`
- update `/` route to render `HomePage`
- add level cards using shared level data
- add EN/VI i18n keys for landing page text

Next 1h session:

Split learner pages from admin/dev lesson management.

Goal:
- learner pages should not show create/delete controls
- admin/dev tools should move to `/admin/lessons`

Steps:
- create `AdminLessonsPage.tsx`
- copy current CRUD-style `LessonsPage` into it
- add route `/admin/lessons`
- remove `CreateLessonForm` from learner `LessonsPage`
- remove delete buttons from learner lesson cards
- keep search/filter and clickable lesson cards on learner pages


Next 1h session:
Add a simple audio player to LessonDetailPage.



Second 30 min:
- add `audioUrl` to frontend Zod schema
- render simple `<audio controls>` player on `LessonDetailPage`
- show fallback text if no audio exists
- create/test one lesson with an audio URL
- verify the player appears on the detail page

Backlog:
- update PUT later
- add playback speed UI later
- make vocabulary dynamic later
- handle transcript/audio sync later
- fix TypeScript baseUrl warning later

Future transcript/vocabulary direction:
- Long-term goal is clickable Vietnamese text.
- Users should be able to click individual words to see spelling, pronunciation, translation, and audio.
- Vocabulary items may later have their own `AudioUrl`.
- Transcript segments may later support sentence-level audio/timing.
- Anki export can later use selected vocabulary items or sentences.
- For now, keep the current `AudioUrl` as lesson-level audio only.


## Completed tasks per session

12/06
Session 8P: Manual frontend beta smoke test completed

11/06
Session 8N is complete:

Completed:
- Frontend API-key usage removed
- /identity/register blocked outside Development
- old prototype /api/auth endpoints hidden outside Development
- Swagger confirmed Development-only
- backend build succeeds
- backend vulnerability scan clean
- cookie/CORS setup works for frontend Identity login/admin CRUD

11/06
Session 8M is complete:

- Frontend login works
- Identity cookie is stored/sent correctly
- Admin create/edit/delete works from React
- Normal public lesson pages still work
- Frontend production build succeeds

11/06
Completed:
- Created /login page
- Added frontend Identity login request
- Used credentials: include for cookie login
- Added CORS credentials support in backend
- Successful login redirects to /admin/lessons
- Failed login shows error message

10/06
Session 8K completed:
- Added Admin and Teacher roles
- Added CanManageLessons authorization policy
- Seeded/assigned admin@test.local to Admin in Development
- Restricted lesson POST/PUT/DELETE to Admin or Teacher
- Confirmed anonymous users get 401
- Confirmed normal logged-in users get 403
- Confirmed Admin user can create lessons
- Public lesson GET remains open

09/06
Session 8J completed:
- Replaced ApiKeyFilter usage on lesson POST/PUT/DELETE with RequireAuthorization()
- Kept lesson GET endpoints public
- Confirmed anonymous POST, PUT and DELETE return 401 Unauthorized
- Confirmed public GET returns 200 OK
- Confirmed logged-in Identity user can create a lesson
- Confirmed Identity cookie login works with PowerShell WebSession
- ApiKeyFilter remains in the project temporarily for later cleanup

09/06
Session 8H: Map and test Identity endpoints locally

Completed:
- Mapped native ASP.NET Identity endpoints under /identity
- Hid Identity endpoints from Swagger with ExcludeFromDescription because Swagger crashed on them
- Kept old /api/auth/login and /api/auth/register temporarily
- Tested /identity/register successfully
- Tested /identity/login with correct password -> 200 OK
- Tested /identity/login with wrong password -> 401 Unauthorized
- Confirmed backend builds after stopping the running API process

03/06
Session 8C – Verify .NET 10 upgrade completed

Completed manual verification after upgrading backend to .NET 10.

Verified:
- Backend starts successfully on .NET 10.
- EF Core migration check runs.
- Database is already up to date.
- Swagger loads.
- `GET /api/lessons` works.
- `POST /api/lessons` without API key returns 401.
- `POST /api/lessons` with API key works.
- `PUT /api/lessons/{id}` with API key works.
- `DELETE /api/lessons/{id}` with API key works.
- Deleted test lesson returns 404.
- Frontend starts and works.
- Lesson flow works from frontend.


Known remaining warnings:
- `.WithOpenApi()` is deprecated in .NET 10.
- Swagger API-key lock/Authorize metadata is weakened after the OpenAPI compatibility fix.
- EF Core warns about the `Lesson.Level` database default/sentinel value.
- Test project currently has 0 discoverable tests.

Decision:
- .NET 10 upgrade is verified enough to keep.
- Swagger/OpenAPI warnings can be cleaned up later, likely during or after ASP.NET Identity work.
- Next technical step: Session 8D commit/checkpoint if not already committed, then Session 8E audit current Auth setup before Identity.

03/06
Session 8B – Upgrade backend to .NET 10 completed

Completed:
- Changed `DiveIntoVietnamese.Api` from `net8.0` to `net10.0`.
- Changed `DiveIntoVietnamese.Tests` from `net8.0` to `net10.0`.
- Updated Microsoft/EF Core/Npgsql packages:
  - Microsoft.AspNetCore.OpenApi 10.0.8
  - Microsoft.EntityFrameworkCore 10.0.8
  - Microsoft.EntityFrameworkCore.Design 10.0.8
  - Npgsql.EntityFrameworkCore.PostgreSQL 10.0.2
  - Swashbuckle.AspNetCore 10.2.1
  - Microsoft.AspNetCore.Mvc.Testing 10.0.8
  - Microsoft.EntityFrameworkCore.InMemory 10.0.8
  - Microsoft.EntityFrameworkCore.Relational 10.0.8
  - Microsoft.NET.Test.Sdk 18.6.0
  - xunit 2.9.3
  - xunit.runner.visualstudio 3.1.5

Build/verification:
- `dotnet build` succeeds on `net10.0`.
- `dotnet list package --vulnerable --include-transitive` reports no vulnerable packages.
- `dotnet test` runs on `net10.0`, but no tests are currently discoverable.

Small compatibility fixes:
- Updated OpenAPI namespace from `Microsoft.OpenApi.Models` to `Microsoft.OpenApi`.
- Removed old `OpenApiReference`-based Swagger security requirement metadata that broke under .NET 10/OpenAPI updates.
- Temporarily simplified `RequireApiKey` Swagger helper in lesson endpoints.
- Actual API-key protection through `ApiKeyFilter` is still unchanged.

Known warnings:
- `.WithOpenApi()` is deprecated in .NET 10.
- Left for now because prototype API-key Swagger metadata will likely be replaced/cleaned up during ASP.NET Identity work.



30/05
Completed:

- ran vulnerability scan
- confirmed DiveIntoVietnamese.Api has no vulnerable packages
- confirmed DiveIntoVietnamese.Tests has no vulnerable packages
- tested frontend lesson page after refactor
- confirmed lesson data still loads
- noted separate frontend dropdown/filter issue for later
- tested POST /api/auth/register in Swagger
- tested POST /api/auth/login in Swagger
- confirmed login returns the current dummy token
- confirmed Auth still works after removing MediatR

30/05
Completed:

- deleted obsolete MediatR behavior files
- removed empty Behaviors folder
- removed MediatR validation pipeline registration from Program.cs
- removed MediatR package reference from API project
- confirmed no remaining MediatR references in the solution
- confirmed backend builds successfully after full MediatR removal
- confirmed Swagger still works after MediatR removal

29/05
Completed:

- changed ExercisesJson from short-answer items to external Practice links
- updated frontend and backend validation for Practice-link JSON
- tested Practice-link create/edit/display flow successfully
- identified and removed vulnerable AutoMapper dependency
- updated Microsoft.AspNetCore.Mvc.Testing to fix transitive System.Text.Json vulnerability
- deleted obsolete unsafe test files
- removed AutoMapper from the API and Tests projects
- created LessonMapping.cs and replaced AutoMapper usage in lesson handlers
- deleted MappingProfile.cs and removed AutoMapper registration from Program.cs
- confirmed both projects build successfully and vulnerability scan is clean
- created reusable ValidationFilter.cs for direct FluentValidation in Minimal API endpoints
- converted lesson GetAll, GetById, Create, Update and Delete away from MediatR
- updated lesson endpoints to call feature methods directly
- applied ValidationFilter to lesson POST and PUT routes
- fixed Swagger schema conflict by renaming the update request model to UpdateLessonRequest
- confirmed Swagger works again
- confirmed frontend lesson list, detail, create, edit and delete flows work successfully
- confirmed ApiKeyFilter still protects lesson write routes
- converted Login and Register away from MediatR
- updated Auth endpoints to call Login.HandleAsync and Register.HandleAsync directly
- applied ValidationFilter to login and register routes
- confirmed backend builds successfully after Auth refactor

29/05
Completed:

- no vulnerable NuGet packages reported
- GetAll converted away from MediatR
- GetById converted away from MediatR
- Delete converted away from MediatR and builds
- frontend lesson list and lesson detail tested successfully

29/05
- removed obsolete unsafe test files
- updated Microsoft.AspNetCore.Mvc.Testing to fix transitive vulnerability
- removed AutoMapper from Tests project
- created LessonMapping.cs
- replaced AutoMapper usage in GetAll.cs
- replaced AutoMapper usage in GetById.cs
- replaced AutoMapper usage in Create.cs
- replaced AutoMapper usage in Update.cs
- deleted MappingProfile.cs
- removed AddAutoMapper registration from Program.cs
- removed AutoMapper package dependency from API project
- confirmed vulnerability scan is clean

26/05

Completed:

started dependency/security cleanup session
created separate refactor branch for AutoMapper/MediatR removal
identified vulnerable AutoMapper 12.0.1 dependency
identified transitive System.Text.Json 8.0.4 vulnerability in test project
updated Microsoft.AspNetCore.Mvc.Testing from 8.0.7 to 8.0.27
confirmed System.Text.Json vulnerability no longer appears
identified old integration tests as outdated/unsafe against development database
deleted obsolete tests:

CreateHandlerTests.cs
GetAllTests.cs
UpdateDeleteTests.cs

removed direct AutoMapper reference from DiveIntoVietnamese.Tests.csproj
created LessonMapping.cs for explicit DTO mapping
replaced AutoMapper handler usage in:

GetAll.cs
GetById.cs
Create.cs
Update.cs

confirmed solution builds with manual mapping in place
confirmed remaining AutoMapper references are only:

MappingProfile.cs
Program.cs
DiveIntoVietnamese.Api.csproj

Next:

remove final AutoMapper references from API
run build and vulnerability check
confirm AutoMapper warning disappears
commit completed AutoMapper refactor
then start separate MediatR removal session

19/05

Completed:

updated ExercisesJson from old shortAnswer format to new practiceLink format
decided learner-facing section should be called Practice
kept backend/API field name as exercisesJson for now
updated LessonDetailPage.tsx
updated lessonJsonValidation.ts
updated CreateLessonForm.tsx
updated AdminLessonsPage.tsx
updated backend LessonValidationRules.BeValidExercisesJson
updated backend .WithMessage(...) for ExercisesJson in LessonValidator.cs
confirmed no database migration was needed
tested create/edit flow with new practice-link JSON
confirmed Practice section displays clickable external Wordwall/practice link
confirmed optional note displays account/access information

15/05

Completed:

started frontend GrammarJson + ExercisesJson session
confirmed both backend fields should now be added to frontend
updated frontend data flow:
types.ts
schema.ts
api.ts checked, no extra changes needed because input object is sent directly
lessonJsonValidation.ts

added frontend validation for:
validateGrammarJson
validateExercisesJson

updated create/edit/display flow:
CreateLessonForm.tsx
AdminLessonsPage.tsx
LessonDetailPage.tsx

added learner-facing display sections for:
Grammar
Exercises

15/05
Completed:
started backend ExercisesJson session
decided on simple flexible exercise shape:
[{"type":"shortAnswer","instruction":"Answer the question in Vietnamese.","prompt":"Hành khách mua vé khứ hồi hay một chiều?","answer":"Hành khách mua vé một chiều."}]
added exercisesJson to backend lesson flow:
Lesson
LessonDto
CreateLessonCommand
UpdateLessonCommand
UpdateLessonRequest
Create.Validator
Update.Validator
Update.Handler
Endpoints.cs
added BeValidExercisesJson to LessonValidationRules.cs
kept validation consistent with existing structured JSON fields
created/applied EF migration for ExercisesJson
tested ExercisesJson successfully in Swagger

14/05

Completed:

started backend GrammarJson session
added grammarJson to backend lesson flow:
Lesson
LessonDto
CreateLessonCommand
UpdateLessonCommand
UpdateLessonRequest
Create.Validator
Update.Validator
Update.Handler

added BeValidGrammarJson to LessonValidationRules.cs
kept validation consistent with existing structured JSON fields
created/applied EF migration for GrammarJson
fixed issue where running API process locked build file
tested GrammarJson successfully in Swagger

14/05
Completed:

started frontend QuestionsJson session
confirmed frontend should keep lessonJsonValidation.ts alongside backend LessonValidationRules.cs
added questionsJson to frontend types/API input flow:
CreateLessonInput
UpdateLessonInput
Lesson
Zod schema
added validateQuestionsJson
updated CreateLessonForm to create lessons with questionsJson
updated AdminLessonsPage edit flow with questionsJson
added questionsJson field to edit/create handling
added Questions display section to LessonDetailPage
tested create flow successfully
confirmed Questions display works on lesson detail page

13/05
Completed:

added backend support for QuestionsJson
updated CreateLessonCommand
updated UpdateLessonCommand
added UpdateLessonRequest for cleaner PUT body
updated PUT endpoint to combine route id with request body
added simple QuestionsJson validation via LessonValidationRules
decided questions are reflection/comprehension questions for now
required shape is only:
question
fixed test constructors after adding QuestionsJson
ran dotnet build
confirmed build works

12/05
Completed:

created shared backend validation file:
LessonValidationRules.cs
added shared max length constants for lesson fields
updated Create.Validator to use LessonValidationRules
updated Update.Validator to use LessonValidationRules
added backend validation for conversationJson
added backend validation for vocabularyJson
confirmed empty/null JSON fields are allowed
confirmed invalid conversationJson returns 400 Bad Request
confirmed PUT uses id as a separate route parameter in Swagger
fixed Update.cs structure/bracing issue
fixed test build errors after updated command constructors
ran dotnet build
confirmed API and test project build successfully

Notes:

no migration was needed
AutoMapper vulnerability warning remains for later
optional cleanup later:
clean up UpdateDeleteTests
next planned feature:
add QuestionsJson backend

12/05
Completed:
- added project brand fonts and color palette as centralized design tokens
- added Google Fonts import for:
  - `Be Vietnam Pro`
  - `Mulish`
  - `Droid Serif`
- set `Be Vietnam Pro` as the main/default site font
- added Tailwind theme tokens for brand colors:
  - `brand-blue`: `#0d4866`
  - `brand-orange`: `#f77f00`
  - `brand-yellow`: `#fcbf49`
  - `brand-light`: `#f4f4f4`
  - `brand-dark`: `#272727`
- updated global app background/text styling
- updated `App.tsx` wrapper with:
  - `min-h-screen`
  - `bg-brand-light`
  - `text-brand-dark`
- lightly updated `HomePage` styling with brand colors
- lightly updated `Navbar` styling with brand colors
- lightly updated `LessonCard` styling with brand colors
- confirmed learner pages still work
- confirmed admin Edit/Delete buttons still work

Notes:
- this is only the first brand/design foundation
- partner may still change colors/design later
- because colors/fonts are now centralized, future design changes should be easier
- avoid manually sprinkling random colors everywhere
- use brand tokens where possible

12/05
Completed:
- created shared frontend validation file:
  - `src/features/lessons/lessonJsonValidation.ts`
- moved duplicated `validateVocabularyJson` logic out of:
  - `CreateLessonForm.tsx`
  - `AdminLessonsPage.tsx`
- imported shared validation functions into create/edit flows
- added `validateConversationJson`
- updated create lesson flow to validate:
  - `conversationJson`
  - `vocabularyJson`
- updated edit lesson flow to validate:
  - `conversationJson`
  - `vocabularyJson`
- confirmed empty `conversationJson` works when creating a lesson
- confirmed empty `conversationJson` works when editing a lesson
- confirmed valid `conversationJson` saves
- confirmed invalid `conversationJson` is blocked
- confirmed vocabulary validation still works

Current shared validators:
- `validateVocabularyJson`
- `validateConversationJson`

Current conversation JSON shape:
[
  {
    "speaker": "Mai",
    "vietnamese": "Xin chào anh.",
    "english": "Hello."
  }
]

Current conversation validation rules:
- empty field is allowed
- if filled, it must be valid JSON
- it must be a JSON array
- each item must include:
  - `speaker`
  - `vietnamese`
  - `english`

Current vocabulary JSON shape:
[
  {
    "vietnamese": "xin chào",
    "english": "hello",
    "vietnameseExample": "Xin chào, anh khỏe không?",
    "englishExample": "Hello, how are you?"
  }
]

Current vocabulary validation rules:
- empty field is allowed
- if filled, it must be valid JSON
- it must be a JSON array
- each item must include:
  - `vietnamese`
  - `english`
  - `vietnameseExample`
  - `englishExample`

Notes:
- `lessonJsonValidation.ts` is `.ts` because it contains helper functions only, not JSX
- frontend validation improves UX but is not enough for security
- backend validation is still needed next
- current edit validation errors use browser `alert()`
- this is acceptable for now, but should be replaced later with inline errors or a custom modal

Future conversation flexibility note:
- do not assume every conversation is exactly two speakers
- later support:
  - two-speaker dialogues
  - multi-speaker dialogues
  - chosen/variable number of speakers
  - one-speaker storyteller/narration format
  - MandarinBean-style story/transcript format
- current JSON shape can already support narration by using `"speaker": "Narrator"`
- later teacher-friendly editor should support:
  - add/remove speakers
  - dialogue mode
  - story/narrator mode
  - maybe hide speaker labels when there is only one narrator

11/05
Completed:
- added `conversationJson` to lessons
- used existing `audioUrl` as full conversation audio
- added conversation field to create lesson form
- added conversation field to edit lesson modal
- rendered Conversation section on `LessonDetailPage`
- added speaker-left / dialogue-right layout
- added English On/Off toggle
- confirmed conversation renders correctly on lesson detail page

Current conversation JSON shape:
[
  {
    "speaker": "Mai",
    "vietnamese": "Xin chào anh.",
    "english": "Hello."
  }
]
11/05
Completed:
- upgraded `vocabularyJson` to support a richer 4-field structure:
  - `vietnamese`
  - `english`
  - `vietnameseExample`
  - `englishExample`
- updated `LessonDetailPage` to render vocabulary as a 4-column table
- changed table headings to:
  - Vietnamese
  - Meaning
  - Example sentence
  - Translation
- updated vocabulary validation in both create and edit flows
- updated vocabulary placeholder/helper text in both create and edit forms
- confirmed create/edit works with the new vocabulary shape
- confirmed vocabulary renders correctly on the lesson detail page
11/05
Completed:
- polished `LessonDetailPage` hero/banner layout
- replaced separate lesson image block with a full-width hero/banner section
- used `lesson.imageUrl` as a background-style hero image
- added dark overlay for readable hero text
- placed lesson level, title, and description in the hero section
- added fallback hero styling for lessons without images
- kept explanation, audio, and vocabulary sections below the hero
- made most of `LessonCard` clickable instead of only the title
- kept admin Edit/Delete actions outside the clickable card link
- added subtle card hover effect
- confirmed learner cards still open lesson detail pages correctly
- confirmed admin Edit/Delete actions still work
10/05
Completed:
- refactored `LessonCard` to support optional `actions`
- moved admin Edit/Delete actions into the card instead of placing Edit below the card
- moved level badge to the top-right of the card image area
- added an intentional missing-image placeholder instead of broken/empty image space
- kept learner cards clean by only showing admin actions when passed from `AdminLessonsPage`
- updated `AdminLessonsPage` to pass Edit/Delete buttons through `LessonCard` actions
- confirmed learner lesson cards still work
- confirmed admin Edit/Delete actions still work
10/05
Completed:
- expanded backend `UpdateLessonCommand` to support current lesson fields
- updated backend `PUT /api/lessons/{id}` handler to save:
  - title
  - description
  - level
  - imageUrl
  - explanation
  - audioUrl
  - vocabularyJson
- confirmed `src/lib/api.ts` already supports `api.put`
- added `updateLesson` function in `src/features/lessons/api.ts`
- added simple edit flow in `/admin/lessons`
- added Edit button for each lesson
- added prefilled edit form for current lesson fields
- changed edit form into a modal instead of inline form
- added `key={editingLesson.id}` so switching lessons resets the form correctly
- added vocabulary JSON validation before update
- added cursor pointer styling to edit modal buttons
- confirmed updates save correctly
- confirmed updated lesson data renders correctly

Notes:
- Edit/Delete button placement in the cards still needs layout polish.
- Current temporary layout has Edit button outside the card.
- Better future card layout:
  - level badge in top-right
  - Edit/Delete buttons inside the card at the bottom
  - better handling of missing/broken images

Next:
- polish `LessonCard` admin actions/layout
- then continue with `ConversationJson`, `QuestionsJson`, or `GrammarJson`
10/05
Completed:
- checked backend `PUT /api/lessons/{id}` endpoint
- confirmed endpoint existed but only updated title and description
- expanded `UpdateLessonCommand` to support current lesson fields
- updated backend handler to save:
  - title
  - description
  - level
  - imageUrl
  - explanation
  - audioUrl
  - vocabularyJson
- confirmed `src/lib/api.ts` already has `api.put`
- added frontend `updateLesson` function in `src/features/lessons/api.ts`
09/05
Completed:
- improved `CreateLessonForm` usability and safety
- kept existing technical field name `audioUrl`
- clarified audio field visually as “Conversation audio URL”
- added helper text for image URLs
- added helper text for conversation audio URLs
- added vocabulary JSON helper text with the expected format
- added `validateVocabularyJson`
- allowed empty vocabulary JSON field
- added validation that vocabulary JSON must be valid JSON
- added validation that vocabulary JSON must be an array
- added validation that each vocabulary item must include `vietnamese` and `english`
- confirmed invalid vocabulary JSON now shows a clear error message
- confirmed lesson creation still works from `/admin/lessons`

Notes:
- `audioUrl` was not renamed because it is already used across the backend, API, frontend schema, frontend type, and lesson detail page
- vocabulary JSON currently uses this shape:

[
  {
    "vietnamese": "xin chào",
    "english": "hello"
  }
]

05/05
Completed:
- upgraded `CreateLessonForm` with existing backend/frontend fields
- added level select
- added image URL field
- added explanation field
- added conversation audio URL field using existing `audioUrl`
- added vocabulary JSON field
- updated `createLesson` input type in `api.ts`
- confirmed `LessonSchema` already supports the richer fields
- tested creating a richer lesson from `/admin/lessons`
- confirmed explanation renders on lesson detail page
- confirmed vocabulary renders when using the expected JSON shape
- confirmed image and audio work with valid direct URLs

05/05
Completed:
- moved EN/VI language switcher into `Navbar`
- made language switching available globally
- removed duplicate language buttons from `LessonsPage`
- removed duplicate language buttons from `AdminLessonsPage`
- confirmed language switcher works on learner pages and admin page

05/05
Completed:
- created `HomePage`
- changed `/` from redirect to real landing page
- added hero section for Dive Into Vietnamese
- added Beginner, Intermediate, Advanced level cards
- linked level cards to `/levels/beginner`, `/levels/intermediate`, `/levels/advanced`
- added EN/VI i18n keys for homepage text
- confirmed landing page works in browser
05/04
Completed:
- created `AdminLessonsPage`
- added `/admin/lessons` route
- kept create/delete lesson tools on admin page
- cleaned learner-facing `LessonsPage`
- removed `CreateLessonForm` from learner pages
- removed delete buttons from learner lesson cards
- updated `LessonCard` so delete button only shows when `onDelete` exists
- confirmed `/admin/lessons` still has admin/dev tools
- confirmed `/levels/beginner`, `/levels/intermediate`, `/levels/advanced` are learner-facing only
05/03
Completed:
- created shared `Navbar` component
- added `Home`, `Beginner`, `Intermediate`, `Advanced` navigation
- added navbar i18n keys for EN/VI
- added `/levels/:level` route
- updated `LessonsPage` to read level from route with `useParams`
- mapped route levels to lesson levels: `beginner`, `intermediate`, `advanced`
- kept old query filter support for `/lessons?level=...`
- fixed lesson type mismatch by allowing nullable API fields
- cleared old Vite starter CSS from `App.css`
- verified level navigation and filtering works

05/02
Completed:
- added `VocabularyJson` to backend lesson model and DTO
- added `VocabularyJson` to create command
- created and applied EF migration
- verified Swagger response includes `vocabularyJson`
- created/tested a lesson with vocabulary JSON
- added `vocabularyJson` to frontend Zod schema
- added safe vocabulary parsing in `LessonDetailPage`
- replaced hardcoded vocabulary with dynamic backend content
- added fallback text when no vocabulary exists
05/02

Completed:
- added `AudioUrl` to backend lesson model and DTO
- added `AudioUrl` to create command
- created and applied EF migration
- verified Swagger response includes `audioUrl`
- created a test lesson with an audio URL
- added `audioUrl` to frontend Zod schema
- rendered a simple audio player on lesson detail page
- verified the audio player works

05/02
Completed:

added Explanation field to lesson backend model and DTO
added migration and updated database
updated frontend lesson schema with explanation
replaced hardcoded explanation text with dynamic backend content
renamed React Query data to lesson for clearer code
created and tested a lesson with real explanation text
lesson detail page now shows lesson-specific explanations

Note:

vocabulary is still static
PUT endpoint still needs updating later for explanation/level/imageUrl
05/01
Completed:
- polished lesson detail page layout
- added explanation section
- added simple vocabulary section
- page now feels like a real lesson flow, not just CRUD

Completed:
- added GET /api/lessons/{id} backend endpoint
- added getLessonById frontend API function
- created lesson detail page
- added /lessons/:id route
- made lesson cards clickable
- verified detail page loads real lesson data




## Notes

Backlog UI polish:
Replace the built-in browser confirm dialog for deleting lessons with a custom delete confirmation modal.

Reason:
- Looks more professional
- Can show lesson title before deletion
- Can use brand styling
- Can make destructive action clearer

/api/auth/login and /api/auth/register are still old prototype auth endpoints.
/identity/register is still publicly available locally.

Important Note: public Identity registration is still available at /identity/register. That is okay locally for now, but before deployment we should disable or restrict registration.

Known issue:

- LessonsPage level dropdown/filter needs review
- selected level appears in the URL, but filtering/dropdown behavior may not be fully reliable
- likely frontend issue in FilterBar, listLessons query params, or level comparison
- not related to the MediatR/AutoMapper backend refactor
- fix in a later frontend cleanup session

Notes for later:



remove MediatR while keeping feature-folder structure
add new tests later using an isolated test database
replace temporary API-key protection before private online deployment
build teacher-friendly form editors with structured fields plus optional raw JSON mode

old lessons with the previous shortAnswer exercise format need to be cleared or converted before saving
keep practiceLink simple for now
later, build real exercises/games as a separate feature or route, for example /lessons/:id/practice
possible future exercise item types: multipleChoice, fillInBlank, matching, listening
consider renaming/restructuring exercisesJson later only when the full practice feature is designed
Notes:

Exercises currently show suggested answers immediately
next polish session:
hide suggested answers by default
add Show answers / Hide answers button at end of Exercises section
this can replace the planned answer key modal for now
future option:
students type answers first, then answer checking/scoring can be added later

Notes:

ExercisesJson is still simple practice tasks only
no scoring, answer checking, multiple choice UI, or quiz engine yet
exercise design can be refined later after partner/student feedback
found security overlap:
ApiKeyFilter and ApiKeyBehavior currently both check API key
cleanup postponed
next likely session: GrammarJson or ExercisesJson frontend create/edit/display

Security cleanup later:
ApiKeyFilter and ApiKeyBehavior currently overlap.
Write endpoints are already protected through ApiKeyFilter in Endpoints.cs.
Later choose one approach to avoid duplicate API key checks.
Preferred short-term cleanup: keep ApiKeyFilter for endpoint-level protection and remove ApiKeyBehavior/IRequireApiKey unless needed elsewhere.

Notes:

GrammarJson is still simple grammar notes only
expected shape:
[{"title":"Using có...không?","explanation":"This structure is used to form yes/no questions.","vietnameseExample":"Anh có khỏe không?","englishExample":"Are you well?"}]
no quiz logic, grammar library, tags, ordering, or audio yet
teacher-friendly grammar editor is postponed
next likely session: GrammarJson frontend create/edit/display

Notes:

QuestionsJson is still simple reflection/comprehension questions only
expected shape:
[{"question":"What is this conversation about?"}]
no answer/options/quiz logic yet
teacher-friendly question editor is postponed
optional later polish:
add inline validation instead of alerts
improve admin form layout
localize “Questions” and helper text

Notes:


no quiz logic, answers, or options yet


This solution contains packages with vulnerabilities.
Change cancel button in CreateLessonform s it's at the bottom right. 
Change to customised modal for delete confirmation when deleting lesson
Change to customised modal for error format when editing lesson after adding frong format

"Later UI polish / admin usability:
1. Replace validation alert with inline error message inside the edit modal.
2. Show field-specific error text under conversationJson/vocabularyJson.
3. Replace delete browser confirmation with a custom confirmation modal.
4. Make delete modal clearly show which lesson will be deleted.
5. Possibly require typing the lesson title before deleting, if lessons become important/paid content."

Now:
Keep current validation: speaker + vietnamese + english.

Later:
Make the editor more flexible:
- add/remove speakers
- support narrator/story mode
- support dialogue mode
- maybe hide speaker labels when there is only one narrator

Notes:
- `audioUrl` is still the technical field name, but it now represents full conversation audio.
- No separate `conversationAudioUrl` field is needed for now.
- Word hover translation, sentence-level audio, word-level audio, and timed transcript highlighting are postponed.

 What is still missing:
- vocabulary table headings are currently likely hardcoded and should later be moved to i18n keys
- raw JSON textarea is still not teacher-friendly
- create/edit forms still require technical JSON input
- old lessons may need to be updated manually to the new 4-field vocabulary shape
- vocabulary table may need responsive/mobile polish later
- no separate vocabulary row editor yet
- no vocabulary item audio yet
- no sorting/reordering of vocabulary items yet
## Backlog:

Update to NEt 10 later

Backlog / future polish:
- replace validation `alert()` in edit modal with inline error message
- show field-specific error text under `conversationJson` / `vocabularyJson`
- replace browser delete confirmation with custom confirmation modal
- make delete modal clearly show which lesson will be deleted
- possibly require typing lesson title before deleting important/paid content
- make raw JSON fields teacher-friendly later
- build conversation row editor later:
  - speaker
  - Vietnamese line
  - English translation
- build vocabulary row editor later:
  - Vietnamese word
  - English word
  - Vietnamese example sentence
  - English sentence meaning
- eventually create reusable structured-field editors for:
  - conversation
  - vocabulary
  - questions
  - grammar
  - exercises

Backlog:
- add validation for `conversationJson`
- localize Conversation / English On / English Off / fallback text
- later add teacher-friendly conversation row editor instead of raw JSON
- later add word hover tooltips
- later add sentence-level or word-level audio
- later add transcript/audio highlighting
Next:




Backlog:
- build teacher-friendly conversation editor instead of raw JSON textarea
  - add/remove dialogue rows
  - each row has:
    - speaker
    - Vietnamese line
    - English translation
  - convert rows to `conversationJson` behind the scenes before saving
- later do the same for vocabulary:
  - Vietnamese
  - Meaning
  - Example sentence
  - Translation
- eventually create reusable editor components for structured lesson fields

 - extract shared vocabulary validation to avoid duplication
- add Grammar field:
  - grammar case
  - explanation
  - sentence example
- add Exercises field below Grammar
- add answer key modal/popup for exercises
- apply fonts and color palette as design tokens once received



11/05
 Notes / future polish:
- consider localizing remaining hardcoded lesson detail labels such as “Lesson”, “Explanation”, “Audio”, “Vocabulary”, and fallback messages
- consider further MandarinBean-inspired layout improvements later
- later add learner display toggles, such as show/hide translation, vocabulary, grammar, or explanation

Notes / future polish:
- make most or all of the lesson card clickable, not only the title
- add subtle hover effect to cards, for example slight lift, shadow, or background change
- improve lesson detail page image layout
- instead of showing lesson image as a separate content block, consider using it as a wide hero/banner background
- use MandarinBean-inspired detail layout as reference:
  - dark or visually distinct hero section
  - title and metadata over/near the banner
  - audio/transcript content below
- keep admin card layout separate from learner-facing card behavior where needed

Fix later:
- redesign card layout so level badge is top-right
- move Edit/Delete buttons to the bottom inside the card
- handle cards with missing/broken images better

- add edit lesson function in `/admin/lessons`
- update backend `PUT /api/lessons/{id}` to support all current fields:
  - title
  - description
  - level
  - imageUrl
  - explanation
  - audioUrl
  - vocabularyJson
- add edit form/modal in frontend admin page
- prefill edit form with existing lesson data
- invalidate React Query lesson list and detail queries after update

- later improve `LessonDetailPage` layout inspired by MandarinBean:
  - reuse the lesson/card image as a wide banner or hero image on the detail page
  - place title/level/summary over or near the banner
  - add toggle buttons for learner display options
  - first useful toggle: show/hide translation
  - possible later toggles: show/hide vocabulary, show/hide grammar notes, show/hide extra explanation
- do not prioritize pronunciation/transliteration as a general feature for Vietnamese
  - unlike Chinese pinyin, pronunciation support is mostly useful for beginner/pronunciation lessons
  - for normal lessons, focus more on translation, audio, vocabulary, grammar, and comprehension

  - later improve `LessonDetailPage` layout inspired by MandarinBean:
  - reuse the lesson/card image as a wide banner or hero image on the detail page
  - place title/level/summary over or near the banner
  - add toggle buttons for learner display options
  - first useful toggle: show/hide translation
  - possible later toggles: show/hide vocabulary, show/hide grammar notes, show/hide extra explanation
- do not prioritize pronunciation/transliteration as a general feature for Vietnamese
  - unlike Chinese pinyin, pronunciation support is mostly useful for beginner/pronunciation lessons
  - for normal lessons, focus more on translation, audio, vocabulary, grammar, and comprehension

Backlog:
- improve CreateLessonForm usability and design
- add helper/example text for valid vocabulary JSON shape
- rename lesson detail heading from `Audio` to `Conversation audio`
- later support vocabulary item audio URLs
- later add `ConversationJson`
- later add `QuestionsJson`
- later add `GrammarJson`

- later protect `/admin/lessons` with ASP.NET Identity

- later upgrade `CreateLessonForm` with existing fields: level, imageUrl, explanation, audioUrl, vocabularyJson
- later add new content fields one at a time: conversationJson, questionsJson, grammarJson
- keep full auth/CMS/teacher dashboard postponed

Backlog:
- separate student-facing lesson list from admin/teacher CRUD later
- for demo polish, hide create form and delete buttons from `/lessons`
- later create `/admin/lessons` for create/edit/delete
- Turn /lessons into a clean student-facing lesson browser
- update PUT endpoint to support Explanation, ImageUrl, Level, and AudioUrl
- later add transcript/word-level audio support
- later explore TTS or generated audio workflow


- TypeScript config warning: baseUrl is deprecated, clean up later
- Update `PUT /api/lessons/{id}` to support `Level`, `ImageUrl`, and `Explanation`, or
- Start adding a simple dynamic lesson body/transcript field.

or
- refine lesson content structure for localization-first design
Next concrete coding task:
i18n installed: yes
Locale switcher exists: no
Current status: i18n is configured and the lessons page UI is wired for translation

## From Binh
 
 Coloring
 Lesson title should be orange
 All the title for fields (vocabulary,explanatio etc.) should be blue
 Brödtext in field should be brand-dark, And if possible the neew vocabulary for each lesson should be red.
 New vocabulary words in vocabulary field should be orange, and the rest blue
 The grammar words should be orange
 All words in Grammar and Vocabulary should also have audio
 THe grammar fields should be numbered
 Exercise have link to wordWall exercises, make link clickable, inform user about having to create a free account
 Add field titles in the createLessonPage and editLessonform

Perhaps add additional optional image field to the vocabulary field, and the other grammar and conversation fields, but for later.
 
 !!Vocabulary = 4 column table, VN word, EN word, Vn Sentence, En Sentence!!

 Vocabulary table
- Vietnamese word
- English word
- Vietnamese example sentence
- English sentence meaning

Grammar section
- Grammar case
- Explanation
- Sentence example

Exercises section
- Just add link to Wordwall with exerciese
- Perhaps later create a full feature for exercises

- Exercise content
- Answer key shown in modal/popup
