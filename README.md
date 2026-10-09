# Winter FancyFaire* Trend Hunter

A lightweight, mobile-first casual web game for the Specialty Food Association's Winter FancyFaire* event.

## What this is

This static website is designed to be easy to maintain and easy to host on GitHub Pages. The entire game logic and placeholder content live in `data.js` so future trend updates can be swapped out without rewriting the app.

## Files

- `index.html` – page structure and game screens
- `styles.css` – brand styling, responsive layout and polished mobile-first design
- `app.js` – challenge flow, scoring and result logic
- `data.js` – all trend names, sample products, challenge content and persona definitions
- `assets/images/reti.png` – placeholder header image for Reti
- `assets/branding/` – useful for branded art or future updates
- `assets/products/` – useful for product artwork or custom cards

## Local preview

Open `index.html` directly in a browser, or run a simple local server from this folder:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## GitHub Pages

When publishing via GitHub Pages, use the repository's project site URL. Since all asset references are relative, the app will work correctly from a project URL such as:

```text
https://username.github.io/repository-name/
```

## Updating content later

The easiest place to replace the placeholder content is `data.js`.

Edit the `challengePool` array and the `personas` array to swap in the official 2027 Trend of the Year, supporting trends, product ideas and final scoring outcomes.

The game logic stays the same; only the data changes.

## Notes

- The app uses plain HTML, CSS and JavaScript.
- No build step is required.
- No backend, database or API is required.
- The design is optimized for mobile play and responsive desktop viewing.
