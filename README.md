# NJR Investments Website

Vite + React + TypeScript + Tailwind CSS. Run with Node 22.12+.

```sh
npm install
npm run dev
```

`npm run build` creates the production bundle. `npm run preview` serves it locally.

## Design system

Colors and fonts are configured in `src/index.css` using Tailwind's `@theme`. Mulish and Playfair Display are bundled locally. Original Figma images are in `public/assets`.

## Current implementation

Home is implemented from Figma node 2004:19 with responsive adjustments for tablet and mobile. Mobile navigation opens and closes. About opens the standalone `/about` page; What we do opens the standalone `/what-we-do` page. Conversation buttons open `/contact`. Its enquiry form validates name, email, country, message and consent, then submits directly through FormSubmit to the temporary test recipient savitamerwade@bearlotsfriends.com. FormSubmit uses its table email template, and Reply-To is the visitor’s email. A one-time activation email must be confirmed by the recipient before delivery works.

The standalone What we do page is implemented from Figma desktop node 2001:541 and mobile node 2001:697 in file MZzZxDyRLMVbQRTJIii7dk. It reuses the theme, fonts, original logo and Button component. Desktop and mobile navigation link both pages, and all advisory/connections/joint-venture links target the corresponding service sections.

The About page is implemented at `/about` from Figma nodes 2001:844 and 2001:968. It includes the story, chairman’s message with the bundled Playfair Display italic font, company facts, purpose, values, and office section. The office panel embeds an interactive Google Map, and Get directions opens Google Maps. Header and footer are shared with What we do.

The Contact page at `/contact` is implemented from Figma nodes 2001:1083 and 2001:1198. It includes accessible enquiry-type radio chips, a country selector, native validation, consent, and direct submission with loading, success and error states. Service enquiry links preselect the relevant enquiry type through the `type` query parameter. Contact and About use the shared OfficeMap component to embed the office location.

The Privacy policy at `/privacy-policy` is implemented from Figma nodes 2001:1304 and 2001:1388, with the supplied wording and last-updated placeholder preserved. All footers link to it; the Contact consent link opens it in a new tab so the enquiry remains intact.

The Terms of use page at `/terms-of-use` is implemented from Figma nodes 2001:1463 and 2001:1536. The supplied wording and last-updated placeholder are preserved. Footer links and its inline Privacy Policy link are connected.

All six pages are implemented. Run `npm run dev` to review locally. Contact submissions use FormSubmit; no SMTP password or SendGrid account is needed. The two legal pages retain the design's `[date]` placeholder. Contact and About contain embedded Google Maps.

## Contact email testing

Submit the form and confirm the FormSubmit activation email in savitamerwade@bearlotsfriends.com (check spam too). Then submit another enquiry to test delivery. Change `enquiryRecipient` in `src/Contact.tsx` when moving to the NJR mailbox; the new recipient must also activate. The public contact address displayed on the website remains the NJR address. FormSubmit processes the form fields to send the email.

Contact validation disables Send until name, valid email, country, nonblank message and consent are complete. Optional company and phone are not required. Errors appear after field blur; successful service acceptance shows confirmation. Failed requests preserve values and show a reference ID and failure category. Browser checks mock service success, network failure and rate limits without sending emails.

## CAPTCHA and honeypot

Contact enquiries now use standard POST to FormSubmit with `_captcha=true`, enabling its hosted CAPTCHA verification before delivery. The visitor completes verification and sees FormSubmit’s confirmation; the prior AJAX success/error response flow is replaced by this provider flow. The hidden `_honey` input is checked locally and is included in provider submissions for service-side spam handling. Required-field validation and the disabled Submit state remain; returning from verification restores the form controls. Browser checks intercept native submission to verify settings without sending email or solving CAPTCHA.

## SEO and deployment

See `SEO-IMPLEMENTATION.md` for implemented requirements, checks and owner-side launch tasks. `npm run build` now creates fully prerendered static pages with metadata, JSON-LD, WebP assets, sitemap, robots and SiteGround `.htaccess` rules in `dist`. Upload the entire contents of `dist` (including `.htaccess`) when authorized to deploy. `npm run build:staging` creates a noindex build; do not deploy that build as production. The last generated build is production/indexable.
