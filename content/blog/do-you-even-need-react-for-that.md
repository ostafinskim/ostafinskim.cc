---
title: "Do you even need React for that?"
pubDate: "2026-02-10"
description: "React is the default choice for everything web — but for a lot of everyday widgets, the browser's built-in Web Components are simpler, lighter and future-proof. A follow-up to my intro to Web Components."
lang: en
image: /assets/images/gen/blog-1.svg
tags: ["javascript", "web-components", "react"]
author: "Miro Ostafinski"
---

## The reflex

A while back I wrote an [intro to Web Components](/blog/intro-to-web-components) — the browser's own, built-in way to create reusable custom HTML tags, no framework required. The natural follow-up question is the one I get most often: *"Nice, but I have React. Why would I ever use this?"*

Fair question. React is the default reflex of the industry: need a date picker? React. A cookie banner? React. A "copy code" button on a blog? Somehow, also React. The reflex is understandable — React is excellent — but it comes with a cost that's easy to stop noticing: a build step, a bundle of JavaScript shipped to every visitor, and a dependency treadmill of updates to keep up with.

So here's my honest, working answer to when each one earns its place.

## What each one actually is

**React** is a system for keeping a complicated interface in sync with changing data. When ten things on screen depend on the same piece of state and each other, React's job is to make sure everything updates correctly when anything changes. That's the hard problem it solves.

**Web Components** are much humbler: a way to teach the browser a new HTML tag. You write a class, register it under a name like `<video-player>` or `<copy-button>`, and from then on that tag works in any HTML page — with its own markup, styling and behaviour bundled inside. No build step, no library to download, because the "framework" is the browser itself.

The humbleness is the point. A Web Component doesn't want to run your whole application. It wants to be one self-contained widget that works anywhere.

## Where Web Components quietly win

**Widgets that outlive frameworks.** A share button, an image gallery, an embedded audio player. Written as a Web Component, that widget works in a React app, a WordPress site, a plain HTML page, and whatever framework is fashionable in five years — because it's built on the HTML standard, and the web platform has a near-religious commitment to not breaking old code. React components from 2016 often need work to run today; a custom element from 2016 still just works.

**Sites that are mostly content.** Blogs, documentation, marketing pages, portfolios. If your page is 95% text and images with a sprinkle of interactivity — a theme toggle, a mobile menu, a code-copy button — pulling in a framework means shipping a large engine to power three small widgets. Three Web Components weigh a few kilobytes and need no build pipeline at all.

**One widget, many teams.** Big organisations use them for exactly this: the design system team builds `<company-datepicker>` once, and every team can use it — whether their app is React, Angular, Vue or twenty-year-old server-rendered HTML. No framework debate required.

**Enhancing HTML you don't control.** CMS output, markdown-rendered content, emails from another system. You can't easily mount a React app inside content someone else generates — but a custom tag placed in that content just works, because the browser upgrades it wherever it appears.

## Where React clearly wins

**Applications, not pages.** Dashboards, editors, booking flows, anything where lots of on-screen state interacts. This is the problem React was built for, and Web Components offer little help with it — they give you encapsulation, not state management. Building a complex app from raw Web Components means reinventing exactly the machinery React already provides.

**When you want the ecosystem.** Component libraries, form handling, routing, testing tools, and — importantly — thousands of developers who can join your project and be productive on day one. The ecosystem is arguably React's biggest feature, and Web Components have nothing comparable.

**Server-side rendering.** Frameworks like Next.js prepare the page's HTML on the server so visitors see content immediately. Web Components are fundamentally browser creatures — there are ways to pre-render them (look up "declarative shadow DOM"), but it's still the rough edge of the standard, while React's story here is mature and central.

## The plot twist: it's not either/or

The framing of "Web Components *versus* React" is mostly wrong anyway. They nest happily inside each other, and React's support for custom elements has been solid for a while now — you can just use them:

```jsx
function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <ReactMarkdown>{post.body}</ReactMarkdown>
      <share-buttons url={post.url}></share-buttons>  {/* a Web Component */}
    </article>
  );
}
```

The app is React; the share widget is a self-contained custom element that would work equally well anywhere else. Each tool doing the job it's good at, in the same file.

## My rule of thumb

When something needs building, I ask one question: **is this a widget, or is this an application?**

- A *widget* — self-contained, drop-in, useful beyond this one project — leans Web Component. It'll be lighter, dependency-free, and still working long after today's framework versions are museum pieces.
- An *application* — interconnected state, many screens, a team working on it — leans React (or, realistically, Next.js). That's the scale where a framework pays for itself many times over.

The trap to avoid is only ever asking "how do I do this in React?" The browser has grown enormously capable while we weren't looking. Sometimes the best framework for the job is the one already installed on every device on Earth.
