# ct-messy-room

An interactive computational-thinking prototype about letting things accumulate, deciding to tidy up, and beginning again.

Twelve fine lines on an abstract record player lift and intertwine like fabric in the wind. The mint-and-brown outline design uses handwritten system fonts and a perspective tilt.

## Try it

**[Open the live prototype](https://livianaji12321.github.io/ct-messy-room/)**

Use it directly in your browser. No download or installation is needed.

- Click **Leave something out** to add disorder and fill the hand-drawn progress bar.
- Drag the tonearm inward, or click it, to untangle the lines and restore neat concentric circles.
- Keyboard users can focus the tonearm and press Enter or Space.
- Cleaning is a manual choice. A full progress bar does not start cleaning automatically.
- After cleaning, the model waits for another leave-out action.

## Model

Each action adds a random amount of accumulation. Visual distortion increases toward a soft limit to keep the lines in view. The bar has no visible numbers and stops filling when full. Rotation remains steady; accumulation only changes when someone clicks. Motion is reduced when the browser's reduced-motion preference is enabled.

This is an expressive representation, not an empirically validated simulation. Visitors, available time, energy, and other possible cleaning triggers are not simulated in this version.

## Files

- `index.html`: page structure and SVG illustration.
- `style.css`: layout, colors, typography, and visual styling.
- `script.js`: interactions and animation logic.
- `in thinking.md`: chronological development record covering decomposition, pattern recognition, abstraction, and algorithms. Earlier entries document earlier versions; later entries record revisions.

Developed through an iterative conversation between the project creator and AI.
