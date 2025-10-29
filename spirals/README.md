This folder contains the source code for an interactive Javascript tool that allows you to draw spiral tilings. See the blog post at http://isohedral.ca/escher-like-spiral-tilings/ for more information, including a link to a runnable version.

## Running Locally

This script requires a web server. Because Chrome is afraid of cross-site scripting attacks, this script won't run via a `file:` URL. 

**Option 1 - Python:**
```bash
python -m http.server 8000
```
Then open `http://localhost:8000/`

**Option 2 - Node.js:**
```bash
npx http-server
```

## Deploy to Vercel

This folder is self-contained and ready to deploy to Vercel:

1. Push this `spirals` folder to a GitHub repository
2. Go to [Vercel](https://vercel.com) and sign in with GitHub
3. Click "New Project" and select your repository
4. If the spirals folder is in a subdirectory, set the **Root Directory** to `spirals`
5. Click "Deploy"

Your spiral tilings app will be live at `https://your-project.vercel.app`!

## New Features

- **IH Type Dropdown**: In addition to the slider, you can now use a dropdown menu to select isohedral tiling types (IH01-IH81).
- **Color Pickers**: Click the "Edit Colors" button to show/hide 6 color pickers for full control over:
  - Outline color
  - Tile colors 1, 2, and 3 (used when "Colour" is enabled)
  - Background color
  - Extra color
- **Randomize Color Button**: Click the "Randomize" button to generate random colors for the tiling pattern.
- **Click to Change Colors**: Hold Shift and click on the spiral area to randomize colors interactively.