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
## What to ignore for now
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




## Backlog:

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


