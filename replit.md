# NMU — National Medical University Website

## Overview
A world-class, ultra-premium homepage design for a modern medical university. Built as a static HTML/CSS/JS site served via a lightweight Node.js HTTP server.

## Tech Stack
- **Frontend:** Pure HTML5, CSS3, Vanilla JavaScript
- **Server:** Node.js built-in `http` module (`server.js`)
- **Fonts:** Google Fonts — Poppins, Playfair Display, Inter
- **No build step required**

## Project Structure
```
├── index.html       # Main homepage
├── style.css        # All styles (CSS variables, responsive, animations)
├── main.js          # Interactivity (navbar, scroll reveal, count-up, particles)
├── server.js        # Static file server on port 5000
├── replit.md        # This file
└── attached_assets/ # Original design brief
```

## Design System
- **Primary:** Deep Emerald Green `#0F5D3F`
- **Secondary:** Dark Green `#0B3D2E`
- **Accent:** Premium Gold `#F4B400`
- **Background:** Soft neutral `#F8FAFC`
- **Text:** Charcoal `#1A1A1A`
- **Typography:** Poppins (headings/UI), Playfair Display (italic accents), Inter (body)
- **Border radius:** 14px standard, 24px for larger cards

## Page Sections
1. Fixed navigation with scroll-triggered background
2. Full-screen hero with floating particles, headline, CTAs, and stats
3. Quick access glass cards (Admissions, Results, Downloads, Notices)
4. Vice Chancellor message (two-column editorial layout)
5. Discover Experience interactive panels (Study Medicine, Clinical Training, Research)
6. Campus & Facilities visual showcase
7. News & Insights editorial layout
8. Impact/Stats section with animated counters (dark green background)
9. Social/Community feed section
10. Final CTA section
11. Multi-column footer

## Development
- Server runs on `0.0.0.0:5000`
- Workflow: `node server.js`
- Deployment target: `autoscale`

## User Preferences
- Clean, luxury editorial aesthetic
- Mobile-first responsive design
- Smooth animations and subtle micro-interactions
