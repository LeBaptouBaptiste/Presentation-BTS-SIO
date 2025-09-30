# Presentation BTS SIO

A Node.js and Express application that serves an informational website about the *Brevet de Technicien Supérieur Services Informatiques aux Organisations* (BTS SIO). It provides an overview of the SLAM and SISR tracks, downloadable resources, and a contact form whose submissions are stored in a local SQLite database.

## Features
- Static marketing site built with HTML, CSS, and vanilla JavaScript served from the `public/` directory.
- Dedicated subpages for the SLAM and SISR specializations plus a downloadable brochure.
- Contact form that posts to the Express backend and persists inquiries in `contacts.db`.

## Tech stack
- [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/) for the HTTP server.
- [SQLite](https://www.sqlite.org/) for lightweight, file-based persistence of contact form submissions.
- [Body-Parser](https://github.com/expressjs/body-parser) and [CORS](https://github.com/expressjs/cors) middleware for JSON parsing and cross-origin support.

## Prerequisites
- Node.js 18 or newer
- npm (bundled with Node.js)

## Installation
1. Clone this repository.
2. Install server dependencies:
   ```bash
   npm install
   ```

## Running the server
Start the Express server with:
```bash
node server.js
```

The server listens on port `3000` by default and serves the static site at `http://localhost:3000`. The SQLite database file (`contacts.db`) is created automatically in the project root if it does not already exist.

If you need to use a different port, update the `port` constant in `server.js` and restart the server.

## Project structure
```
.
├── public/            # Front-end assets (HTML, CSS, JS, images, brochure)
├── server.js          # Express server that serves static files and handles /submit
├── contacts.db        # SQLite database storing contact form entries
├── package.json       # Dependency manifest
└── package-lock.json  # Dependency lockfile
```

## Contact form data
Submissions sent from the `/contact` page are inserted into the `contacts` table inside `contacts.db`. You can inspect the data with any SQLite client. To clear stored messages during development, delete the `contacts.db` file before restarting the server (a fresh database will be generated automatically).

## Useful commands
| Purpose              | Command           |
| -------------------- | ----------------- |
| Install dependencies | `npm install`     |
| Run the server       | `node server.js`  |
