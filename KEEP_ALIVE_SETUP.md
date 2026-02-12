# Server Keep-Alive Setup

## Problem
Render's free tier puts services to sleep after 15 minutes of inactivity. This causes cold starts when users visit the site, showing "Application loading" briefly.

## Solution: UptimeRobot (Free)

UptimeRobot is a free service that monitors your server and pings it periodically to keep it alive.

### Setup Steps:

1. **Go to UptimeRobot**
   - Visit: https://uptimerobot.com/
   - Sign up for a free account

2. **Create a New Monitor**
   - Click "Add New Monitor"
   - Select "HTTP(s)" as the monitor type
   - URL: `https://your-render-url.onrender.com/api/keep-alive`
   - Monitoring interval: Set to every 5 minutes (keeps it very active)
   - Click "Create Monitor"

3. **Verify It Works**
   - Monitor will show "Up" status
   - Your server will now be pinged every 5 minutes
   - No more cold starts!

### Alternative: Using a GitHub Action (Advanced)

If you prefer, you can use a GitHub Actions workflow to ping the server:

Create `.github/workflows/keep-alive.yml`:

```yaml
name: Keep Server Alive

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:

jobs:
  keep-alive:
    runs-on: ubuntu-latest
    steps:
      - name: Ping keep-alive endpoint
        run: curl https://your-render-url.onrender.com/api/keep-alive
```

### Keep-Alive Endpoint
The endpoint `/api/keep-alive` returns:
```json
{
  "status": "ok",
  "timestamp": "2026-02-12T08:23:45.123Z",
  "uptime": 1234.56
}
```

## Note
- UptimeRobot is the simplest solution (recommended)
- No code changes needed
- Free tier supports multiple monitors
- Provides uptime statistics and alert notifications
