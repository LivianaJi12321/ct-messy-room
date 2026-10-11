# ct-messy-room

An interactive computational-thinking prototype about letting things accumulate, deciding to tidy up, and beginning again.

Twelve fine lines on an abstract record player lift and intertwine like fabric in the wind. The mint-and-brown outline design uses handwritten system fonts and a perspective tilt.

## Try it

Open `index.html` in a browser. No installation, build step, or external dependencies are required.

- Click **Leave something out** to add disorder and fill the hand-drawn progress bar.
- Drag the tonearm inward, or click it, to untangle the lines and restore neat concentric circles.
- Keyboard users can focus the tonearm and press Enter or Space.
- Cleaning is a manual choice. A full progress bar does not start cleaning automatically.
- After cleaning, the model waits for another leave-out action.

## Model

Each action adds a random amount of accumulation. Visual distortion increases toward a soft limit to keep the lines in view. The bar has no visible numbers and stops filling when full. Rotation remains steady; accumulation only changes when someone clicks. Motion is reduced when the browser's reduced-motion preference is enabled.

This is an expressive representation, not an empirically validated simulation. Visitors, available time, energy, and other possible cleaning triggers are not simulated in this version.

## Files

- `index.html`: self-contained HTML, CSS, SVG, and JavaScript prototype.
- `in thinking.md`: chronological development record covering decomposition, pattern recognition, abstraction, and algorithms. Earlier entries document earlier versions; later entries record revisions.

Developed through an iterative conversation between the project creator and AI.
