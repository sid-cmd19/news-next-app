# NextNews - Next.js Page Routing & Rendering

NextNews is a news listing and archiving web application built using Next.js 14, demonstrating advanced routing, rendering strategies, layout structures, and navigation patterns.

---

## Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Directory Structure

Here is an overview of the key files and directories in the application:

```text
├── app/
│   ├── archive/                  # Sub-route for news archiving
│   │   ├── @archive/             # Parallel route slot for archived years/months lists
│   │   │   └── [[...filter]]/    # Optional Catch-All Route for filter parameters
│   │   │       └── page.js
│   │   ├── @latest/              # Parallel route slot for latest news list
│   │   │   └── default.js        # Fallback page for unmatched parallel routes
│   │   └── layout.js             # Layout combining @archive and @latest parallel slots
│   ├── news/                     # Sub-route for news listings
│   │   ├── [newsIdSlug]/         # Dynamic Route for individual news articles
│   │   │   ├── not-found.js      # Local 404 page for missing news articles
│   │   │   └── page.js
│   │   ├── page.js
│   │   └── page.module.css
│   ├── globals.css
│   ├── layout.js                 # Global Root Layout
│   ├── not-found.js              # Global 404 Not Found Page
│   └── page.js                   # Homepage
├── components/                   # Reusable UI Components
│   ├── main-header/
│   │   ├── main-header.js
│   │   └── main-header.module.css
│   └── news-lit.js               # News Grid/List Component
├── lib/                          # Utility & Data Fetching Helpers
│   └── news.js
├── public/                       # Static assets (images, icons)
├── dummy-news.js                 # Local mock data for news articles
├── next.config.mjs
└── package.json
```

---

## Major Next.js Concepts Used

This project implements several advanced routing patterns introduced in the Next.js App Router:

### 1. App Router & Nested Routing
The application uses the Next.js App Router (introduced in Next.js 13), where routes are defined by folder hierarchies under the `app/` directory. Each route segment maps to a URL path, and a page is rendered by defining a `page.js` file inside a directory.
- `app/page.js` maps to `/`
- `app/news/page.js` maps to `/news`

### 2. Dynamic Routes (`[segment]`)
When a route segment depends on dynamic data (like a news article ID or slug), a dynamic folder name wrapped in square brackets is used.
- **Implementation**: [`app/news/[newsIdSlug]/page.js`](file:///Users/siddhesh/learnings/Nextjs/new-next-app/app/news/[newsIdSlug]/page.js)
- Next.js passes the route parameter as a prop to the page component (e.g., `params.newsIdSlug`).

### 3. Parallel Routing (`@slot`)
Parallel Routing allows you to simultaneously or conditionally render one or more pages in the same layout. Slots are defined with the `@slotname` naming convention and are passed to the parent layout as props.
- **Implementation**: In [`app/archive/layout.js`](file:///Users/siddhesh/learnings/Nextjs/new-next-app/app/archive/layout.js), the parallel slots `@archive` and `@latest` are received as props and rendered side-by-side or stacked:
  ```js
  export default function ArchiveLayout({ archive, latest }) {
      return (
          <div>
              <section id="archive-filter">{archive}</section>
              <section id="archive-latest">{latest}</section>
          </div>
      );
  }
  ```

### 4. Optional Catch-All Routes (`[[...segment]]`)
Optional Catch-All Routes match the parent route prefix as well as any nested paths, capturing all parameters in an array.
- **Implementation**: [`app/archive/@archive/[[...filter]]/page.js`](file:///Users/siddhesh/learnings/Nextjs/new-next-app/app/archive/@archive/[[...filter]]/page.js)
- It matches `/archive` (where `params.filter` is `undefined`), `/archive/2024` (where `params.filter` is `['2024']`), and `/archive/2024/05` (where `params.filter` is `['2024', '05']`). This is used to dynamically construct filtering criteria for the archive directory.

### 5. Fallback Pages for Parallel Routes (`default.js`)
When navigating between routes, Next.js needs a fallback file to render for a slot when the slot's current page doesn't match the updated URL. The `default.js` file serves as this fallback.
- **Implementation**: [`app/archive/@latest/default.js`](file:///Users/siddhesh/learnings/Nextjs/new-next-app/app/archive/@latest/default.js)
- When a user selects a filter year or month, the URL updates to `/archive/2024` or `/archive/2024/5`. The `@archive` slot matches the catch-all route `[[...filter]]`, but the `@latest` slot has no matching path. Next.js falls back to rendering `@latest/default.js` to preserve the latest news list.

### 6. Custom 404 & Not Found Handling (`not-found.js`)
Next.js supports displaying custom error states when a route or a specific resource is not found.
- **Global Not Found**: [`app/not-found.js`](file:///Users/siddhesh/learnings/Nextjs/new-next-app/app/not-found.js) handles unmatched routes at the root level.
- **Local/Nested Not Found**: [`app/news/[newsIdSlug]/not-found.js`](file:///Users/siddhesh/learnings/Nextjs/new-next-app/app/news/[newsIdSlug]/not-found.js) renders when a specific news article doesn't exist, showing a contextual error.

### 7. Layouts & Metadata API
- **Root Layout**: [`app/layout.js`](file:///Users/siddhesh/learnings/Nextjs/new-next-app/app/layout.js) is shared across the entire application and initializes the global HTML structure and a header (`MainHeader`).
- **Metadata**: Standard SEO configuration is defined using static metadata exports in layouts:
  ```js
  export const metadata = {
    title: "Next.js Page Routing & Rendering",
    description: "Learn how to route to different pages.",
  };
  ```

### 8. Styling with CSS Modules
To ensure style scoping and avoid conflicts, the project uses CSS Modules (`*.module.css`).
- Styles are imported as an object and referenced dynamically (e.g., `className={classes.header}`).
