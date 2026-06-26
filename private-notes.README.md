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
