# URL Shortener

A full-stack URL shortener with click analytics, user authentication, and subdomain-based redirect routing. Users can shrink long URLs into short, shareable links and track how many times each link is clicked over time.

> Replace this section with your project's actual name, tagline, and a live demo link if you have one.

## Features

- 🔗 Shorten any URL into a compact, shareable link
- 👤 User authentication (register/login) — short links are tied to your account
- 📊 Per-link analytics with click counts and a visual graph, filterable by date range
- 📋 One-click copy to clipboard
- 🌐 Subdomain-based redirects (`url.yourdomain.com/s/xxxxx`) kept separate from the main app (`www.yourdomain.com`)
- ⚡ Fast redirects handled directly by the backend via HTTP 302

## Tech Stack

**Frontend**
- React (Vite)
- React Router — with a custom subdomain-aware router setup
- Tailwind CSS
- react-hook-form — form handling & validation
- react-hot-toast — toast notifications
- Material UI (`@mui/material`) — Tooltip component
- react-icons, dayjs, react-copy-to-clipboard, react-loader-spinner

**Backend**
- Java, Spring Boot
- Lombok
- REST API for shortening, redirecting, and analytics

> Fill in your database (e.g. MySQL/PostgreSQL/MongoDB) and auth mechanism (e.g. JWT) here once confirmed.

## How Redirects Work

This project uses **subdomain-based routing** to separate the main application from short-link redirects:

| Subdomain | Router | Purpose |
|---|---|---|
| `www` / no subdomain | `AppRouter` | Main app — landing page, dashboard, login, etc. |
| `url` | `SubDomainRouter` | Dedicated redirect handler for short links |

**Click-to-redirect flow:**

1. A short link (e.g. `http://url.yourdomain.com/s/0fLBKbOU`) is opened.
2. The frontend detects the `url` subdomain via `getSubDomain()` and renders `SubDomainRouter`, whose only route (`/s/:url`) matches and mounts `ShortenUrlPage`.
3. `ShortenUrlPage` reads the short code from the URL and immediately does a full browser navigation (`window.location.href`) to the backend: `VITE_BACKEND_URL/{shortCode}`.
4. The backend's `RedirectController` looks up the short code in the database and responds with an **HTTP 302** and a `Location` header pointing to the original URL.
5. The browser follows the redirect natively and lands on the destination site.

This hand-off from React to the backend is a real browser navigation, not an API call — so it works the same way typing the URL into the address bar would, and isn't subject to CORS restrictions.

## Prerequisites

- Node.js (v18+ recommended) and npm/yarn
- Java (JDK 17+ recommended) and Maven/Gradle
- A running instance of your database
- Local subdomains configured for development (see below)

## Environment Variables

**Frontend** — create a `.env` file in the frontend project root:

```dotenv
VITE_BACKEND_URL=http://localhost:8081
VITE_REACT_SUBDOMAIN=http://url.localhost:5173
```

**Backend** — configure your database connection and any secrets in `application.properties` / `application.yml`.

> List your actual backend env vars / properties here (DB URL, JWT secret, etc.).

## Local Development Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### 2. Backend setup

```bash
cd backend
# configure application.properties with your DB credentials
mvn spring-boot:run
```

The backend will start on `http://localhost:8081`.

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`.

### 4. Configure local subdomains

For subdomain-based routing to work locally, `url.localhost` needs to resolve the same way `localhost` does. Most modern browsers (Chrome, Edge) resolve `*.localhost` automatically without any hosts file changes. If yours doesn't, add this to your hosts file:

```
127.0.0.1   url.localhost
```

Then visit `http://localhost:5173` for the main app, and `http://url.localhost:5173` for short-link redirects.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/urls/shorten` | Create a new short URL from a long URL |
| `GET` | `/api/urls/analytics/{shortUrl}` | Get click analytics for a short URL, filtered by `startDate` / `endDate` query params |
| `GET` | `/{shortUrl}` | Redirect endpoint — resolves the short code and issues a 302 to the original URL |

> Add your auth endpoints (`/api/auth/register`, `/api/auth/login`, etc.) and request/response shapes here.

## Project Structure

```
frontend/
  src/
    components/
      Dashboard/
        ShortenItem.jsx        # Individual short link card (copy, analytics toggle, graph)
        ShortenUrlList.jsx     # Renders a list of ShortenItem
        CreateNewShorten.jsx   # Form to create a new short URL
        Graph.jsx              # Analytics chart
      ShortenUrlPage.jsx       # Handles /s/:url — triggers redirect to backend
    utils/
      helper.js                # Subdomain detection logic
    AppRouter.jsx               # Main router + SubDomainRouter
    App.jsx                     # Picks router based on current subdomain

backend/
  src/main/java/com/url/shortener/
    controller/
      RedirectController.java   # Handles short-code lookup & 302 redirect
    service/
      UrlMappingService.java
    models/
      UrlMapping.java
```

## License

> Add your license here (e.g. MIT).

## Contributing

> Add contribution guidelines here if this is open source.
