# Contact form

The Contact page shows a six-character security image, a code entry field and New code button. Visitors stay on the page. The server verifies a single-use, five-minute challenge before forwarding an enquiry to FormSubmit. Honeypot and per-IP request limits remain enabled. This simple image challenge provides a basic spam barrier; it is not equivalent to managed bot detection.

`npm run dev` runs the local Node endpoint through Vite. Production uses `public/api/contact.php`, copied to `dist/api/contact.php` by the build. Deploy the entire `dist` directory to SiteGround's `public_html`; PHP sessions, cURL and outbound HTTPS must be available. `vite preview` only previews static pages and does not run PHP. Production PHP execution must be enabled; do not deploy this endpoint to static-only hosting.

The temporary recipient is savitamerwade@bearlotsfriends.com. Set the server environment variable `NJR_CONTACT_RECIPIENT` to change it, or change the fallback in both `server/contact.ts` and `public/api/contact.php`. Activate the new recipient with FormSubmit when switching. No credentials belong in frontend Vite environment variables.

The email keeps FormSubmit's table template and sender branding. An accepted delivery request displays the on-page success message; errors retain the entered details and show an error ID. A provider acceptance does not guarantee inbox delivery. Verify a real enquiry after deploying on SiteGround; recipient activation may be required for the new domain.

For automated local tests only, start Vite with `NJR_CONTACT_TEST=1`. This disables delivery in the development handler after all validation succeeds; production PHP never uses this flag. Do not use this flag for manual email-delivery testing.
