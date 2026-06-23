# Admin Panel — Fix Summary & How To Use It

## What was actually broken

Your `admin/index.html` was a bare 13-line file. It loaded the Decap CMS
script but never told it:
- which collections/fields to show (no `config.yml` connection)
- how to log you in (no Netlify Identity widget)

Decap CMS with no config and no logged-in user renders **nothing** — hence
the blank screen. There was also a second, deeper problem: your live
`Portfolio_Updated.html` still had all 12 projects hardcoded directly in a
`<script>` tag. Even with a working admin panel, anything you published
through it would have had nowhere to go — the site wasn't reading from
files at all.

## What's fixed now

1. **`admin/index.html`** — now actually loads Netlify Identity + Decap CMS,
   points at `config.yml`, and redirects invite/login links back into the
   panel instead of dropping you on a blank page.
2. **`admin/config.yml`** — defines every field from our original plan:
   business name, industry, role, the problem/brief, project overview,
   focus, repeatable process steps, repeatable deliverables, skills, outcome,
   hero image, project gallery (multiple images), and brand colours.
3. **`index.html`** (your live site) — no longer hardcodes projects. It now
   fetches `projects/index.json`, then each `projects/<id>.json`, and
   renders cards + the project modal + the full portfolio gallery from
   that data. Real uploaded images now display automatically when present;
   the generated brand-mark graphic only shows as a fallback when a project
   has no photos yet.
4. **`projects/*.json`** — your existing 12 projects (the original 3 plus
   the 9 fashion/beauty/events ones) are pre-loaded as seed files, so the
   site looks exactly as it does today, with nothing missing.
5. **`build-index.js` + `netlify.toml`** — every time you publish through
   `/admin`, Netlify rebuilds the site and this script re-scans the
   `projects/` folder to regenerate `index.json` automatically. You never
   touch this file yourself.
6. **The disable switch** — now lives at the very top of
   `admin/index.html`:
   ```js
   window.ADMIN_DISABLED = false;
   ```
   Flip it to `true`, commit, and `/admin` shows a locked message instead
   of the editor. Flip it back to `false` whenever you want to edit again.

## How to use it day to day

1. Go to `yoursite.com/admin`
2. Log in (you already have Identity + Git Gateway enabled)
3. Click **Portfolio Projects**
4. Either edit an existing project or click **New Portfolio Projects** to
   add one
5. Fill in the fields — business name, role, the brief, process steps
   (click "+ Add" to add as many as you want), deliverables, etc.
6. Upload your hero image and gallery images, **or** paste direct image
   URLs
7. Click **Publish**
8. Netlify rebuilds automatically (takes about 30–60 seconds) and your
   change is live — no code touched

## The one thing to know about Google Drive images

A normal Google Drive "share" link looks like this:

```
https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrSt/view?usp=sharing
```

That link opens Drive's *viewer page*, not the image file itself — if you
paste it into an image field, it will not display. To use a Drive image
directly, you need to convert it to this format:

```
https://drive.google.com/uc?export=view&id=1AbCdEfGhIjKlMnOpQrSt
```

Take the long ID between `/d/` and `/view` from your share link and drop
it into that second URL pattern. The file's sharing setting also needs to
be **"Anyone with the link"**, or the image still won't load for visitors.

The simplest path, though, is just uploading directly through the admin
panel's image field — it handles all of this for you and stores the file
in your GitHub repo automatically. Use Drive-pasting only for images you
don't want duplicated into the repo.

## Files in this package

```
index.html              ← your live site (now loads projects dynamically)
admin/
  index.html             ← the actual admin panel (fixed — was blank)
  config.yml             ← every field, matching the data your site expects
projects/
  index.json             ← auto-generated list of project IDs (don't edit)
  atlas.json             ← your 12 existing projects, pre-seeded
  euphoros.json
  exampqa.json
  vk3.json
  nictralane.json
  yees.json
  alate.json
  overanda.json
  m4m.json
  cliqa.json
  emerald.json
  amor.json
build-index.js           ← regenerates index.json on every deploy
netlify.toml              ← tells Netlify to run build-index.js on deploy
```

## Deploying this fix

Replace the corresponding files in your GitHub repo with the ones in this
package (same paths), commit, and push to `main`. Netlify will rebuild
automatically. Once it finishes, visit `yoursite.com/admin` — you should
see the full editor instead of a blank screen.
