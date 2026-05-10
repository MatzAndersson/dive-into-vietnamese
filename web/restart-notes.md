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

Next 1h session:
Goal: make existing lessons editable for the fields we already support.

First 30 min:
- inspect backend update endpoint / command
- check whether `PUT /api/lessons/{id}` supports:
  - title
  - description
  - level
  - imageUrl
  - explanation
  - audioUrl
  - vocabularyJson

Second 30 min:
- update backend/frontend types if needed
- prepare a simple edit flow or at least make the API ready for editing

2. check whether backend `PUT /api/lessons/{id}` supports all current fields
3. add/edit lesson function for current fields
4. polish `AdminLessonsPage`
5. add `ConversationJson`
6. add `QuestionsJson`
7. add `GrammarJson`

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




## Backlog:

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


