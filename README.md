# Vibe Todo

A small, modern todo app in light tomato and blue colors. No build required — just open `index.html` in your browser or run a tiny static server.

Features
- Add, edit (double-click), delete todos
- Toggle complete
- Filter (All / Active / Completed)
- Persisted in `localStorage`
- Keyboard-friendly (Enter to add, Enter to edit, Escape to cancel)

How to run

Open `index.html` directly in your browser, or run a tiny server (recommended for some browsers). If you don't have Python installed (Windows sometimes shows "Python was not found"), use the included PowerShell script or install Python.

PowerShell (no Python required)

Run the included `serve.ps1` from the project root to serve files on port 8000:

```powershell
# run with a permissive execution policy for this one-off script
powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 8000 -Root .
# then open http://localhost:8000
```

Python (if available)

```powershell
# from the project root
python -m http.server 8000
# then open http://localhost:8000
```

Notes
- The app is intentionally dependency-free and uses modern browser features.
- Colors are set in `styles.css` using CSS variables (see `--tomato` and `--blue`).

Enjoy — tweak the colors in `styles.css` to match your vibe.