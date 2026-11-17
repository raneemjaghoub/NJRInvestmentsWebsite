# NJR SEO implementation

Implemented against the supplied 8-page SEO specification, dated November 9, 2026. The source project remains React/Vite rather than WordPress; equivalent functionality is implemented directly instead of installing WordPress SEO plugins.

## Included in the production build

- The specified titles and meta descriptions for all six pages; one H1 per page and semantic section/card headings. Gold eyebrow labels remain plain text.
- Canonical URLs use `https://www.njrinvestments.net/` and trailing slashes. Query parameters and fragments do not create separate canonical pages.
- Open Graph and Twitter preview tags, with a locally bundled 1200 × 630 branded image at `/assets/njr-social.png`.
- Organization and WebSite JSON-LD on every page; BreadcrumbList on inner pages. Published company/address/email/GCC service-area facts only; no invented founding date, people, phone, or social profiles.
- Build-time prerendering of all six pages. Initial HTML contains the full content and metadata without JavaScript, then React hydrates for navigation/forms. Unknown URLs render a custom 404 with useful links.
- `/sitemap_index.xml`, `/sitemap-pages.xml` with six canonical URLs, and an allow-all `/robots.txt` including the sitemap.
- `npm run build:staging` emits noindex metadata, a blocking robots file and an X-Robots-Tag rule. `npm run build` restores the indexable production version.
- Generated `dist/.htaccess` contains HTTPS/www redirects, trailing-slash redirects, directory-index handling, and a real 404 ErrorDocument for SiteGround/Apache. Upload all contents of `dist`, including the hidden `.htaccess` file.
- Responsive WebP image variants, proper alt text, explicit dimensions, lazy loading for below-fold imagery, high-priority/preloaded hero, and two preloaded Latin fonts. The main hero is approximately 27 KB.
- The header contact CTA and footer Contact link lead to the form. Enquiry type is required and starts empty, including when query parameters are present, following the latest requested behavior.
- Responsive margins/layout refinements for phones, tablets, laptops and wide screens; reduced-motion handling, readable headings, and touch-friendly navigation. Sticky persistent header and client-side page navigation remain.

## Validation performed

Production build and lint pass. All six pages were checked for title, description, canonical, robots, JSON-LD, a single H1, and content without JavaScript. Production browser checks cover 320, 390, 599, 600, 768, 1024, 1280, 1440 and 1920px widths with no horizontal overflow. Client-side metadata updates, mobile navigation, required enquiry-type selection and React hydration pass. Staging noindex behavior is verified. Home desktop/mobile/tablet previews and the share image were visually reviewed. Lazy monogram loading was checked separately.

## SiteGround / launch tasks still required

1. Install/verify SSL covering both bare and www domains; deploy the build and verify the generated 301 redirects on the real host. They have not been applied remotely.
2. Enable SiteGround caching and configure uptime monitoring/alert recipients in the owner account.
3. Add verified old URL mappings if the owner supplies any; none were guessed.
4. Verify ownership in Google Search Console and Bing Webmaster Tools, then submit `https://www.njrinvestments.net/sitemap_index.xml`.
5. Run Google's Rich Results Test and mobile PageSpeed Insights against the deployed pages. LCP <2.5s, INP <200ms and CLS <0.1 are targets, not measured production results yet.
6. Review indexing within two weeks and keywords after three months. Create/verify Google Business Profile and Bing Places with the same company details.
7. Perform real iPhone Safari, Android Chrome, iPad, desktop Safari/Firefox/Edge and 200% browser-zoom checks. Automated checks here used Chrome only.
8. Supply the original SVG logo if available. The supplied raster logo is preserved and optimized to WebP, not traced or falsely converted into SVG. Menu icons are SVG. The supplied hero source is 1024px wide; a higher-resolution original is needed for sharper large-screen 2x imagery.

No analytics, new social profile URLs, Arabic pages, articles, thin service pages, account verification, or remote publishing were added. These require separate content/account inputs or later work. Legal pages share the last-modified date from `src/legal-config.ts`.
