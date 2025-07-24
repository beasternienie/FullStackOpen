``` mermaid

sequenceDiagram
  participant browser
  participant server

  Note right of browser: User inputs URL into navigation bar.

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
  activate server
  server-->>browser: HTML Document
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server-->>browser: Style Sheet
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
  activate server
  server-->>browser: JavaScript Document
  deactivate server

  Note right of browser: Browser executes JavaScript code to fetch the JSON data.

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server-->>browser: Notes data.
  deactivate server

  Note right of browser: Browser renders the page.

```
