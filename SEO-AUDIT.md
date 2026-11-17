# NJR website SEO audit — 17 November 2026

## Result

The local production build passes the checks below and follows the supplied SEO specification. The public domain is not ready for indexing: hosting and SSL must be corrected before launch.

## Verified locally

- All six pages contain their unique approved title and description in the initial HTML, with exactly one H1, one canonical URL, and index/follow directives.
- Full page copy is present before JavaScript runs. React hydrates without reported page errors.
- HTTPS/www canonicals, Open Graph and Twitter tags, Organization/WebSite JSON-LD, and inner-page BreadcrumbList are present.
- The sitemap lists the six canonical page URLs; robots.txt allows crawling and points to the sitemap.
- Referenced local scripts, stylesheets and images exist. All images have alt attributes; the map has an accessible title.
- Chrome layout checks at 320, 390, 768, 1024 and 1440px found no horizontal page overflow on any of the six pages.
- Mobile navigation and client-side metadata updates work. Mobile arrows use the gold token.
- Contact form starts without an enquiry type, even with a type query parameter. Send remains disabled without a required selection and enables when required fields, consent and a six-character code are supplied. Contact sidebar has no email link.
- Form checks used a mocked CAPTCHA response; no email was sent. Actual delivery remains a separate deployment check.
- Build and lint pass. Direct index.html URLs now have generated Apache 301 rules to their clean URLs, guarded against internal directory-index requests. Verify those rules on SiteGround after upload.

## Public hosting checks

Direct HTTPS checks on 17 November 2026 returned:

- https://www.njrinvestments.net/ — HTTP 503 Service Unavailable.
- https://njrinvestments.net/ — TLS hostname mismatch: the certificate does not cover the bare domain.

These prevent reliable access regardless of the local SEO implementation. Confirm the intended SiteGround site IP and DNS records, install SSL for both hostnames, then upload the contents of dist including .htaccess. Preserve existing email DNS records. Recheck HTTPS, www redirects, page status codes and an unknown URL returning a real 404 after deployment.

## Checks requiring the working live site / owner account

- Verify Google Search Console and Bing Webmaster Tools ownership, then submit https://www.njrinvestments.net/sitemap_index.xml.
- Run live PageSpeed Insights and Google structured-data validation. Core Web Vitals targets are not measured production results.
- Confirm real contact email delivery, CAPTCHA rejection and success/error feedback on SiteGround PHP.
- Enable uptime alerts, confirm any old-URL redirects with the owner, and complete real-device Safari/Android and other desktop browser checks.

The audit does not guarantee indexing or rankings. The source SEO-IMPLEMENTATION.md lists remaining launch tasks and image-source limitations.
