# Music Event & Artist Management System

A CIE-2 full-stack project using React.js, Express.js, Node.js and MySQL.

## Project Structure

```text
music-event/
├── server/
│   ├── server.js
│   └── package.json
└── client/
    ├── index.html
    ├── package.json
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   └── ArtistCard.jsx
        ├── pages/
        │   ├── Dashboard.jsx
        │   ├── Artists.jsx
        │   ├── Events.jsx
        │   └── AddEvent.jsx
        ├── App.jsx
        ├── index.css
        └── main.jsx
```

## Setup

1. Install Node.js and MySQL.
2. Open `server/server.js` and replace `YOUR_MYSQL_PASSWORD` with your MySQL password.
3. Terminal 1:
   `cd server` then `npm install` then `npm start`
4. Terminal 2:
   `cd client` then `npm install` then `npm run dev`
5. Open the Vite URL shown in the terminal.

The server automatically creates the `music_event` database and `events` table.

## Features

- Dashboard with artist, event, upcoming and genre counts
- Artists view with reusable ArtistCard components and search
- Events management view with searchable event table
- Add Event form with controlled inputs and validation
- React Router navigation between Dashboard, Artists, Events and Add Event
- React state, hooks, event handling and class ErrorBoundary
- Express GET and POST REST APIs
- MySQL database storage
- Responsive CSS for smaller screens
