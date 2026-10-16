# Mid Valley Lath & Plaster

Website for **Lonnie Joyner — Mid Valley Lath & Plaster** (Chico, CA · Est. 2006 · Lic. #1121138), a lath, plaster and stucco contractor serving Chico, Oroville, Paradise and the surrounding Mid Valley.

Built with **Next.js 16** (App Router, Cache Components), **Tailwind CSS v4**, **lucide-react** icons and **Vercel Blob** for photo storage.

## Features

- **Mobile-first design** in red / white / black. It has a sticky bottom call bar (Call · Text · Quote), a bottom-sheet menu, swipeable project cards and touch-friendly 44px+ targets.
- **Before/after comparison slider.** Drag the red handle with a finger or mouse, or use the arrow keys. Vertical scrolling still works on phones.
- **Project gallery** with city filter chips and a full-screen project sheet.
- **Calls to action** throughout: tap-to-call, tap-to-text, and a free-estimate form that opens the visitor's email or SMS app pre-filled with their details. No backend or email service is needed.
- **Owner admin at `/admin`** (password protected) with full CRUD for projects:
  - add a project with before and after photos (take one with the phone camera or pick from the library)
  - edit the title, city, type of work, description and photos
  - feature or unfeature a project. The top featured project is shown in the hero.
  - delete a project, which also removes its photos
  - photos are resized in the browser (max 2000px, JPEG) before upload, so phone photos upload quickly
- SEO metadata plus `GeneralContractor` structured data (JSON-LD).

## Deploy to Vercel

1. Push this repo to GitHub and import it at <https://vercel.com/new>. `vercel.json` is already configured.
2. **Add photo storage.** In the Vercel project, go to **Storage → Create → Blob**, then connect it to this project. This adds `BLOB_READ_WRITE_TOKEN` automatically.
3. **Add environment variables** under Project → Settings → Environment Variables:
   | Name | Value |
   | --- | --- |
   | `ADMIN_PASSWORD` | The password Lonnie will use at `/admin` |
   | `SESSION_SECRET` | A long random string (`openssl rand -base64 32`) |
   | `NEXT_PUBLIC_SITE_URL` | *(optional)* Your domain, e.g. `https://midvalleylathandplaster.com` |
4. Redeploy. Go to `https://your-site/admin`, sign in, and start adding projects.

The site ships with three **sample projects** that use illustrated placeholder images. Delete them, or edit them and swap in real photos, from the admin dashboard.

## Local development

```bash
cp .env.example .env.local   # set ADMIN_PASSWORD
npm install
npm run dev                  # http://localhost:3000
```

Without `BLOB_READ_WRITE_TOKEN`, projects and photos are saved to the local `data/` folder (git-ignored). That's handy for development, but it does **not** persist on Vercel, so connect a Blob store for production.

## Project structure

```
src/
  app/
    page.tsx                 Public homepage (hero, gallery, services, areas, contact)
    admin/                   Owner dashboard, new/edit pages, server actions (CRUD + login)
    api/upload/route.ts      Authenticated photo upload
    uploads/[file]/route.ts  Serves locally stored photos (dev fallback)
  components/                UI: Header, BeforeAfterSlider, Gallery, QuoteForm, MobileCallBar…
  lib/
    site.ts                  Business info, service areas, services (edit me!)
    storage.ts               Vercel Blob / local filesystem storage
    projects.ts              Cached project list (invalidated on every change)
    auth.ts                  Signed-cookie admin session
public/demo/                 Placeholder before/after illustrations
```

To change the phone number, email, service areas or service descriptions, edit `src/lib/site.ts`.
