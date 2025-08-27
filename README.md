## Spotify Clone

A simple full‑stack project with a Vite + React TypeScript client and a Node.js/TypeScript server split into services (auth, admin, song). Use it as a starter to explore Spotify‑like flows, or adapt it to your own ne
### Repository layout

- `client/` — Vite + React + TS frontend
- `server/` — Node.js + TypeScript backend services
  - `auth/` — user auth and session endpoints
  - `admin/` — admin utilities (e.g., media, management tasks)
  - `song/` — song/album/playlist endpoints

### Prerequisites

- Node.js 18+ and npm 9+ (or pnpm/yarn if you prefer)
- A MongoDB instance (local or hosted)

### Quick start

1. Install dependencies

```bash
cd client && npm install
cd ../server/auth && npm install
cd ../admin && npm install
cd ../song && npm install
```

2. Create environment files

Create a `.env` file in each service directory under `server/` and in `client/` as needed.

Common variables (adjust to your setup):

```bash
# server/*/.env
PORT=8000                 # choose a unique port per service
MONGO_URI=mongodb://localhost:27017/spotify_backup
JWT_SECRET=replace_me_with_a_strong_secret
CORS_ORIGIN=http://localhost:5173  # Vite default

# Optional for media/storage providers
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

```bash
# client/.env (Vite format: VITE_*)
VITE_API_AUTH=http://localhost:8001
VITE_API_ADMIN=http://localhost:8002
VITE_API_SONG=http://localhost:8003
```

3. Run development servers

In separate terminals:

```bash
# client
cd client
npm run dev

# server services (pick unique ports per service)
cd server/auth && npm run dev
cd server/admin && npm run dev
cd server/song && npm run dev
```

Open the client at the URL shown in the terminal (Vite default is `http://localhost:5173`). Ensure your API URLs in `client/.env` match the ports used by each service.

### Scripts

Typical scripts (see each `package.json` for exact values):

- `npm run dev` — start in watch mode (client: Vite; server: ts-node/nodemon)
- `npm run build` — production build (client bundles; server compiles TypeScript)
- `npm start` — run compiled server

### Building for production

Client:

```bash
cd client
npm run build
npm run preview   # optional local preview
```

Server services:

```bash
cd server/<service>
npm run build
npm start
```

### Environment and configuration notes

- Ports are configurable via each service's `.env`. Keep them unique and update the client's `VITE_API_*` accordingly.
- If you change CORS origins, update `CORS_ORIGIN` in each service.
- For media uploads, provide the appropriate provider credentials (e.g., Cloudinary) in the service that handles file uploads.

### Troubleshooting

- Client can’t reach APIs: confirm `VITE_API_*` URLs and server ports match; check CORS.
- Build errors: ensure Node 18+, delete `node_modules` and reinstall.
- Mongo connection errors: verify `MONGO_URI` and that MongoDB is reachable.
