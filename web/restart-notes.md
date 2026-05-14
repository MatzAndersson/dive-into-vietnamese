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

AutoMapper vulnerability warning remains for later


4. Add QuestionsJson backend
5. Add QuestionsJson frontend create/edit/display
6. Add GrammarJson backend
7. Add GrammarJson frontend create/edit/display
8. Add ExercisesJson backend
9. Add ExercisesJson frontend create/edit/display
10. Add answer key modal
11. Check/fix NuGet vulnerability warning
12. Add basic LessonValidator tests
13. Prepare first student-test version
14. Deploy private test version online
15. Build teacher-friendly structured editors

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
- Exercise content
- Answer key shown in modal/popup
