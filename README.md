# Coin Dodge

A standalone arcade PWA built with vanilla HTML, CSS, and JavaScript. All game markup, styles, drawings, and logic are in `index.html`. No build step, frameworks, external fonts, CDN requests, or downloaded audio assets are required.

## Play

Open `index.html` directly, or serve this folder on localhost for PWA features:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

On Windows with the Python launcher, use `py` instead of `python`. Visit <http://localhost:8000>. Wait for **Offline ready** before disconnecting.

Choose **Play** or **Settings** on the starting screen. Move with **Arrow keys / A / D** or hold the Left/Right buttons. **P / Escape** pauses or resumes. Settings and leaving the page pause gameplay; you must explicitly resume.

Gold coins give **10 points**. Red obstacles and coins that touch the ground each cost **one heart**. Every resolved item is removed immediately. Each run starts with three hearts. Shields protect against obstacles, not missed coins.

## Settings

- **Gameplay:** Easy (0.7×), Normal (1×), or Hard (1.3×) falling speed; Classic or a 60-second Timed Challenge; optional power-ups and Coin Rush. Mode, power-up, and rush changes apply on the next run. Falling speed changes immediately.
- **Power-ups:** Magnet attracts nearby coins for 8 seconds; Shield absorbs one obstacle; Slow Motion halves falling speeds for 5 seconds without slowing the player. Repeated pickups refresh rather than stack. Timers pause with gameplay, and effects clear when a run ends or restarts.
- **Coin Rush:** 8 seconds of extra coins and moderately more obstacles, starting every 25 seconds of active play. Closely spaced coins follow reachable paths.
- **Appearance:** Classic, Neon Arcade, Space, and Underwater themes; Original Bucket, Spaceship, Treasure Chest, Little Monster, Robot, and Cat Basket skins. Previews are local and every skin shares identical movement and collision bounds.
- **Audio:** Independent music, effects, vibration, and volumes. Audio starts after interaction; music pauses with gameplay. Unsupported audio/vibration degrades gracefully. Sound is generated locally with Web Audio.
- **Controls:** Buttons or Drag to Move, plus Small/Medium/Large button sizes. Drag begins relative to the catcher's position and never snaps to your finger. Keyboard controls work with either style.
- **Accessibility:** Independent particles and shake toggles. Reduced motion defaults to the device preference and suppresses decorative motion and shake.

Appearance, audio, controls, and accessibility changes apply immediately. **Reset Settings** restores defaults without deleting best scores. Power-ups, Coin Rush, music, and vibration default to off, preserving Classic gameplay.

## Saved scores

Eight records separate Classic/Timed × power-ups on/off × Coin Rush on/off. Existing best scores migrate to **Classic, power-ups off, Coin Rush off**.

Preferences and scores are local to the browser and origin. Different devices, or switching from localhost to the hosted site, have separate records. If storage is blocked, the game keeps scores and preferences for the current session.

## GitHub Pages / HTTPS hosting

This repository is ready to publish from **main → / (root)** in GitHub Pages. `.nojekyll` enables plain static publishing. All paths work in a project subdirectory such as `/Coin-dodge/`. Publish `index.html`, `manifest.webmanifest`, `sw.js`, and the entire `icons` folder together. Other static HTTPS hosts work too.

Installation is offered only when the browser makes it available. Some browsers use an Add to Home Screen menu instead. Installation and service workers require HTTPS or localhost; the basic game still works as a directly opened file.

## Offline updates

The worker precaches the game, manifest, and icons. Increment `VERSION` in `sw.js` when publishing an updated asset. An update waits while older game tabs are open: no forced reload or mid-run replacement. After **Update ready**, close all game tabs/windows and reopen to apply it. Old caches are removed on activation. Browser storage can still be cleared or evicted by the device.

See [TESTING.md](TESTING.md) for verification results and physical-device limits.
