# Encrypted private notes page

The public page is `private-notes.html`. It downloads `private-notes.enc.json` and decrypts it locally in the browser.

## First-time setup

The committed `private-notes.enc.json` is only a sample encrypted with passphrase `change-me`. Replace it before putting real private content online.

Create your private plaintext working copy:

```bash
cp private-notes.example.html private-notes.plain.html
```

Edit `private-notes.plain.html`. This file is ignored by git and should not be committed.

## Encrypt after editing

```bash
PRIVATE_NOTES_PASSPHRASE='your strong passphrase' \
  node tools/private-notes-crypto.mjs encrypt private-notes.plain.html private-notes.enc.json
```

Then commit only `private-notes.enc.json` and any public UI/script changes.

## Decrypt back to plaintext

```bash
PRIVATE_NOTES_PASSPHRASE='your strong passphrase' \
  node tools/private-notes-crypto.mjs decrypt private-notes.enc.json private-notes.plain.html
```

If you omit `PRIVATE_NOTES_PASSPHRASE`, the script prompts for the passphrase, but that prompt is visible in the terminal.

## Important

- Never commit `private-notes.plain.html` or other plaintext private files.
- Use a strong passphrase. Anyone can download `private-notes.enc.json`.
- If you forget the passphrase, the encrypted content cannot be recovered.

## Calendar dates and recurring events

The decrypted page automatically fills elements marked with:

```html
<span data-today-label></span>
<span data-week-range></span>
<section class="week-day" data-week-day="0">...</section>
```

`data-week-day="0"` is Monday, up to `data-week-day="6"` for Sunday. Put weekly recurring meetings directly inside the relevant `week-day` block, for example:

```html
<div class="week-event"><em>10:00</em>Weekly group meeting</div>
```

For one-off events, you can mark an event with an ISO date. The browser will hide it unless it belongs to today/current week:

```html
<div class="week-event" data-event-date="2026-07-03"><em>14:00</em>One-off meeting</div>
```

### Calendar week navigation

The plaintext calendar can include buttons such as:

```html
<button type="button" data-calendar-shift="-7">Previous</button>
<button type="button" data-calendar-today>Today</button>
<button type="button" data-calendar-shift="7">Next</button>
```

The number in `data-calendar-shift` is the number of days to move the visible week. Use `-7` and `7` for previous/next week. Recurring weekly events stay in their weekday column; dated `data-event-date="YYYY-MM-DD"` events appear only when their date is in the visible week.

For a recurring weekly event that begins on a future date, use `data-start-date` on the event inside the weekday column:

```html
<div class="week-event" data-start-date="2026-07-09"><em>14:00-15:00</em>Weekly meeting</div>
```
