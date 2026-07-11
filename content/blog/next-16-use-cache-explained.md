---
title: "Next.js 16 caching, finally explained like a normal person"
pubDate: "2026-07-11"
description: "Cache Components and the 'use cache' directive replace years of confusing caching rules with one simple question: how fresh does this part of the page need to be?"
lang: en
image: /assets/images/gen/blog-3.svg
tags: ["nextjs", "caching", "performance"]
author: "Miro Ostafinski"
---

## Why caching has a bad reputation

Caching means keeping a ready-made copy of something so you don't have to make it again. A bakery doesn't bake your croissant when you order it — it baked a tray this morning. That's caching. It's the single cheapest way to make a website fast.

The reason web developers groan at the word is that for years, Next.js caching was a pile of implicit rules. Things were cached without you asking, in several layers, and the recipe for controlling it was a mix of config options and magic exports. Plenty of experienced developers honestly could not tell you whether a given page was cached or not.

Next.js 16 replaces that pile with one idea called **Cache Components**, and it's built around a question you can actually answer: *how fresh does this part of the page need to be?*

## Every part of a page is one of three things

Switch the feature on in your config (`cacheComponents: true`) and every piece of your page falls into one of three buckets.

**1. Static — never changes.** Your header, footer, page layout. Built once, served instantly to everyone. You don't do anything for this; it's automatic.

**2. Cached — changes occasionally.** A list of blog posts, product details, a stats panel. It comes from a database, but it doesn't change every second — so make it once, serve the copy, refresh now and then.

**3. Dynamic — personal or truly live.** "Hello, Miro", the contents of *your* basket, unread notifications. Different for every visitor, so it must be made fresh per request.

The mental shift: you stop asking "is this page cached?" and start asking it *per section*. One page can — and usually should — contain all three kinds at once.

## Bucket 2: the 'use cache' label

To say "this doesn't need to be made fresh every time", you add one line — `'use cache'` — to a function or component:

```jsx
async function BlogPosts() {
  'use cache';

  const posts = await db.query('SELECT * FROM posts');
  return <PostList posts={posts} />;
}
```

First visitor: the database is queried and the result is stored. Every visitor after that: the stored copy, instantly. No database work at all.

How long should the copy live? You say so in plain words:

```jsx
async function BlogPosts() {
  'use cache';
  cacheLife('hours');   // also: 'minutes', 'days', 'weeks', 'max'

  const posts = await db.query('SELECT * FROM posts');
  return <PostList posts={posts} />;
}
```

`cacheLife('hours')` means "a copy up to a few hours old is fine here". For a blog list, that's obviously true — and you've just eliminated nearly every database query that page used to make.

## Bucket 3: dynamic parts stream in

For the genuinely personal parts, you wrap them in `Suspense` — React's way of saying "send the rest of the page now, this bit follows in a moment":

```jsx
export default function Dashboard() {
  return (
    <>
      <Header />                        {/* static — instant */}
      <Stats />                         {/* cached — instant */}

      <Suspense fallback={<Skeleton />}>
        <MyNotifications />             {/* personal — streams in */}
      </Suspense>
    </>
  );
}
```

The visitor sees the page frame and the stats immediately, with a placeholder where the notifications will be — which then fill in a beat later. The page *feels* instant because almost all of it genuinely was.

This combination — a pre-built shell with dynamic holes that fill in — is what the docs call Partial Prerendering. Fancy name, simple idea: serve everything you already know instantly, and only make the visitor wait for what's truly personal.

## When the data changes: tags

The obvious worry: "if the post list is cached for hours, what happens when I publish a new post? Do readers see stale data until the timer runs out?"

No — you can refresh a cache on demand. You give cached things a name tag:

```jsx
async function BlogPosts() {
  'use cache';
  cacheTag('posts');
  // ...
}
```

…and when something changes, you call the tag:

```jsx
'use server';
import { revalidateTag } from 'next/cache';

export async function publishPost(data) {
  await db.insert(posts).values(data);
  revalidateTag('posts');   // every cache tagged 'posts' gets refreshed
}
```

So the timer (`cacheLife`) is your safety net, and tags are the precise tool: the cache refreshes the moment the data actually changes.

## The rule that keeps you honest

There's one restriction, and it exists to protect you. Inside a `'use cache'` function you can't read things that differ per visitor — cookies, session data, request headers. Next.js will refuse.

Think about why: a cached copy is *shared*. If it were built using visitor A's cookie, visitor B would be served a page made for A. That's not a performance bug, that's showing someone else's data. The restriction turns a subtle privacy disaster into a build error — the good kind of annoying.

The fix is to keep the personal part outside and pass plain values in; anything you pass in automatically becomes part of the cache's identity, so different users get different copies where they should.

## Where to start

If you're on Next.js 16, my suggestion is modest:

1. Turn on `cacheComponents` in your config.
2. Find the one query on your busiest page that runs on every request but returns the same result for everyone — there's always one.
3. Give it `'use cache'`, a `cacheLife`, and a `cacheTag`, and wire the tag into whatever code changes that data.

That single change usually removes the majority of a page's database work. And unlike the old days, six months from now you'll be able to look at the file and know *exactly* what's cached and for how long — because it's written right there, in the one place it matters.
