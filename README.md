# Vibe Todo

A small, modern todo app in light tomato and blue colors. No build required — just open `index.html` in your browser or run a tiny static server.

Features
- Add, edit (double-click), delete todos
- Toggle complete
- Filter (All / Active / Completed)
- Persisted in `localStorage`
- Keyboard-friendly (Enter to add, Enter to edit, Escape to cancel)

## How to run

Open `index.html` directly in your browser, or run a tiny server (recommended for some browsers). If you don't have Python installed (Windows sometimes shows "Python was not found"), use the included PowerShell script or install Python.

PowerShell (no Python required)

Run the included `serve.ps1` from the project root to serve files on port 8000:

```powershell
# run with a permissive execution policy for this one-off script
powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 8000 -Root .
# then open http://localhost:8000
```

**Requirements:**
- PowerShell (Windows PowerShell 5.1 or later)
- No Python required (the included serve.ps1 script handles static file serving)

**Keyboard Shortcuts:**
- **Enter** to add a new todo
- **Enter** to confirm edits
- **Escape** to cancel edits

## Pushing to GitHub

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

## Publishing as a GitHub Page

To publish your Vibe Todo app as a live GitHub Page (accessible via a public URL), follow these steps:

#### Step 1: Enable GitHub Pages in Your Repository

1. Go to your GitHub repository: https://github.com/katariinabiahun/w2w-vibe-coding
2. Click on **Settings** (in the top navigation)
3. In the left sidebar, scroll down and click on **Pages**
4. Under "Source", select **Deploy from a branch**
5. Select the branch: **main**
6. Select the folder: **/ (root)**
7. Click **Save**

#### Step 2: Wait for Deployment

GitHub will automatically build and deploy your site. You should see a message like:

```
Your site is published at: https://katariinabiahun.github.io/w2w-vibe-coding/
```

This typically takes 1-2 minutes.

#### Step 3: Access Your Live App

Once deployed, your Vibe Todo app will be live at:
```
https://katariinabiahun.github.io/w2w-vibe-coding/
```

You can share this link with anyone, and they can use your todo app without needing to run a local server!

### Notes
- The app is intentionally dependency-free and uses modern browser features.
- Colors are set in `styles.css` using CSS variables (see `--tomato` and `--blue`).
- GitHub Pages automatically serves your `index.html` as the home page.
- Any changes you push to the `main` branch will automatically update your live page within 1-2 minutes.

Enjoy — tweak the colors in `styles.css` to match your vibe!