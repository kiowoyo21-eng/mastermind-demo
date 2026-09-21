MASTERMIND AUTOWORKS — WHITE PREMIUM WEBSITE BUILD

Current build status
- Premium white / black / orange visual system aligned with the supplied Mastermind branding and workshop imagery.
- Uses only local Mastermind workshop/service photos in the primary experience; no third-party repair imagery is presented as Mastermind work.
- Includes dedicated pages for Our Standard, Work & Process, Reviews, Contact, Schedule, and five publicly listed service categories.
- Service cards use side-by-side VIEW DETAILS and CONSULT NOW actions on larger screens and stack on very small screens.
- The hero uses a subtle technical grid over the workshop image, with a reduced Mastermind Standard overlay.
- Client testimonial artwork is shown as supplied. The site does not claim those graphics are Google reviews; Google Maps is linked separately for independent public review context.
- Testimonial images include hidden text transcripts for screen-reader accessibility.
- Booking creates a pre-filled SMS request and does not claim to auto-confirm or store an appointment.
- Booking prevents selection of past dates in supported browsers.
- Includes tap-to-call, Google Maps directions, email, Messenger, robots.txt, sitemap.xml, Open Graph metadata, canonical URLs, structured data, keyboard focus states, a skip link, and Vercel security headers.

Public facts currently used
- Address: 858 Balagtas St., Addition Hills, Mandaluyong City.
- Mobile: +63 917 629 0000.
- Public email: manda@mastermindautoworks.com, listed in Metrobank's 2026 Mastermind Autoworks promotion.
- Hours are phrased as “Open daily from 8:00 AM” and link to the live Google Maps listing for current closing time.
- Facebook / Messenger handle used: mastermindautoworks. This handle also appears in the supplied Mastermind testimonial artwork; owner confirmation is still recommended before production launch.

Air-conditioning scope
- Air-conditioning is NOT listed in the public homepage service grid, booking selector, or sitemap in this QA build.
- The retained /services/air-conditioning/ page is marked noindex and asks users to confirm current availability directly with Mastermind.
- Reason: the latest DTI accreditation record found in the audit was dated December 31, 2025 and described Mastermind's category as engine and electrical repairs excluding aircon servicing. A current 2026 accreditation record was not verified during this build.

Routes
- /
- /about/
- /work/
- /reviews/
- /contact/
- /book/
- /services/diagnostics/
- /services/preventive-maintenance/
- /services/engine-drivetrain/
- /services/suspension-steering/
- /services/electrical-electronics/

Retained non-indexed review route
- /services/air-conditioning/ — confirm current service scope before relisting publicly.

Before production-domain launch
1. Replace https://mastermind-demo.vercel.app in canonical URLs, Open Graph URLs, sitemap.xml, robots.txt, and JSON-LD with the final production domain.
2. Have Mastermind confirm the Facebook / Messenger username and any Instagram / TikTok destinations before adding more social links.
3. Reconfirm current phone, address, email, business hours, payment methods, warranty terms, pricing statements, and service scope with the owner.
4. Test the SMS booking action on at least one current iPhone and one current Android device; SMS URI handling can vary by platform/browser.
5. If true online appointment submission is required, connect the form to the approved CRM / booking backend instead of relying on SMS.

QA changes in this build
- Removed invalid closing link tags from HTML.
- Removed visible development-only wording from customer-facing copy.
- Corrected homepage section numbering.
- Corrected the Schedule page nav state and marked the Schedule CTA as the current page.
- Fixed the homepage footer logo link.
- Added a today-or-later date constraint to the scheduling form.
- Separated supplied testimonial artwork from Google Maps review claims.
- Added accessible testimonial transcripts.
- Temporarily removed unverified air-conditioning service promotion from public discovery paths.
