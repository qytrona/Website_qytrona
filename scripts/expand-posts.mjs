// Replaces the short starter blog posts with full long-form versions.
// Only updates a post while it is still short (< 400 words), so anything expanded or edited in the
// admin panel is never overwritten.
// Usage: node --env-file=.env.local scripts/expand-posts.mjs
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  console.error("Set MONGODB_URI in .env.local first.");
  process.exit(1);
}

const articles = {
  "5-signs-your-business-needs-a-new-website": {
    excerpt:
      "Is your website helping or hurting your business? Here are five clear signs it's time for an upgrade, what a good business website should include, and how to plan the switch.",
    content: `## Why your website still matters

Before most people call, visit or buy, they look you up. They search on Google, tap your Instagram link or open the website a friend shared. In those few seconds your website is your **first impression** — and often the deciding factor between you and a competitor.

A website that looked great five years ago can quietly cost you customers today. Phones have changed, Google has changed and customer expectations have changed. The good news: the warning signs are easy to spot.

## 5 signs it's time for a new website

### 1. It doesn't work well on mobile phones

Most visitors now arrive on a phone. If they have to pinch, zoom or scroll sideways, they leave. Open your site on your own phone and try to find your phone number, your services and your location. If any of that takes more than a few seconds, your visitors are struggling too.

### 2. It takes more than a few seconds to load

People are impatient online. Large images, outdated plugins and cheap hosting all slow a site down — and a slow site loses visitors before they even see your offer. Speed also affects how Google ranks your pages.

### 3. Customers can't easily call, WhatsApp or book

Your website should make the next step obvious. Every page should have a clear way to:

- Call you with one tap
- Message you on WhatsApp
- Fill in a short enquiry or booking form

If customers have to hunt for your contact details, many simply won't bother.

### 4. The design no longer reflects your brand

Your business has grown, but your website may still show old photos, old services or an old logo. An outdated design makes people wonder whether you're still active — or whether you pay attention to detail.

### 5. You don't show up on Google for your services

Search for your main service plus your city, for example "interior designer in Kochi". If your competitors appear and you don't, your website isn't working as a sales channel. Missing page titles, thin content and no location pages are common causes.

> Your website should work as hard as your best salesperson — every day, at any hour.

## What a good business website includes

- **A clear headline** that says what you do and where you do it
- **Click-to-call and WhatsApp buttons** on every page
- **Service pages** written for customers, not for search engines
- **Proof** — reviews, testimonials and photos of real work
- **Basic SEO** — page titles, descriptions, a sitemap and Google Search Console
- **Fast hosting and an SSL certificate** (the padlock in the browser bar)

## Redesign or rebuild?

If your content is still accurate and the site is reasonably fast, a **redesign** — new layout, new visuals, better calls to action — may be enough. If the site is slow, hard to update or built on outdated technology, a **rebuild** usually costs less in the long run than patching it again and again.

## How to plan the switch

1. List the questions customers ask you most often.
2. Write down the services you want more enquiries for.
3. Collect your best photos, reviews and case studies.
4. Note two or three websites you like, and why.
5. Keep your existing domain so you don't lose search rankings.

## Frequently asked questions

### Will I lose my Google rankings if I change my website?

Not if the move is planned properly. Keeping your domain and redirecting old page addresses to the new ones protects the rankings you've already earned.

### How long does a new business website take?

Most business websites take 2 to 4 weeks, depending on the number of pages and how quickly content and feedback are ready.

## Next steps

Start with that list of customer questions, then build pages that answer them clearly. If you'd like help, [see how we build websites](/solutions/website-development) or [talk to our team](/contact).`,
  },

  "website-vs-mobile-app-which-first": {
    excerpt:
      "Should you build a website or a mobile app first? A practical guide to choosing the right starting point for your business, budget and customers — with real examples.",
    content: `## Start with how your customers find you

Most new customers discover a business through Google, Instagram, WhatsApp or a friend's recommendation. Almost every one of those paths opens a **website**, not an app store. Nobody downloads an app from a business they've never heard of.

That's why, for most businesses, a website is the right first step — and an app becomes valuable once you have customers who come back again and again.

## Website vs mobile app at a glance

- **Discovery:** websites are found on Google; apps must be found in an app store
- **Cost to start:** a business website usually costs much less than an app
- **Updates:** a website updates instantly; app updates go through store review
- **Best for:** websites win new customers; apps keep loyal customers engaged
- **Access:** a website works on any device with a browser; an app must be installed

## When a website should come first

- You need to be found on Google and Maps
- Customers buy or visit occasionally — a few times a year
- You want calls, WhatsApp messages and enquiry forms
- Your budget is limited and you need results quickly
- You're still testing which services customers want most

**Example:** a dental clinic, interior designer or real estate developer. Patients and buyers search, compare and enquire — a fast website with clear service pages does that job best.

## When a mobile app makes sense

- Customers use your service often — daily or weekly
- You need push notifications, offline access, the camera or GPS
- You run bookings, deliveries, memberships or loyalty rewards
- You already have steady traffic and want to increase repeat use

**Example:** a food delivery service, a gym with class bookings or a logistics company tracking drivers. These businesses rely on repeat use and real-time updates — exactly what apps do best.

> A website brings new customers in. An app keeps loyal customers close.

## The smart path: website first, app second

Many successful businesses follow the same route:

1. **Launch a fast, mobile-friendly website** to win customers and learn what they want.
2. **Watch what people use most** — bookings, orders, tracking, payments.
3. **Build an app around those features** for your most loyal customers.

This keeps early costs down and makes sure your app solves real problems instead of guessed ones.

## What about web apps?

Sometimes the answer is in between. A **web app** — like a booking portal or customer dashboard — runs in the browser but feels like an app. It needs no download, works on every device and can later become a mobile app if demand grows.

## Questions to ask before you decide

1. How do most customers find you today?
2. How often does a typical customer come back?
3. Do you need notifications, offline use or phone features?
4. What budget and timeline are you working with?
5. Who will update the content after launch?

## Frequently asked questions

### Can one project cover both?

Yes. Many apps share a backend with the website, so customer accounts, orders and content stay in sync. Planning both together from the start saves rework later.

### Is a cross-platform app good enough?

For most business apps, yes. Cross-platform frameworks let one codebase run on both iOS and Android, which lowers cost and speeds up updates.

## Not sure which fits?

Tell us how your customers buy from you and we'll suggest the simplest path. Explore our [website](/solutions/website-development) and [mobile app](/solutions/mobile-app-development) services, or [book a free call](/contact).`,
  },

  "local-seo-checklist-google-maps": {
    excerpt:
      "A practical local SEO checklist to help your business appear on Google Maps and in 'near me' searches — from your Business Profile to reviews, citations and location pages.",
    content: `## Why local SEO matters

When someone searches "dentist near me" or "bakery in Kochi", Google shows a map with a handful of businesses at the top — often called the **local pack**. These spots get a large share of the calls, direction requests and website visits, and you don't pay per click to appear there.

Local SEO is the work of making sure Google understands **what you do, where you are and why people trust you.**

## How Google ranks local businesses

Google looks at three main things:

- **Relevance** — how well your profile and website match the search
- **Distance** — how close you are to the person searching
- **Prominence** — how well known and trusted you are: reviews, mentions and links

You can't move your shop closer to every customer, but you can improve relevance and prominence a lot.

## Your local SEO checklist

### 1. Claim and complete your Google Business Profile

- Verify your business and choose the most accurate **primary category**
- Add secondary categories for other main services
- Fill in opening hours, phone, WhatsApp, website and service areas
- Write a clear description of what you do and where
- Upload real photos of your shop, team and work — and keep adding them

### 2. Keep your details consistent everywhere

Your business **name, address and phone number** should be exactly the same on your website, Google, Facebook, Instagram and directories like Justdial. Small differences — "Rd" vs "Road", old phone numbers — confuse search engines and customers.

### 3. Collect reviews regularly

- Ask happy customers for a review right after a good experience
- Share a short review link on WhatsApp or print a QR code at your counter
- Reply to every review — thank good ones, respond calmly and helpfully to bad ones
- Never buy or fake reviews; it breaks Google's rules and can get your profile suspended

### 4. Build location pages on your website

If you serve several areas, create a page for each one. Explain your services there, mention local landmarks and include directions or service details. Avoid copying the same text with only the city name changed.

### 5. Make your site fast and mobile-friendly

Most local searches happen on phones, often on the move. Click-to-call buttons, a map and a short enquiry form should be easy to reach on every page.

### 6. Post updates and offers

Google Business Profile lets you publish posts — offers, events and news. Regular posts show your business is active and give customers another reason to choose you.

> Reviews, photos and accurate details do more for local rankings than any trick.

## Common local SEO mistakes

1. Using a virtual office or fake address
2. Stuffing keywords into the business name
3. Leaving old phone numbers on directories
4. Ignoring negative reviews
5. Having no website, or a slow one

## Frequently asked questions

### How long does local SEO take?

Profile fixes can help within weeks. Steady growth from reviews, content and citations usually builds over a few months.

### Do I need a website if I have a Google Business Profile?

Yes. Your website gives Google more information about your services and gives customers a place to compare, trust and contact you.

## Need a hand?

We set up and manage Google Business Profiles and local SEO for businesses across Kerala and beyond. See our [SEO services](/solutions/seo) or [talk to us](/contact).`,
  },

  "business-website-cost-india": {
    excerpt:
      "What actually decides the price of a website in India? We break down the costs — pages, design, features, content, hosting and maintenance — so you can plan with confidence.",
    content: `## Why website prices vary so much

Ask five agencies for a website quote and you may get five very different numbers. That's because "a website" can mean anything from a single landing page built on a template to a custom platform with bookings, payments and integrations.

Understanding what drives the cost helps you compare quotes fairly and avoid surprises later.

## What decides the cost

### 1. Number and type of pages

A 5-page business site costs less than a 30-page site with separate service pages, location pages and a blog. Each page needs layout, content and testing.

### 2. Custom design vs template

A **template** is faster and cheaper but looks like many other sites. A **custom design** is made for your brand and your customers — it takes more time but helps you stand out and convert better.

### 3. Features and functionality

Features add development time. Common ones include:

- Enquiry, booking or quote forms
- Online payments and e-commerce
- Multiple languages
- Member logins and dashboards
- Integrations with CRM, WhatsApp or billing software

### 4. Content

Writing, photography, video and product uploads are often forgotten in early budgets. Good content is what turns visitors into customers — plan time and money for it.

### 5. SEO setup

Page titles, descriptions, sitemaps, speed optimisation and Google Search Console setup help your site get found. Some quotes include this; others treat it as extra.

## Ongoing costs to plan for

- **Domain name** — renewed every year
- **Hosting** — depends on traffic, speed and features
- **Business email** — addresses like you@yourbusiness.com
- **Maintenance** — updates, backups, security checks and small changes
- **Marketing** — SEO, ads or social media to bring in visitors

> Ask for an itemised quote. If you can't see what you're paying for, you can't compare.

## How to compare quotes

1. Check that each quote covers the **same pages and features**.
2. Ask who writes the content and who supplies photos.
3. Confirm whether hosting, domain and email are included.
4. Ask what happens after launch — support, training and fixes.
5. Look at real websites the agency has built.

## Red flags to watch for

- A very low price with no breakdown
- No mention of mobile design or SEO
- You won't own your domain or website files
- No clear timeline or number of revision rounds

## How to get an accurate quote

Write down the pages you need, the features you want and two or three websites you like. Share your budget range and deadline. With that, a good agency can give you a **fixed, itemised price** instead of a guess.

## Frequently asked questions

### Is a cheap website a bad idea?

Not always — a simple, well-built site can be very effective. Problems start when low prices mean slow hosting, no SEO basics or a site you can't update yourself.

### Do I own my website after it's built?

You should. Make sure your domain is registered in your name and that you'll receive the files and login details.

At Qytrona we send a fixed, itemised quote before any work starts. See our [website development service](/solutions/website-development) or [request your quote](/contact).`,
  },

  "instagram-vs-google-ads-small-business": {
    excerpt:
      "Meta ads and Google ads work in very different ways. Learn which one suits your business, how to structure a small budget and which numbers to track.",
    content: `## Two different kinds of attention

**Google Ads** reach people who are already searching for what you sell — they have a need right now. **Instagram and Facebook ads** (Meta ads) reach people based on their interests, location and behaviour, even if they weren't looking for you today.

Neither is "better". The right choice depends on how your customers decide to buy.

## How they compare

- **Intent:** Google catches existing demand; Meta creates new demand
- **Format:** Google is mostly text and search results; Meta is images, video and stories
- **Best for:** Google suits urgent and high-value services; Meta suits visual products and launches
- **Targeting:** Google targets keywords; Meta targets audiences and interests

## Choose Google Ads when

- People actively search for your service ("AC repair Kochi", "wedding photographer")
- Customers need you urgently and call quickly
- Each new customer is worth a good amount to you
- You serve a specific city or area

## Choose Instagram and Facebook ads when

- Your product looks great in photos or videos
- You're launching something people don't search for yet
- You want to build awareness in a specific area, age group or interest
- You sell lower-priced products people buy on impulse

> The right platform is the one where your customers are when they're ready to buy.

## Using both together

Many businesses get the best results by combining them:

1. **Meta ads** introduce your brand to new people.
2. **Google ads** catch them when they later search for your service.
3. **Retargeting** reminds website visitors who didn't enquire the first time.

## Tips for a small budget

- Start with **one platform and one clear offer**
- Send people to a **focused landing page**, not just your homepage
- Track calls, WhatsApp clicks and form enquiries — not just likes and views
- Test two or three ad versions and keep the winner
- Review results every week and pause what doesn't work

## The numbers that matter

- **Cost per lead** — how much you pay for each enquiry
- **Conversion rate** — how many visitors become leads
- **Lead quality** — how many leads become paying customers
- **Return on ad spend** — revenue earned for every rupee spent

Likes and impressions feel good, but they don't pay the bills. Focus on enquiries and sales.

## Common mistakes

1. Boosting posts without a clear goal
2. Sending ad traffic to a slow or confusing website
3. Targeting "everyone" instead of real customers
4. Stopping campaigns before they have enough data

## Frequently asked questions

### How much should I spend to start?

Start with a budget you're comfortable testing for a month. Enough data to compare ads matters more than a big number on day one.

### How quickly will I see results?

Ads can bring enquiries within days, but the first few weeks are about learning which audiences, keywords and messages work best.

## Want a plan that fits your budget?

We run Google and Meta ad campaigns with clear monthly reports. Explore our [digital marketing services](/solutions/digital-marketing) or [get in touch](/contact).`,
  },

  "must-have-features-online-store": {
    excerpt:
      "Planning an e-commerce website? These seven features turn visitors into paying customers and keep them coming back — plus the extras worth adding as you grow.",
    content: `## Make buying easy

Online shoppers decide fast. If something is confusing, slow or feels untrustworthy, they close the tab and buy elsewhere. The best online stores remove every bit of friction between "I like this" and "order placed".

Here are the seven features every store needs, and why each one matters.

## The 7 essentials

### 1. Fast, mobile-first pages

Most orders are placed on phones, often on slower connections. Optimised images, clean code and good hosting keep product pages loading quickly — and quick pages sell more.

### 2. Clear product photos and details

Shoppers can't touch your products, so photos and details do the selling. Include:

- Several sharp photos from different angles
- Sizes, materials and dimensions
- Price, delivery time and delivery charges up front
- Stock status, so nobody orders something that's sold out

### 3. A simple checkout

Every extra step loses customers. Offer **guest checkout**, ask only for what you need and let browsers autofill addresses. Show the total — including delivery — before the final step.

### 4. Popular payment options

Customers pay in different ways. Support **UPI, cards, net banking and wallets**, and cash on delivery where it makes sense for your business.

### 5. Order tracking and updates

Send confirmations and updates by SMS, email or WhatsApp at each step — order placed, packed, shipped and delivered. Clear updates mean fewer "where is my order?" calls.

### 6. Reviews and ratings

Real feedback from real buyers builds trust faster than any marketing copy. Ask customers to review after delivery and show ratings on product pages.

### 7. Easy returns information

A clear, simple returns policy reduces doubt before purchase. Link to it from product pages and checkout.

> Every extra step in checkout is a chance for a customer to change their mind.

## Nice to have as you grow

- **Discount codes and offers** for launches and festivals
- **Wishlists and recently viewed products**
- **Abandoned cart reminders** by email or WhatsApp
- **Product recommendations** — "you may also like"
- **Integration with stock and billing software** to avoid manual updates

## Don't forget the basics

- An **SSL certificate** so payments and data are secure
- **Clear contact details** and a visible phone or WhatsApp number
- **Search and filters** so shoppers find products quickly
- **SEO-friendly product pages** with unique titles and descriptions

## Common mistakes to avoid

1. Hiding delivery charges until the last step
2. Forcing account creation before checkout
3. Using small or low-quality product photos
4. Having no clear returns or refund policy

## Frequently asked questions

### Should I use a ready-made platform or a custom store?

Ready-made platforms are quick to launch and work well for many stores. Custom builds make sense when you need unique features, integrations or very large catalogues.

### How do I get my first customers?

Combine a fast store with social media, Google Shopping ads and offers for first orders. Reviews from early customers then help bring in more.

## Ready to sell online?

We design and build online stores that are easy to manage and easy to buy from. See our [website development service](/solutions/website-development) or [start your project](/contact).`,
  },

  "website-maintenance-why-it-matters": {
    excerpt:
      "Launching a website is just the beginning. Here's what regular maintenance includes, the warning signs to watch for and how it protects your business, rankings and customers.",
    content: `## A website is never really finished

Like a shop or a vehicle, a website needs regular care. Software ages, security threats change and content goes out of date. Without maintenance, websites slow down, break after updates or become easy targets for hackers — usually at the worst possible moment.

## What website maintenance includes

### Software updates

Websites run on platforms, plugins and code libraries that receive regular updates — many of them security fixes. Keeping them current closes known weaknesses before attackers can use them.

### Security checks

Regular scans look for malware, suspicious logins and weak points. Good maintenance also includes strong passwords, limited admin access and a firewall where needed.

### Backups

Automatic, regular backups — stored somewhere other than your main server — mean that if anything goes wrong, your site can be restored quickly instead of rebuilt from scratch.

### Speed and performance

As you add pages, images and features, sites can slow down. Periodic checks keep images optimised, caching working and pages loading fast.

### Content updates

New offers, prices, photos, team members and opening hours. Accurate information builds trust; outdated information loses customers.

### Uptime monitoring

Monitoring tools alert you the moment your site goes down, so problems are fixed before customers notice.

> The cheapest fix is the one done before customers notice a problem.

## Warning signs your site needs attention

1. Contact forms stop sending enquiries
2. Pages load slowly or look broken on some phones
3. Your browser shows a "Not secure" warning
4. Prices, hours or services are out of date
5. You see strange pages, pop-ups or links you didn't add
6. Your search rankings suddenly drop

## How maintenance protects your business

- **Security:** fewer hacks, data leaks and spam attacks
- **Revenue:** forms, bookings and payments keep working
- **Rankings:** Google favours fast, secure, well-maintained sites
- **Reputation:** customers see an active, trustworthy business

## A simple maintenance schedule

- **Weekly:** check forms and key pages, review backups
- **Monthly:** apply updates, run security scans, check speed
- **Quarterly:** review content, fix broken links, check SEO basics
- **Yearly:** renew domain and SSL, review design and goals

## Frequently asked questions

### Can I maintain my website myself?

You can handle content updates yourself with a simple CMS. Technical updates, security and backups are safer with someone who knows how to test changes before they go live.

### What happens if I skip maintenance?

Often nothing — until something breaks. Then emergency fixes usually cost more than regular care would have.

## Let us look after it

Our support plans cover updates, backups, fixes and small changes every month, so you can focus on running your business. See our [website services](/solutions/website-development) or [ask about support plans](/contact).`,
  },
};

await mongoose.connect(MONGODB_URI);
const posts = mongoose.connection.db.collection("posts");

let updated = 0;
for (const [slug, { content, excerpt }] of Object.entries(articles)) {
  const post = await posts.findOne({ slug }, { projection: { content: 1 } });
  if (!post) {
    console.log(`Not found: ${slug}`);
    continue;
  }
  const words = post.content.trim().split(/\s+/).length;
  if (words >= 400) {
    console.log(`Skipped (already ${words} words — edited or expanded): ${slug}`);
    continue;
  }
  await posts.updateOne({ _id: post._id }, { $set: { content, excerpt, updatedAt: new Date() } });
  console.log(`Expanded: ${slug} (${words} -> ${content.trim().split(/\s+/).length} words)`);
  updated++;
}

console.log(`Done. ${updated} post(s) expanded.`);
await mongoose.disconnect();
