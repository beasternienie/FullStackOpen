```mermaid

sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://fullstack-exampleapp.herokuapp.com/new_note
  activate server
  server-->>browser: HTTP Status code 302
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server-->>browser: HTML Document
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server-->>browser: CSS File
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp.main.js
  activate server
  server-->>browser: JavaScript File
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server-->>browser: The JSON contents
  deactivate server

```
  
