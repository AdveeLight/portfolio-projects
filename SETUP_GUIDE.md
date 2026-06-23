# Deuwel Yusuf Portfolio — Setup Guide
## GitHub + Netlify CMS

This guide takes you from zero to a live, fully editable portfolio in about 20 minutes.

---

## What you're deploying

```
your-repo/
├── index.html            ← Your portfolio (loads projects dynamically)
├── admin/
│   ├── index.html        ← CMS admin panel (lives at yoursite.com/admin)
│   └── config.yml        ← Defines all the project fields
├── projects/
│   ├── index.json        ← Auto-generated list of project files
│   ├── atlas-yard-capital.json
│   ├── euphoros-agrocorp-greentech.json
│   └── exampqa.json
├── images/               ← Uploaded project images land here
├── build-index.js        ← Auto-updates the project index on every deploy
└── netlify.toml          ← Tells Netlify how to build the site
```

---

## STEP 1 — Create a GitHub account and repo

1. Go to **github.com** and create a free account (if you don't have one)
2. Click the **+** icon (top right) → **New repository**
3. Name it: `deuwel-portfolio` (or anything you like)
4. Set it to **Public**
5. Click **Create repository**

---

## STEP 2 — Upload your files to GitHub

1. On your new empty repo page, click **uploading an existing file**
2. Drag and drop ALL the files from this folder:
   - `index.html`
   - `build-index.js`
   - `netlify.toml`
   - The `admin/` folder (both files inside)
   - The `projects/` folder (all JSON files inside)
   - The `images/` folder (can be empty for now)
3. Scroll down, click **Commit changes**

Your repo is now set up.

---

## STEP 3 — Connect to Netlify

1. Go to **netlify.com** and sign up with your GitHub account
2. Click **Add new site** → **Import an existing project**
3. Click **GitHub** and authorize Netlify
4. Select your `deuwel-portfolio` repo
5. Netlify will auto-detect the build settings from `netlify.toml`
   - Build command: `node build-index.js`
   - Publish directory: `.`
6. Click **Deploy site**

Your site will be live in ~60 seconds at a URL like `random-name-123.netlify.app`

---

## STEP 4 — Enable Netlify Identity (password-protects the admin)

1. In your Netlify dashboard, go to **Site settings** → **Identity**
2. Click **Enable Identity**
3. Under **Registration**, set it to **Invite only** (so only you can log in)
4. Scroll down to **Git Gateway** and click **Enable Git Gateway**

---

## STEP 5 — Set up your custom domain (optional but recommended)

1. In Netlify → **Domain settings** → **Add custom domain**
2. Enter your domain (e.g. `deuwel.com`)
3. Follow Netlify's DNS instructions (takes ~10 min)
4. Netlify gives you free HTTPS automatically

---

## STEP 6 — Create your admin account

1. In Netlify → **Identity** → **Invite users**
2. Enter your email address and send the invite
3. Check your email and click the link
4. Set your password
5. Go to `yoursite.com/admin`
6. Log in with your email and password

**You now have a fully working CMS.**

---

## STEP 7 — Add your first project

In the admin panel at `yoursite.com/admin`:

1. Click **Projects** → **New Project**
2. Fill in all the fields:
   - **Project Name** — the client name
   - **Display Order** — 1 for your best work
   - **Year, Category, Role**
   - **The Problem / Brief** — headline + body
   - **Overview** — max 100 words
   - **Process & Methodology** — add each step
   - **Final Deliverables** — list everything delivered
   - **Outcome** — the result
   - **Hero Image** — upload from your computer OR paste a Google Drive URL
   - **Gallery Images** — as many as you like
   - **Brand Colour Palette** — hex codes for each colour
3. Click **Save** (saves as draft)
4. Click **Publish** (goes live)

Netlify detects the change, rebuilds, and your new project appears on the portfolio within ~30 seconds.

---

## Adding images from Google Drive

1. In Google Drive, right-click your image → **Share** → **Anyone with the link** → **Viewer**
2. Copy the share link (looks like: `https://drive.google.com/file/d/FILEID/view`)
3. Convert it to a direct image URL:
   - Replace `https://drive.google.com/file/d/FILEID/view`
   - With `https://drive.google.com/uc?id=FILEID`
4. Paste this converted URL into the **Hero Image URL** or **Image URL** field in the admin

---

## Disabling the admin panel

### Option A — Lock it (easiest)
In `admin/config.yml`, change:
```yaml
publish_mode: editorial_workflow
```
to:
```yaml
publish_mode: simple
```
Commit the change. New submissions are blocked.

### Option B — Hide it completely
Rename `admin/index.html` to `admin/index.html.bak` and commit.
The `/admin` URL will return a 404. No one can access it.

### To re-enable
Rename it back to `admin/index.html` and commit.

---

## Adding more projects later

Just go back to `yoursite.com/admin` and add a new project. That's it.

Every time you publish through the CMS:
1. A new JSON file is saved to `/projects/` in your GitHub repo
2. Netlify detects the commit and runs the build
3. `build-index.js` auto-updates `projects/index.json`
4. Your portfolio reloads with the new project

**You never need to touch the code again.**

---

## Troubleshooting

**"Projects not loading" on the live site**
→ Check that `projects/index.json` exists in your repo and lists the project filenames correctly.

**Admin panel asks for login but says "No identity instance"**
→ Make sure you enabled Netlify Identity AND Git Gateway (Step 4).

**Images from Google Drive not showing**
→ Make sure you used the `uc?id=FILEID` format, not the regular share link.

**New project published but not showing on site**
→ Wait 60 seconds for Netlify to rebuild. If it still doesn't show, check the Netlify deploy log.
