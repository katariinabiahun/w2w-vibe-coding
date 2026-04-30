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

Quick Start Command

To start the server and run the app, use the following command from the project root:

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 8000 -Root .
```

Then open your browser and navigate to:
```
http://localhost:8000
```

The app will be served on localhost:8000 and will remain running until you stop it with Ctrl+C.

**Requirements:**
- PowerShell (Windows PowerShell 5.1 or later)
- No Python required (the included serve.ps1 script handles static file serving)

**Keyboard Shortcuts:**
- **Enter** to add a new todo
- **Enter** to confirm edits
- **Escape** to cancel edits

Pushing to GitHub

To push your code to GitHub, follow these steps:

1. Check the current git status:
```powershell
git status
```

2. Add all files to staging:
```powershell
git add .
```

3. Create an initial commit:
```powershell
git commit -m "Add Vibe Todo app"
```

4. Add the remote repository (if not already configured):
```powershell
git remote add origin https://github.com/katariinabiahun/w2w-vibe-coding.git
```

5. Verify the remote is configured:
```powershell
git remote -v
```

6. Push to GitHub:
```powershell
git push -u origin main
```

Notes
- The app is intentionally dependency-free and uses modern browser features.
- Colors are set in `styles.css` using CSS variables (see `--tomato` and `--blue`).

Enjoy — tweak the colors in `styles.css` to match your vibe.