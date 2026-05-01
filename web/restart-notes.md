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
## Completed tasks per session
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



- TypeScript config warning: baseUrl is deprecated, clean up later


or
- refine lesson content structure for localization-first design
Next concrete coding task:
i18n installed: yes
Locale switcher exists: no
Current status: i18n is configured and the lessons page UI is wired for translation


