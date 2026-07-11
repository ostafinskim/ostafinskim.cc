---
title: "Server Actions feel private. They aren't."
pubDate: "2026-06-02"
description: "Next.js Server Actions look like ordinary functions, but every one of them is reachable from the internet. Here's the mindset shift, and a checklist to keep them safe."
lang: en
image: /assets/images/gen/blog-5.svg
tags: ["nextjs", "security", "server-actions"]
author: "Miro Ostafinski"
---

## The magic trick

Server Actions are one of the nicest things in modern Next.js. You write a function, mark it with `'use server'`, and call it straight from a button or a form — no API route, no fetch call, no JSON wrangling:

```jsx
'use server';

export async function deletePost(postId) {
  await db.delete(posts).where(eq(posts.id, postId));
}
```

```jsx
// in a component
<button onClick={() => deletePost(post.id)}>Delete</button>
```

It reads like calling a local function. And that's exactly the danger: **it reads like calling a local function.**

## What's actually happening

There's no such thing as the browser directly running your server code. Under the bonnet, Next.js turns every Server Action into an HTTP endpoint — a URL on your site that accepts POST requests. When the button is clicked, the browser sends a request to that endpoint with the arguments, the server runs the function, and sends the result back.

Which leads to the sentence I want you to remember:

> **Every Server Action is a public endpoint. Anyone on the internet can call it, with any arguments they like.**

Not just your UI. Not just users who can see the button. Anyone with a terminal and five minutes can send a request to that endpoint with a `postId` of their choosing. The fact that *your* interface only calls `deletePost` for posts the user owns is a fact about your interface — not about who can call the function.

## The mistakes this leads to

**Mistake 1: "the button is hidden, so we're fine."** You check permissions in the UI — the delete button only appears for admins — but the action itself checks nothing. An attacker doesn't use your buttons. They call the endpoint directly. UI checks are for user experience; they are not security.

**Mistake 2: trusting the arguments.** This one is sneakier:

```jsx
'use server';

// ❌ trusts whatever userId the request claims
export async function updateProfile(userId, data) {
  await db.update(users).set(data).where(eq(users.id, userId));
}
```

Your component dutifully passes the logged-in user's ID. An attacker passes *someone else's*. Anything that arrives as an argument — including values from hidden form fields — is chosen by the sender, and the sender might not be your app. Identity must come from the session on the server, never from the arguments:

```jsx
'use server';

// ✅ asks the session who's calling
export async function updateProfile(data) {
  const session = await auth();
  if (!session) throw new Error('Not signed in');

  await db.update(users).set(data).where(eq(users.id, session.user.id));
}
```

**Mistake 3: skipping validation.** Types in your editor are a compile-time fiction; at runtime, the endpoint receives whatever it receives. A `postId` parameter typed as `string` can arrive as an object, an empty string, or a ten-megabyte payload. Validate the shape of the input before touching it — a library like Zod makes this a few lines.

## The checklist

Every Server Action that changes something should do three things, in order, before its real work:

```jsx
'use server';

export async function deletePost(input) {
  // 1. Who is calling? (authentication)
  const session = await auth();
  if (!session) throw new Error('Not signed in');

  // 2. Is the input what we expect? (validation)
  const { postId } = deletePostSchema.parse(input);

  // 3. Is THIS user allowed to do THIS? (authorisation)
  const post = await getPost(postId);
  if (post.authorId !== session.user.id) throw new Error('Not allowed');

  // ...only now, the actual work
  await db.delete(posts).where(eq(posts.id, postId));
}
```

Who are you? Is this input sane? Are you allowed? It's the same discipline any API route needs — Server Actions didn't remove the need, they just made it easier to forget, because the code doesn't *look* like an endpoint.

If you have more than a handful of actions, writing these three steps by hand every time gets old and error-prone. Libraries like `next-safe-action` let you define the checks once — "every action in this group requires a signed-in user and a valid input" — and reuse them everywhere. Strongly recommended once your app grows.

## A note on 'use server' at the top of a file

One last footgun. Putting `'use server'` on the first line of a file exports **every function in that file** as its own public endpoint — including little helpers you never meant to expose:

```jsx
'use server'; // ⚠️ everything below becomes an endpoint

export async function submitOrder(input) { /* checked, safe */ }

// oops — also publicly callable now
export async function chargeCard(customerId, amount) { /* ... */ }
```

Prefer marking individual functions, and keep helpers unexported or in a separate file. The less that's reachable from outside, the less you have to defend.

## The takeaway

Server Actions are worth using — they remove real boilerplate and the code genuinely is nicer. Just don't let the ergonomics fool you about the architecture. The function you're writing has a URL. Treat it with the same suspicion you'd give any door that opens onto the internet: check who's knocking, check what they're carrying, and check they're allowed in.
