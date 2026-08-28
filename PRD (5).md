# Product Requirements Document (PRD)
## Calisa Beauty Salon — Website

**Version:** 1.0
**Owner:** Calisa Beauty Salon
**Prepared for:** Development agent (OpenCode CLI)
**Last updated:** 2026-08-28

---

## 1. Overview

### 1.1 Purpose
Build a modern, elegant, high-converting website for **Calisa Beauty Salon**, a beauty salon located in Al Suwaiq, North Al Batinah, Oman. The site's core job is to turn visitors (mostly mobile) into phone calls / bookings, while presenting the salon as premium, trustworthy, and welcoming.

### 1.2 Business Information
| Field | Value |
|---|---|
| Business Name | Calisa Beauty Salon |
| Category | Beauty Salon |
| Phone | 76090204 |
| Address | Opposite Atlas Discount, North Al Batinah, Al Suwaiq Centre, above Suyo (Hudna) Coffee Shop, Al Manfish 326, Oman |
| Reviews | 41 reviews, 4.9★ average |

### 1.3 Goals
- Establish a premium, trustworthy first impression within 3 seconds of landing.
- Make it effortless to call, WhatsApp, or find directions to the salon.
- Showcase services, ambience, and social proof (reviews) clearly.
- Be fast and fully usable on mobile, since most traffic will be phone-based.

### 1.4 Non-Goals (out of scope for v1)
- Online payment processing.
- Full online appointment-booking system with staff/time-slot selection (v1 uses call/WhatsApp as the booking mechanism; a booking system can be a future phase).
- Multi-language support (v1 is English only; Arabic can be a future phase).
- E-commerce / product sales.
- User accounts / login.

---

## 2. Target Users

| Persona | Description | Primary Need |
|---|---|---|
| Local customer (mobile) | Nearby resident searching "salon near me" or clicking from Google Maps/Instagram | Quickly see services, trust signals, and call/get directions |
| Returning customer | Existing client checking hours, location, or new services | Confirm hours/location fast |
| Prospective bride/event client | Searching for bridal/party makeup services | See service details, gallery, and reviews before calling |

---

## 3. Success Metrics
- Visitor → call/WhatsApp click-through rate.
- Time to first meaningful paint < 2s on 4G mobile.
- Mobile usability score (Lighthouse) ≥ 90.
- Accessibility score (Lighthouse) ≥ 90.
- Bounce rate reduction vs. no-website baseline (qualitative, post-launch).

---

## 4. Functional Requirements

### 4.1 Navigation
- FR-1: Sticky navbar with links to Home, About, Services, Gallery, Reviews, Location, Contact.
- FR-2: Navbar transitions from transparent (over hero) to solid background on scroll.
- FR-3: Mobile hamburger menu with slide-in animation.
- FR-4: Persistent "Call Now" / "Book Now" button visible in navbar at all times.

### 4.2 Hero Section
- FR-5: Full-width hero image/video with headline, subheadline, and two CTAs ("Book an Appointment", "Explore Services").
- FR-6: Trust badge showing 4.9★ rating and 41 reviews near the CTA.

### 4.3 About Section
- FR-7: Salon introduction with 3–4 highlight points (e.g., expert stylists, premium products, hygienic environment).

### 4.4 Services Section
- FR-8: Grid of service cards (Hair, Coloring, Facials, Nails, Bridal/Makeup, Waxing/Threading, Spa/Massage, Brows/Lashes).
- FR-9: Each card includes name, short description, optional starting price, and hover animation.

### 4.5 Gallery Section
- FR-10: Responsive image grid/masonry gallery of salon work and interior.
- FR-11: Lightbox view on image click.

### 4.6 Reviews Section
- FR-12: Prominent display of 4.9★ / 41 reviews stat, animated count-up on scroll into view.
- FR-13: Testimonial carousel with client name, rating, and short quote; auto-play with pause on hover/touch.

### 4.7 Location & Contact Section
- FR-14: Embedded Google Map pinned to the salon's address.
- FR-15: Full address displayed as plain text (see §1.2).
- FR-16: Click-to-call link using `tel:76090204`.
- FR-17: WhatsApp click-to-chat link (`https://wa.me/968XXXXXXXX` — confirm country code before launch).
- FR-18: Opening hours block (placeholder content, editable).
- FR-19: Simple contact form (Name, Phone, Service Interested In, Message) — submits via `mailto:` or WhatsApp deep link (no backend in v1).

### 4.8 Footer
- FR-20: Logo/tagline, quick links, contact info, social icons, copyright line.

### 4.9 Global / Cross-cutting
- FR-21: Floating call/WhatsApp button (bottom corner) visible on all pages, gentle pulse animation.
- FR-22: All CTAs pointing to phone/WhatsApp must use the real number consistently across the site.
- FR-23: 404 page (if multi-page) with link back to home.

---

## 5. Design Requirements

### 5.1 Visual Identity
- **Color palette:** Ivory/cream background (`#FBF6F0`), blush pink (`#F3D9DF`), rose gold accent (`#B76E79`), deep charcoal (`#2B2321`), muted gold highlight (`#C9A66B`).
- **Typography:** Headings in `Playfair Display` or `Cormorant Garamond`; body/UI in `Poppins` or `Lato`; optional script accent font for logo/tagline only.
- **Style:** Soft rounded corners (12–20px), subtle shadows, generous white space, gold-line dividers, warm-toned imagery.

### 5.2 Motion / Animation
- Scroll-triggered fade/slide-up reveals (staggered for grids/cards).
- Hover micro-interactions: button scale + glow, card lift, image zoom.
- Animated stat counters (rating/review count).
- Smooth-scroll anchor navigation.
- Respect `prefers-reduced-motion` for all animations.

### 5.3 Responsiveness
- Breakpoints: mobile (≤480px), tablet (481–1024px), desktop (1025px+).
- Mobile-first layout priority — hero, CTAs, and click-to-call must be immediately visible without scrolling on mobile.

### 5.4 Accessibility
- WCAG AA color contrast minimum.
- Alt text on all images.
- Keyboard-navigable menu and form.
- Visible focus states.

---

## 6. Technical Requirements

- **Stack:** HTML5/CSS3 (or Tailwind CSS) + vanilla JS or lightweight framework (React/Vite), agent's choice.
- **Animation library:** AOS or custom IntersectionObserver-based reveals.
- **Fonts/Icons:** Google Fonts CDN; icon set such as Lucide or Font Awesome.
- **Images:** Lazy-loaded, compressed/optimized, responsive `srcset` where practical.
- **SEO:** Semantic HTML, single `<h1>` per page, meta title/description, Open Graph tags, descriptive alt text.
- **Performance target:** Lighthouse Performance ≥ 85 on mobile.
- **Hosting-agnostic:** Static build output deployable to any static host (Netlify, Vercel, GitHub Pages, etc.).

---

## 7. Content Requirements
- Real business name, phone, address, and review stats must be used exactly as provided (§1.2) throughout the site.
- Service list, pricing, opening hours, and gallery images are placeholders in v1 and must be clearly marked as editable/sample content for the business owner to replace.
- Testimonial content should be marked as sample/placeholder unless real reviews are supplied.

---

## 8. Assumptions & Open Questions
- **Assumption:** Country code for WhatsApp is +968 (Oman) — needs confirmation.
- **Open question:** Opening hours (not provided — using placeholder Sat–Thu 9AM–9PM, Fri limited/closed).
- **Open question:** Does the business have a logo, or should the site use a text-based wordmark?
- **Open question:** Real service prices and real photos — to be supplied by business owner post-build, or should the agent source elegant stock placeholders in the meantime?
- **Open question:** Single-page scrolling site vs. multi-page (separate URLs per section)? Default assumption: single-page with anchor navigation for v1 simplicity.

---

## 9. Milestones (suggested build order for the agent)
1. Scaffold project (stack setup, fonts, color/theme tokens).
2. Build static layout: Navbar, Hero, About, Services, Gallery, Reviews, Location/Contact, Footer.
3. Wire up real business data (phone, address, map, review stats) into all relevant sections.
4. Add animations/interactions (scroll reveals, hover states, counters, carousel).
5. Responsive pass across breakpoints.
6. Accessibility + performance pass (Lighthouse audit, fix issues).
7. Final content placeholder review — flag anything the business owner needs to replace.

---

## 10. Acceptance Criteria
- [ ] All sections in §4 are implemented and functional.
- [ ] Phone number and address match §1.2 exactly, used consistently site-wide.
- [ ] Site is fully responsive with no layout breakage at 320px, 768px, 1024px, 1440px widths.
- [ ] Click-to-call and WhatsApp links work correctly.
- [ ] Google Map correctly pins the provided address.
- [ ] Lighthouse scores: Performance ≥ 85, Accessibility ≥ 90 (mobile).
- [ ] Animations respect `prefers-reduced-motion`.
- [ ] No console errors in browser dev tools.
