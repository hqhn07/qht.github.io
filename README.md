# qhtran.com — Jekyll rewrite

Jekyll rebuild of [qhtran.com](https://www.qhtran.com/) for hosting on GitHub Pages, structured to mirror the original Squarespace site: Cover, Home (gallery by category), Artist Statement, About, and one page per work under Installation / Artist's Book / Print.

This was rebuilt from the live site's text content only — Squarespace doesn't expose the original image files or the CV PDF through a normal page fetch, so those need to be added manually (see below).

## Before this goes live

1. **Push this to a repo named `hqhn07.github.io`.** `url:` in `_config.yml` is set to `https://hqhn07.github.io`. GitHub Pages user sites only serve at the root domain when the repo is named exactly `<username>.github.io` — a different repo name would publish under `hqhn07.github.io/<repo-name>/` instead, which would break the absolute asset/nav paths used throughout this site.

2. **Add artwork images.** Each work has a `image_dir` and `image_count` in its front matter (`_projects/*.md`). Drop numbered, zero-padded JPGs into the matching folder under `assets/images/`, e.g. for `grief.md` (`image_dir: /assets/images/grief`, `image_count: 7`):

   ```
   assets/images/grief/01.jpg
   assets/images/grief/02.jpg
   ...
   assets/images/grief/07.jpg
   ```

   Until real images are added, each page shows broken image placeholders — expected for now. Optionally set `thumb: /assets/images/grief/01.jpg` in a project's front matter to use that image as its tile on the Home page (otherwise it shows a text placeholder).

3. **Add your CV PDF** at `assets/cv/quynh-tran-cv.pdf` (or update `cv_path` in `_config.yml` to point wherever you put it).

4. **Set your real social links.** `instagram_url`, `linkedin_url`, and `blog_url` in `_config.yml` are placeholders — swap in your actual profile/blog URLs.

5. **Double-check the "Day Dream II" page** (`_projects/day-dream-1.md`, from the original `/day-dream-1` URL). Its medium/dimensions/year weren't recoverable from the live page's text content, so those fields are currently blank — fill them in.

## Structure

- `_config.yml` — site metadata, nav links, permalinks
- `_layouts/` — `default`, `cover` (landing page), `home` (gallery grid), `page` (Artist Statement/About), `project` (individual work page)
- `_includes/` — `nav.html` (main nav + category submenus, generated from `_projects`), `footer.html`, `head.html`
- `_projects/` — one file per work; `category` is `installation`, `book`, or `print`, and drives both navigation and the Home page grid
- `assets/css/style.css` — all styling
- `index.md` / `home.md` / `about.md` / `artist-statement.md` — top-level pages

Project page URLs match the original site's slugs (`/grief/`, `/not-here-nor-there-1/`, etc.) so old links keep working.

## Running locally

Requires Ruby + Bundler.

```
bundle install
bundle exec jekyll serve
```

Then visit `http://localhost:4000`.

## Deploying

This repo is a GitHub Pages **user site** (`<username>.github.io`), which GitHub builds automatically with Jekyll on every push to `main` — no GitHub Actions workflow needed. In your repo's Settings → Pages, just make sure the source is set to deploy from the `main` branch, root folder.
