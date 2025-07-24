``` mermaid

sequenceDiagram
  participant browser
  participant server

  Note right of browser: JavaScript is used to handle the submit event. <br>The code handles creating a new note, and adding it to the notes list using the push() function. <br>The notes list is rerendered in the browser.

  browser->>server: POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
  activate server

  server-->>browser: HTTP Status code 201
  deactivate server


```
