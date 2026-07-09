# qhtran.com — Jekyll rewrite

Jekyll rebuild of [qhtran.com](https://www.qhtran.com/) for hosting on GitHub Pages, structured to mirror the original Squarespace site: Cover, Home, Artist Statement, About, and one page per work under Installation / Artist's Book / Print.

## Still outstanding

- **Social links**: `instagram_url` and `linkedin_url` in `_config.yml` are still placeholders (`https://www.instagram.com/`, `https://www.linkedin.com/`) — swap in the real profile URLs. `blog_url` is `"#"` since there's no blog linked yet.
- **CV PDF**: `assets/cv/` is empty. The CV link was removed from the nav for now (along with Blog) — add the PDF and a nav entry back if needed.
- **Contact form** (`/about/`): uses [FormSubmit.co](https://formsubmit.co/), which requires confirming the *first* submission via an email sent to `quynh@qhtran.com` before it'll actually deliver messages.
- `assets/images/voyage-book/` is an empty, currently-unused folder.

## Structure

- `_config.yml` — site metadata, nav links, permalinks, custom domain URL
- `_layouts/` — `default`, `cover` (landing page), `home` (gallery), `page` (Artist Statement), `about` (two-column About + contact form), `project` (individual work page, supports single-gallery, filmstrip, and multi-gallery styles)
- `_includes/` — `nav.html` (main nav + category submenus, generated from `_projects`), `footer.html`, `head.html`, `social-links.html`, `gallery-block.html`
- `_projects/` — one file per work; `category` (`installation`/`book`/`print`) drives nav and Home; see front matter for gallery options (`image_count`, `gallery_style: filmstrip`, `gallery_per_view`, `galleries:` for multi-gallery pages, `videos:` for embedded YouTube)
- `assets/css/style.css` — all styling
- `assets/js/gallery.js` — gallery carousel/filmstrip/thumbnail behavior
- `index.md` / `home.md` / `about.md` / `artist-statement.md` — top-level pages

Project page URLs match the original site's slugs (`/grief/`, `/not-here-nor-there-1/`, etc.).

## Adding images to a project

Each project's front matter has `image_dir` and `image_count`. Drop numbered, zero-padded JPGs into that folder:

```
assets/images/grief/01.jpg
assets/images/grief/02.jpg
...
```

Set `thumb: /assets/images/grief/01.jpg` to use that image as the tile wherever the project is listed.

## Running locally

Requires Ruby + Bundler.

```
bundle install
bundle exec jekyll serve
```

Then visit `http://localhost:4000`.

## Deploying

This repo (`hqhn07/hqhn07.github.io`) is a GitHub Pages **user site** serving a **custom domain**, `qhtran.com`. GitHub builds it automatically with Jekyll on every push to `main` — no GitHub Actions workflow needed. In the repo's Settings → Pages: source is "Deploy from a branch" (`main`, `/root`), and the custom domain field is set to `qhtran.com` (this commits a `CNAME` file to the repo root, already present here). `_config.yml` has `baseurl: ""` and `url: "https://qhtran.com"` to match.

DNS for `qhtran.com` is configured at the registrar with the four GitHub Pages A records (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`) for the apex domain, and a `CNAME` record for `www` pointing to `hqhn07.github.io`.
