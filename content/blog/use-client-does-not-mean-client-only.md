---
title: '"use client" does not mean what you think it means'
pubDate: "2026-03-14"
description: "A plain-English explanation of React Server Components — where your components actually run, and why the naming confuses everyone."
lang: en
image: /assets/images/gen/blog-6.svg
tags: ["react", "nextjs", "server-components"]
author: "Miro Ostafinski"
---

## A confusing name

Modern React apps built with Next.js have two kinds of components: server components and client components. You turn a component into a client component by writing `'use client'` at the top of the file.

Here's the part that trips people up: **a client component still runs on the server too.**

That sounds like a contradiction, so let me unpack it. When someone visits your page, the server prepares the HTML for the *whole* page — including your client components — and sends it to the browser. That's why the page appears quickly instead of showing a blank screen. The `'use client'` label doesn't change that.

What it actually changes is this: the JavaScript code of a client component is *also* sent to the browser, so the component can come alive there — react to clicks, remember things, update itself. A server component's code never leaves the server. The browser only ever receives its finished result.

A better name for "client component" would have been "interactive component". Keep that translation in your head and the whole system becomes much easier to reason about:

- **Server component** — runs once, on the server. It can read from a database and produce content, but it can't respond to clicks or hold any state. It's like a printed page.
- **Client component** — also rendered on the server first (so the visitor sees something immediately), but its code travels to the browser so it can respond to the user. It's like a page with buttons that work.

## Why bother with two kinds?

Because JavaScript sent to the browser has a price. Every interactive component makes your site heavier: more to download, more for the visitor's phone to process before the page feels responsive.

A typical page is mostly *not* interactive. A blog post is text. A product page is mostly images, a description, a price. Only small parts — a menu, a "add to basket" button, an image carousel — actually need to react to the user.

Server components let you say: "this part is just content, don't ship any code for it." The visitor gets a lighter, faster page, and the interactive bits still work exactly as before.

## Where to draw the line

My rule of thumb: **start with everything as a server component, and only add `'use client'` where something needs to respond to the user.**

Take a product page. The layout, the product name, the formatted price, the description — none of that needs to react to clicks, so it stays on the server. The image carousel and the "add to basket" button do, so those two become small client components.

The common mistake is the opposite: someone needs one button to work, so they put `'use client'` at the top of the entire page. Now the whole page — text, images, everything — ships its code to the browser for the sake of one button. It works, but you've thrown away the main benefit.

One more thing worth knowing: `'use client'` is contagious. Any component that an interactive component imports becomes interactive code too, automatically. So you only write the label at the *entry point* — the outermost component that needs interactivity — not on every file below it.

## The one real limitation

There's a rule at the border between the two worlds. When a server component passes data to a client component, that data has to survive being sent over the network — text, numbers, dates, lists, plain objects. All fine.

What can't cross the border is a **function**. This fails:

```jsx
// A server component
export default async function Post({ params }) {
  const post = await getPost(params.slug);
  return (
    <article>
      <h1>{post.title}</h1>
      {/* ❌ passing a function to a client component */}
      <LikeButton onLike={() => console.log('liked!')} />
    </article>
  );
}
```

The fix is usually simple: move the click-handling logic *inside* the client component, and pass only plain data (like the post's ID) across the border.

```jsx
// LikeButton.jsx
'use client';

export default function LikeButton({ postId }) {
  return <button onClick={() => sendLike(postId)}>Like</button>;
}
```

## A trick worth knowing: content inside interactive shells

Here's a situation that seems impossible at first. You have an interactive wrapper — say, a collapsible section the user can open and close — and inside it, heavy content that you'd rather keep on the server.

You can't *import* a server component into a client component. But you can *pass one in*, the same way you'd pass any children:

```jsx
// A server component
export default function Page() {
  return (
    <Collapsible>          {/* interactive: knows if it's open */}
      <ArticleContent />   {/* server: heavy content, no code shipped */}
    </Collapsible>
  );
}
```

The collapsible shell is interactive; what's inside it is not. The content is prepared on the server and simply slotted in. This pattern solves most "but my whole page needs to be a client component!" moments — usually only the shell does.

## One last trap: 'use server'

You might guess that `'use server'` is how you mark server components. It isn't — components are server components *by default*, no label needed.

`'use server'` does something entirely different: it marks functions that the browser is allowed to call on the server, like "save this form". Putting it at the top of a component file doesn't make the component "more server-y" — it exposes every function in that file to the internet. Not what you wanted.

## The takeaway

Don't read `'use client'` as "this runs in the browser instead". Read it as "this needs to be interactive, so its code gets shipped to the browser as well". Keep the interactive parts small and let everything else stay as lightweight, server-prepared content. Your visitors' phones will thank you.
