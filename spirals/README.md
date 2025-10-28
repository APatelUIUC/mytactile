This folder contains the source code for an interactive Javascript tool that allows you to draw spiral tilings. See the blog post at http://isohedral.ca/escher-like-spiral-tilings/ for more information, including a link to a runnable version.

If you want to run this code yourself from source, you'll need to run a web server. Because Chrome is afraid of cross-site scripting attacks, this script won't run via a `file:` URL.  It suffices to run Python's web server by executing "`python -m http.server`" from the command line while in the main directory.

## New Features

- **Bezier Detail Slider**: Control the number of sample points used for bezier curve fitting on edges (4-128 points). Higher values create smoother curves in the exported SVG.
- **IH Type Dropdown**: In addition to the slider, you can now use a dropdown menu to select isohedral tiling types (IH01-IH81).
- **Color Pickers**: Click the "Edit Colors" button to show/hide 6 color pickers for full control over:
  - Outline color
  - Tile colors 1, 2, and 3 (used when "Colour" is enabled)
  - Background color
  - Extra color
- **Randomize Color Button**: Click the "Randomize" button to generate random colors for the tiling pattern.
- **Click to Change Colors**: Hold Shift and click on the spiral area to randomize colors interactively.