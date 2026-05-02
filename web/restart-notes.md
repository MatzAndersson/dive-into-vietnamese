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
## Next concrete coding task
Next 1h session:

Add a simple audio player to LessonDetailPage.

First 30 min:
- add `AudioUrl` to `Lesson`
- add `AudioUrl` to `LessonDto`
- add `AudioUrl` to `CreateLessonCommand`
- create and apply EF migration
- verify `audioUrl` appears in Swagger

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




Next 1h session:

Make explanation dynamic from the backend, and keep vocabulary static for one more session

Why:

one clear output
smaller scope
directly improves content structure
strengthens the “localized support content” direction
avoids overcomplicating the model too quickly

So the output becomes:

“Each lesson now has its own explanation text.”

## Completed tasks per session
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
Next 1h session:
lägg till en enkel audio player på lesson detail page

Det är nog det starkaste nästa steget, eftersom dina mål också betonar audio-based learning flows och en mer verklig learning experience

En bra uppdelning vore:

Första 30 min

lägg till audioUrl i backendmodell/DTO om det inte redan finns
seeda en lektion med en test-audiofil eller placeholder-url

Andra 30 min

rendera en enkel HTML audio player på detail page
visa rubrik som Audio
verifiera att spelaren fungerar på sidan

Det skulle ge dig ett väldigt tydligt nästa hopp från:
lesson page med struktur
till
lesson page med faktiskt lärinnehåll


- TypeScript config warning: baseUrl is deprecated, clean up later
- Update `PUT /api/lessons/{id}` to support `Level`, `ImageUrl`, and `Explanation`, or
- Start adding a simple dynamic lesson body/transcript field.

or
- refine lesson content structure for localization-first design
Next concrete coding task:
i18n installed: yes
Locale switcher exists: no
Current status: i18n is configured and the lessons page UI is wired for translation


