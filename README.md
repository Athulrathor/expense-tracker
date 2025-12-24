# expense-tracker
Financial management web app (React + Express + MySQL)

## Overview

expense-tracker is a full-stack web application to manage personal finances. The repo contains a `client` (React + Vite) and `server` (Express + Sequelize/MySQL) with features like user authentication, expense/income tracking, avatar uploads, and email/SMS OTP verification via Twilio Verify.

## Repo structure

- `client/` — React frontend (Vite)
- `server/` — Express backend with Sequelize models and routes

## Quickstart

Prerequisites:
- Node.js (v18+ recommended)
- npm
- MySQL
- (Optional) Twilio account for verification, ImageKit account for uploads

1. Server

```powershell
cd server
npm install
npm run dev   # development (uses nodemon)
# or
npm start     # production
```

2. Client

```powershell
cd client
npm install
npm run dev   # runs Vite dev server
```

Open the client (default Vite port) and the server (default port 3000) in your browser.

## Environment variables

Create a `.env` file in `server/` with the following variables (example):

```
PORT=3000
CLIENT_URL=http://localhost:5173
NODE_ENV=development

# MySQL
DB_HOST=127.0.0.1
DB_DATABASE=expense_tracker_db
DB_USER=db_user
DB_PASSWORD=db_password

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

# Twilio Verify (for OTP/email or SMS verification)
TWILIO_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_SERVICE_SID=your_twilio_verify_service_sid

# ImageKit (optional)
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint
UPLOAD_DIR=/folder/path/for/uploads
```

Notes:
- The server reads `CLIENT_URL` to configure CORS.
- Sequelize will connect using the DB_* variables and runs `sequelize.sync()` on start.

## Available scripts

- Client (in `client/package.json`):
	- `npm run dev` — start Vite dev server
	- `npm run build` — build production bundle
	- `npm run preview` — preview production build

- Server (in `server/package.json`):
	- `npm run dev` — start server with `nodemon index.js`
	- `npm start` — run `node index.js`

## API overview

The backend exposes API routes under `/api/v1`:

- `/api/v1/test` — test endpoints
- `/api/v1/user` — user registration, login, profile, OTP verification
- `/api/v1/expense` — create/read/update/delete expenses
- `/api/v1/income` — create/read/update/delete income entries

Check the route files in `server/routes/` for detailed endpoints and request shapes.

## Database

Create the MySQL database you referenced in `DB_DATABASE`. The server will attempt to `authenticate()` and `sync()` Sequelize models on startup.

## Notes & troubleshooting

- If using Twilio Verify for email/SMS, ensure `TWILIO_*` env vars are set and your Verify Service is configured to support the desired channels.
- If you see CORS errors, verify `CLIENT_URL` matches the frontend origin.

## Contributing

Contributions are welcome. Open an issue or a pull request.

## License

This project does not include a license file. Add one if you plan to publish the repository.

