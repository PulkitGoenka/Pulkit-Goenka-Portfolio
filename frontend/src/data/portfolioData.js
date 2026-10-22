// src/data/portfolioData.js

const IMG = "https://static.prod-images.emergentagent.com/jobs/120aacf6-cfec-4786-9cfe-be5507eda96f/images/";

export const PROJECTS_DATA = [
  {
    id: "1",
    slug: "self-checkout",
    title: "Self Checkout",
    category: "Retail Tech",
    description: "A QR-based self-checkout system that lets shoppers scan, pay and walk out — Java Spring Boot backend with a React kiosk UI.",
    image: IMG + "f159c1168395a93c27ea974e6dfbe07abd4a79063622b2c99a6d9146f91a5004.jpeg",
    tags: ["Java", "Spring Boot", "React", "MongoDB"],
    accent: "cyan",
  },
  {
    id: "2",
    slug: "crm",
    title: "CRM Platform",
    category: "SaaS Dashboard",
    description: "Customer relationship management platform with lead pipelines, role-based access and sales analytics for growing teams.",
    image: IMG + "321b37ba727f170a4060d98948f6ad4d072c46a44300ae8700869ca1d6b9d533.jpeg",
    tags: ["Java", "Spring Boot", "MySQL", "React"],
    accent: "pink",
  },
  {
    id: "3",
    slug: "policy-management",
    title: "Policy Management System",
    category: "Enterprise Software",
    description: "End-to-end insurance policy management — policy creation, renewals, claims tracking and reporting with full audit trails.",
    image: IMG + "f34d85fa504643b4635dd943228ba09f09b6c48db00791daf4b1cc12763c190d.jpeg",
    tags: ["Java", "Spring Boot", "PostgreSQL", "React"],
    accent: "purple",
  },
];

export const BLOGS_DATA = [
  {
    id: "1",
    slug: "self-checkout-with-java-spring-boot",
    title: "Building a Self-Checkout System with Java & Spring Boot",
    excerpt: "How I designed the checkout flow, kept the payment path idempotent, and what a kiosk UI taught me about the backend.",
    cover_image: IMG + "4d6c2b391db6ced01a2269eeae61b8d6be29a1647668bc266368a33c3d95fa80.jpeg",
    tags: ["Java", "Spring Boot", "Case Study"],
    read_minutes: 5,
    published_at: "2026-01-14T09:00:00.000000+00:00",
    content: [
      "A self-checkout system sounds simple: scan items, pay, leave. But the moment two people can scan the same QR code, or a payment can succeed twice, you are doing real distributed-systems work. That is what made building mine so much fun.",
      "The core of the backend is a session-based flow built with Spring Boot. Every kiosk session gets a signed token, and every scan appends an immutable line item to that session. The cart is never 'edited' — it is only ever appended to, which makes debugging production issues dramatically easier.",
      "The trickiest part was the payment path. Networks fail, and the worst failure mode is charging someone twice. I made every payment request idempotent by requiring a client-generated idempotency key; a retry with the same key returns the original result instead of creating a second charge.",
      "The kiosk front end is a React app tuned for one hand and zero patience. Buttons are huge, states are obvious, and every screen has exactly one next action. If the API is slow, the UI says so instead of freezing.",
      "If I rebuilt it tomorrow, I would move the receipt generation out of the request path entirely. It works fine today, but publishing an event and letting a worker handle receipts would keep payment latency flat even when the printer service has a bad day.",
    ],
  },
  {
    id: "2",
    slug: "lessons-from-my-first-crm",
    title: "What I Learned Writing My First CRM from Scratch",
    excerpt: "Pipelines, permissions and pagination — the three things that quietly decide whether a CRM is usable or a nightmare.",
    cover_image: IMG + "19e23be13f0f8a425cdafe79e6b1a6f23c27f7059475c233c9d880bdcb759cad.jpeg",
    tags: ["Backend", "Databases", "Case Study"],
    read_minutes: 6,
    published_at: "2026-01-02T09:00:00.000000+00:00",
    content: [
      "My first CRM started as a side project and ended up teaching me more about data modeling than any tutorial ever did. A CRM is basically a giant, opinionated to-do list about human beings — and human beings are messy.",
      "The first lesson was pipelines. I initially hard-coded stages like 'New', 'Contacted', 'Won'. Every sales team that touched it wanted different names. The fix was to make stages data: a pipeline owns an ordered list of stages, and deals just point at one. One afternoon of modeling saved months of special cases.",
      "The second lesson was permissions. Role-based access sounds like an add-on, but if you don't design it into the schema early, every query afterwards becomes 'and also, can this user see this row?'. I ended up with a simple rule set enforced in the service layer, and it has held up well.",
      "The third lesson was pagination. Importing a real customer dataset made the naive 'load everything' list view fall over instantly. Keyset pagination on the cursor of last updated time fixed it, and the UI now feels instant even on tens of thousands of rows.",
      "The biggest surprise was how much of the work was not code: defining what counts as a duplicate contact, deciding who owns a deal when two users edit it. Software for people is mostly about agreeing on rules, then encoding them.",
    ],
  },
  {
    id: "3",
    slug: "small-habits-better-rest-apis",
    title: "Small Habits That Make My REST APIs Better",
    excerpt: "Consistent error shapes, versioned URLs, and honest status codes — tiny habits that pay off the moment a second client arrives.",
    cover_image: IMG + "0247eddba99dedea5a934ceeb68fef71da06447b38eb3b0fcc4f68c496b260ed.jpeg",
    tags: ["APIs", "Best Practices"],
    read_minutes: 4,
    published_at: "2025-12-18T09:00:00.000000+00:00",
    content: [
      "You do not need a big architecture review to write better APIs. A handful of small habits, applied every single time, get you most of the way there.",
      "Habit one: return errors in one consistent shape. Every error response has a code, a human-readable message and optional details. Frontend teams stop asking 'what does this endpoint return on failure?' because the answer is always the same.",
      "Habit two: version the URL from day one. /api/v1/... costs nothing today and saves a painful migration the day you need to change a response shape. Renaming a field without a version is a bet you will eventually lose.",
      "Habit three: use honest status codes. A 200 with an error body is a lie that breaks caching, monitoring and client logic all at once. 201 for created, 204 for deleted, 409 for conflicts — the verbs are free.",
      "Habit four: write the docs comment before the endpoint, not after. When the shape is written down first, implementation becomes mechanical, and drift between docs and behavior never gets a chance to start.",
    ],
  },
];