# Rainmelon Studio — Jingyi Zhang design portfolio

Static site (no build step). Edit the HTML/CSS/JS files directly and push; GitHub Pages serves the repo root.

## Structure
| Path | What it is |
|---|---|
| `index.html` | Home |
| `work/`, `menu/` (Project), `list/`, `about/` | Main sections. The side-nav "Project" link points to `menu/` |
| `<project-name>/index.html` | One folder per case study / project page |
| `<project-name>.html` (root) | Tiny redirect stubs so old `.html` links keep working |
| `yi-app/` | Interactive I Ching prototype, embedded as a demo in `yi-daily-guidance/` — keep it |
| `assets/*.css`, `assets/*.js` | Shared styles and behaviour (nav, transitions, mobile, case-study mode) |
| `assets/pages/*.js` | Page data used by the soft (no-reload) navigation |
| `assets/clean-routes.json` | Map from `x.html` to `x/`. Kept in sync with the inline copy in `clean-routing.js` |
| `assets/media/` | Local copies of images and videos (created by `localize_media.py`) |

Cards on the Project page without a link in the HTML (for example Selection 1–3, AASIGNAL, Afterglow, Dream Question) are opened by `assets/play.js`, which maps card titles to pages. Do not delete those pages.

## Preview locally
```
python3 -m http.server 8000
```
Open http://localhost:8000

## Media
Many images and videos are still loaded from the original `freight.cargo.site` host. To host them in this repo:
```
python3 localize_media.py
```
It downloads every referenced file into `assets/media/` and rewrites the references in place. Commit on a branch first, then check every page.

## Fonts
Diatype and Arizona are commercial fonts, so Inter and Newsreader are mapped to those family names (see the top of `assets/base.css`). If you buy licences, put the `.woff2` files in `assets/fonts/` and change the `src:` lines.
