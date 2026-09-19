# Verification

Tested on September 18, 2026 with local Google Chrome and Playwright. Test tools
are separate from the deliverable; the game has no runtime or build dependencies.

## Passed

- Arrow keys and A/D movement, simultaneous opposing inputs, key release, and both playfield boundaries.
- Browser-generated emulated touch: Left/Right holds, release, cancellation, simultaneous fingers, and no scrolling during interaction.
- Start at 0 points and 3 lives. A caught coin adds exactly 10 once and is removed.
- Each obstacle hit removes exactly one heart. Avoided obstacles leave the field without a penalty.
- A missed coin removes exactly one heart **on ground contact**, then disappears. Three missed coins also end the run.
- All three heart indicators, final score, Game Over stopping simulation, and restart resetting the run while keeping the best.
- P/Escape and button pause/resume. Simulated blur and visibility events clear held inputs, pause, and require explicit resume.
- High score survives reload. Blocking localStorage still allows play and a session best.
- Equivalent movement with 60/120 update steps; long-gap delta cap; eight restarts retain one animation loop.
- Random coin/obstacle spawns above the field, variable intervals, and capped difficulty.
- Reduced motion disables particles/popups, retains steady hit feedback, and responds to preference changes.
- Ready, pause, and Game Over layouts at phone portrait 320×568 and 390×844, and landscape 667×375 and 844×390. Also checked 1024×768 and 1440×1000. Controls remain visible without horizontal overflow.
- Device-pixel-ratio canvas scaling, including a DPR 3 mobile context.
- Subdirectory hosting, correctly scoped service worker, and all six essential cached URLs.
- Reloaded both the directory URL and `index.html` offline, including a query string; started and scored in the game offline.
- Updated service worker stays waiting during a run, activates after old tabs close, and removes its obsolete cache.
- Install availability/prompt/dismissal logic using a simulated browser install event.
- Direct `file://` launch plays without attempting PWA setup.
- No uncaught JavaScript errors. Embedded JavaScript and service-worker syntax validated.
- Chrome parsed the manifest without errors and reported no installability errors in a non-incognito test profile. PNG icon dimensions verified as 192×192 and 512×512.

## Settings update

- Easy, Normal, and Hard move coins and obstacles at exactly 0.7×, 1×, and 1.3× the original speed. Score-based acceleration and caps remain; spawn timing is unchanged.
- Settings opens from ready, playing, paused, and Game Over. Opening it during a run pauses gameplay and clears held inputs. Done, Close, and Escape preserve that pause until an explicit resume.
- Arrow keys select the native radio choices without moving the player; P cannot resume behind the dialog. Closing restores keyboard focus to Settings.
- Selection survives reload/restart, works offline, falls back to Normal for invalid saved values, and remains usable for the session with blocked storage.
- Emulated touch selection works. The dialog and Done button fit desktop, 320/390 portrait, and 667/844 landscape layouts. The narrow header also fits when Install is available.
- All 18 original browser check groups passed again after adding settings.

## Starting-screen update

The starting-screen update was also verified at 1440×1000, 390×844, 320×568,
667×375, and 844×390: Play and Settings fit, Settings opens without starting a
run, Done/Escape return focus to the starting-screen button, and Play uses the
chosen speed. Keyboard, emulated touch, offline use, and the pause/Game Over
layouts passed without browser errors.

## Expanded game verification

The original 18 browser check groups passed after the expansion. Fifteen more
groups tested the new features with real Chromium service workers/cache storage,
controlled game time, browser touch emulation, and real Web Audio nodes:

- Legacy high-score/difficulty migration, eight isolated best-score configurations, reload persistence, and reset without deleting scores.
- Gameplay changes queued for the next run; appearance/audio/controls/accessibility applied immediately.
- All pickup types, exact 8s/5s duration refresh, non-stacking shield, magnet attracting coins only, timer freeze on pause, expiration, and cleanup.
- One shield absorbs one obstacle; missed coins still damage; Slow Motion halves item speed without affecting player movement.
- Rush starts at 25s/50s of active play, lasts 8s, pauses, ends, clears, and produces increased coin/obstacle rates with reachable successive coins.
- Timed Challenge ends at 60s or zero lives, freezes when paused, and restarts with a fresh minute.
- Six distinct skin previews with identical physics, four complete rendered themes, independent particle/shake controls, and reduced-motion suppression.
- Drag movement starts without a jump, follows smoothly, cancels/releases, prevents scrolling, and keeps keyboard input available.
- Audio remains uninitialized before interaction; music/effects use independent volumes and mutes; all cue types create finite sound nodes; pause suspends audio; repeated starts retain one scheduler.
- Vibration honors its toggle with a stubbed supported device; unavailable vibration/audio and blocked localStorage remain usable.
- All five settings sections fit desktop, portrait 320/390, and landscape 667/844 viewports with scrollable content and visible footer actions.
- Expanded game, theme/skin previews, and preference changes work after an offline subdirectory reload, without uncaught JavaScript errors.

## Not performed

Physical phone input, Safari/Firefox execution, actual OS/home-screen installation,
screen-reader testing, and deployment to a public HTTPS host. Focus/visibility
transitions were simulated; touch was browser-emulated. Offline loading and worker
updates were exercised with real browser service workers and cache storage.
