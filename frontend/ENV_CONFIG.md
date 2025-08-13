# Environment Configuration

This project uses environment variables to configure API endpoints. Make sure to set up your `.env` file before running the application.

## Setup

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` according to your environment:

## Environment Variables

### Required Variables

- **VITE_ADMIN_SERVER_URL**: URL for the admin service API
  - Default: `http://13.235.70.183:7000`
  - Local development: `http://localhost:7000`

- **VITE_SONG_SERVICE_URL**: URL for the song service API
  - Default: `https://spotify-song-service.vercel.app`
  - Local development: `http://localhost:8000`

- **VITE_USER_SERVICE_URL**: URL for the user service API
  - Default: `https://spotify-user-service-zeta.vercel.app`
  - Local development: `http://localhost:9000`

### Optional Variables

- **NODE_ENV**: Development environment setting
  - Values: `development`, `production`
  - Default: `development`

## Usage

The application will automatically use these environment variables through Vite's built-in environment variable support. All variables prefixed with `VITE_` are available in the client-side code via `import.meta.env`.

## Important Notes

- The `.env` file is ignored by Git for security reasons
- Always use the `.env.example` file as a template
- Environment variables are loaded at build time, not runtime
- Make sure to restart your development server after changing environment variables
