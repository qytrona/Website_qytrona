// Portfolio content for /portfolio, /portfolio/[category] and /portfolio/work/[slug].
//
// IMPORTANT: projects marked `sample: true` are placeholders (shown with a "Sample project"
// badge), so the site never presents invented work as real. Replace each with a real project
// (name, summary, details, screenshots) and set `sample: false`.
//
// cover.type: "browser" | "dashboard" | "phone" — picks the animated mockup;
//             "image" — a real screenshot: { type: "image", src, alt, position? }.
// industry: slug from IndustryComponents/industriesData.js
// services: slugs from SolutionComponents/solutionsData.js

export const categories = [
  {
    slug: "website-design",
    name: "Website Design",
    icon: "layout",
    title: "Websites we've",
    highlight: "designed & built",
    intro: "Fast, beautiful, conversion-focused websites for businesses across industries.",
  },
  {
    slug: "web-applications",
    name: "Web Applications",
    icon: "code",
    title: "Web apps that",
    highlight: "run businesses",
    intro: "Platforms, portals and dashboards that automate work and scale with our clients.",
  },
  {
    slug: "mobile-applications",
    name: "Mobile Applications",
    icon: "mobile",
    title: "Mobile apps people",
    highlight: "love to use",
    intro: "iOS and Android apps designed around real user journeys, from MVP to launch.",
  },
  {
    slug: "case-studies",
    name: "Case Studies",
    icon: "briefcase",
    title: "Deep dives into",
    highlight: "our work",
    intro: "The challenge, the solution and the outcome — a closer look at selected projects.",
  },
];

export const projects = [
  {
    slug: "homelo-real-estate-website",
    sample: false,
    featured: true,
    name: "Homelo",
    category: "website-design",
    industry: "real-estate",
    services: ["website-development", "seo"],
    platform: "Web",
    cover: {
      type: "image",
      src: "/Images/P1.jpg",
      alt: "Homelo real estate website shown on a laptop",
      position: "object-[center_60%]",
    },
    summary:
      "A modern real estate website for Homelo — showcasing luxury and eco-friendly homes and guiding buyers from browsing to enquiry.",
    challenge:
      "Homelo needed a premium online presence that matched its modern homes and made it easy for buyers to explore properties and take the next step.",
    solution:
      "We designed and built a clean, image-led website with a bold hero, clear property categories (Modern, Luxury, Eco Friendly), a simple 'How It Works' journey and prominent Get Started and Contact calls to action.",
    features: [
      { icon: "layout", title: "Bold, Modern Design", desc: "A striking hero and clean layout that reflect the brand." },
      { icon: "building", title: "Property Showcase", desc: "Browse homes by style — modern, luxury and eco-friendly." },
      { icon: "target", title: "Clear Buyer Journey", desc: "'How It Works' steps and FAQs that answer questions upfront." },
      { icon: "chat", title: "Easy Enquiries", desc: "Get Started and Contact Us actions on every page." },
    ],
    outcomes: ["Premium brand presence online", "Easy property discovery", "Clear path from browsing to enquiry", "Fast, mobile-friendly experience"],
    tech: ["Next.js", "Tailwind CSS", "Vercel", "Google Analytics"],
  },
  {
    slug: "flygo-travel-agency-website",
    sample: false,
    featured: false,
    name: "FLYGO Travel Agency Website",
    category: "website-design",
    industry: "travel",
    industryLabel: "Travel & Tourism", // no industry page for travel yet
    services: ["website-development", "seo"],
    platform: "Web",
    cover: {
      type: "image",
      src: "/Images/P7.jpg",
      alt: "FLYGO travel agency website with a 'Travel around the world' hero, popular routes and services",
    },
    summary:
      "A bold travel agency website for FLYGO — inspiring destinations, popular routes with dates and prices, and an easy path to enquire or book.",
    challenge:
      "FLYGO needed a modern website that inspires travellers, showcases its most popular routes and turns browsing into enquiries and bookings.",
    solution:
      "We designed and built an image-led site with a striking 'Travel around the world' hero, a routes carousel with dates and fares, a 'What we do' services section, reviews and a blog.",
    features: [
      { icon: "globe", title: "Inspiring Hero", desc: "Big imagery and bold type that sell the destination." },
      { icon: "pin", title: "Popular Routes", desc: "Route cards with destinations, travel dates and starting prices." },
      { icon: "spark", title: "Services & Reviews", desc: "'What we do' and traveller reviews that build trust." },
      { icon: "chat", title: "Easy Enquiries", desc: "Contact and sign-in actions always one click away." },
    ],
    outcomes: ["Strong, memorable travel brand", "Routes and prices easy to compare", "Clear path from inspiration to enquiry", "Fast, mobile-friendly experience"],
    tech: ["Next.js", "Tailwind CSS", "Vercel", "Google Analytics"],
  },
  {
    slug: "horizon-logistics-platform",
    sample: false,
    featured: true,
    name: "Horizon Logistics",
    category: "web-applications",
    industry: "logistics",
    services: ["custom-software"],
    platform: "Web",
    cover: {
      type: "image",
      src: "/Images/P2.jpg",
      alt: "Horizon Logistics warehouse operations dashboard showing trucks, docks and load progress",
    },
    summary:
      "A fleet and warehouse operations platform for Horizon Logistics — live truck status, dock assignments and load progress in one dashboard.",
    challenge:
      "Warehouse and dispatch teams needed one place to see which trucks were on site, what was loading at each dock and which shipments were ready to go.",
    solution:
      "We built a web dashboard covering fleet management, warehouse operations, shipments and route planning, with live truck cards showing route, driver, dock, status and load progress.",
    features: [
      { icon: "chart", title: "Warehouse Overview", desc: "Trucks inside, unassigned shipments, active docks and dispatch-ready loads at a glance." },
      { icon: "truck", title: "Live Truck Status", desc: "Loading, ready and completed states with load progress per truck." },
      { icon: "pin", title: "Docks & Routes", desc: "Every truck's route, driver and loading dock in one card." },
      { icon: "gear", title: "Fleet & Shipments", desc: "Vehicles, maintenance, shipments, route planning and reports in one system." },
    ],
    outcomes: ["One view of warehouse operations", "Clear status for every truck and dock", "Faster dispatch decisions", "Fleet, shipments and reports in one place"],
    tech: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    slug: "construction-project-dashboard",
    sample: false,
    featured: false,
    name: "Construction Project Dashboard",
    category: "web-applications",
    industry: "construction",
    services: ["custom-software"],
    platform: "Web",
    cover: {
      type: "image",
      src: "/Images/P6.jpg",
      alt: "Business dashboard with customer, profit and expense metrics, a monthly sales chart and an upcoming schedule",
    },
    summary:
      "A business dashboard for a construction company — customers, profit and expenses, monthly performance and the team's schedule in one place.",
    challenge:
      "Key numbers and meetings were spread across spreadsheets and calendars, so managers had no quick way to see how the business was performing.",
    solution:
      "We built a clean web dashboard with KPI cards for customers, profit and expenses, a monthly sales overview, platform usage, a calendar and an upcoming-schedule list.",
    features: [
      { icon: "chart", title: "Key Metrics", desc: "Total and active customers, profit and expenses with month-on-month change." },
      { icon: "growth", title: "Sales Overview", desc: "Monthly profit and expense chart to spot trends quickly." },
      { icon: "calendar", title: "Schedule & Calendar", desc: "Planning sessions, standups and reviews in one view." },
      { icon: "users", title: "Customers & Reports", desc: "Customer lists, reviews, messages and analytics built in." },
    ],
    outcomes: ["One view of business performance", "Faster, data-led decisions", "Team schedule always visible", "Less time compiling reports"],
    tech: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    slug: "team-cash-distribution-management",
    sample: false,
    featured: true,
    name: "Team Cash Distribution Management",
    category: "mobile-applications",
    industry: "fintech",
    services: ["mobile-app-development", "custom-software"],
    platform: "iOS + Android",
    cover: {
      type: "image",
      src: "/Images/P3.jpg",
      alt: "Team cash distribution app showing the balance, cards, send and add actions and recent transactions",
    },
    summary:
      "A mobile app for managing and distributing team cash — a shared balance, cards, quick transfers to team members and a clear transaction history.",
    challenge:
      "Handing out and tracking cash across a team relied on manual records, making it hard to see the balance, who received what, and when.",
    solution:
      "We designed and built a clean mobile app with a live balance, linked cards, one-tap Add and Send actions and a transaction feed that labels every transfer and income.",
    features: [
      { icon: "dollar", title: "Live Balance", desc: "See the team's available funds at a glance." },
      { icon: "users", title: "Send to Team Members", desc: "Distribute cash to people in a couple of taps." },
      { icon: "chart", title: "Transaction History", desc: "Every transfer and income, dated and labelled." },
      { icon: "lock", title: "Secure Accounts", desc: "Account sign-up and protected access to funds." },
    ],
    outcomes: ["Clear view of team funds", "Faster cash distribution", "Every transaction traceable", "Simple, trustworthy mobile UX"],
    tech: ["Flutter", "Node.js", "PostgreSQL"],
  },
  {
    slug: "ibnesina-healthcare-website",
    sample: false,
    featured: true,
    name: "Ibnesina Healthcare",
    category: "website-design",
    industry: "healthcare",
    services: ["website-development", "seo"],
    platform: "Web",
    cover: {
      type: "image",
      src: "/Images/P4.jpg",
      alt: "Ibnesina healthcare website with a dental care hero, product categories and awards",
      position: "object-top",
    },
    summary:
      "A modern healthcare website for Ibnesina — dental care, appointment booking, medical products and the company's achievements in one clean experience.",
    challenge:
      "Ibnesina needed a trustworthy, modern website that presents its care services and medical products clearly and turns visitors into booked appointments.",
    solution:
      "We designed and built an image-led site with a bold dental-care hero, Schedule an Appointment and Download App actions, a product showcase and an awards & recognition section.",
    features: [
      { icon: "calendar", title: "Appointment Booking", desc: "Schedule an appointment straight from the hero." },
      { icon: "medical", title: "Care & Products", desc: "Medical devices, medicines, vaccines and more, clearly organised." },
      { icon: "users", title: "Specialist Doctors", desc: "Highlights the team and 24/7 service availability." },
      { icon: "spark", title: "Awards & Recognition", desc: "A showcase that builds trust with patients and partners." },
    ],
    outcomes: ["Trustworthy, modern brand presence", "Clear path to booking an appointment", "Products and services easy to explore", "Fast, mobile-friendly experience"],
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "media-streaming-app",
    sample: false,
    featured: false,
    name: "Media Streaming App",
    category: "mobile-applications",
    industry: "media-entertainment",
    services: ["mobile-app-development"],
    platform: "iOS + Android",
    cover: {
      type: "image",
      src: "/Images/P5.jpg",
      alt: "Media streaming app home screen with curated playlists, Discover Weekly and top daily playlists",
      position: "object-[center_40%]",
    },
    summary:
      "A music and media streaming app with a personalised home feed, curated playlists and quick playback controls.",
    challenge:
      "Listeners needed an app that makes discovering new content effortless — with personal picks up front and playback always one tap away.",
    solution:
      "We designed and built a dark, vibrant mobile app with a personalised greeting, New Release and Trending filters, a curated 'Discover weekly' card, daily playlists and a floating navigation bar.",
    features: [
      { icon: "spark", title: "Personalised Home", desc: "A greeting and picks tailored to each listener." },
      { icon: "media", title: "Curated Playlists", desc: "Discover weekly and top daily playlists front and centre." },
      { icon: "search", title: "Browse & Filter", desc: "All, New Release and Trending filters plus search." },
      { icon: "heart", title: "Save & Download", desc: "Like, download and play in a single tap." },
    ],
    outcomes: ["Effortless content discovery", "Playback always one tap away", "Bold, modern brand feel", "Smooth on iOS and Android"],
    tech: ["React Native", "Node.js", "AWS"],
  },
];

export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const getProject = (slug) => projects.find((p) => p.slug === slug);

// Case studies = featured projects.
export const projectsInCategory = (slug) =>
  slug === "case-studies"
    ? projects.filter((p) => p.featured)
    : projects.filter((p) => p.category === slug);
