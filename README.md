# Farm Ledger — Deploy to Netlify

This project is a farm income/expense ledger app, deployed via Netlify.

## Important: about your data
The original version (on claude.ai) saved data to Anthropic's servers so
everyone with the link saw the same shared ledger. Self-hosted like this,
there's no shared backend — data is saved in each visitor's own browser
only (via `localStorage`). That means:
- Data will not automatically sync between different devices.
- Clearing browser data/cache will erase the ledger on that device.

If you want everyone on your team to see the same live data from any
device, that requires a real backend/database.
