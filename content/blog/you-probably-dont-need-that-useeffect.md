---
title: "You probably don't need that useEffect"
pubDate: "2026-05-06"
description: "The most misused tool in React, explained with everyday examples — and the simpler patterns that replace it in most cases."
lang: en
image: /assets/images/gen/blog-7.svg
tags: ["react", "hooks"]
author: "Miro Ostafinski"
---

## The hook everyone reaches for first

If you've written React, you've written `useEffect`. It's the hook for "do something after the component renders" — and because that description is so vague, it becomes the hammer for every nail: calculating things, responding to changes, resetting forms, fetching data.

Here's the uncomfortable truth: **most `useEffect` calls in real codebases shouldn't exist.** They make components slower (extra re-renders), harder to follow (logic runs "later", detached from what caused it), and buggier (the infamous stale data and infinite loop problems).

The React team says this themselves — the official docs have a whole page titled *"You Might Not Need an Effect"*. This post is my field guide to the most common offenders, in plain terms.

## Offender 1: calculating one thing from another

The classic. You have a first name and a last name, and you want a full name:

```jsx
// ❌ the roundabout way
const [firstName, setFirstName] = useState('Ada');
const [lastName, setLastName] = useState('Lovelace');
const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(firstName + ' ' + lastName);
}, [firstName, lastName]);
```

Read that back slowly: render the component, *then* notice the names, *then* update the full name, *then* render again. Two renders to do one calculation.

If a value can be worked out from things you already have, just work it out:

```jsx
// ✅ the direct way
const [firstName, setFirstName] = useState('Ada');
const [lastName, setLastName] = useState('Lovelace');

const fullName = firstName + ' ' + lastName;
```

No effect, no extra state, no second render. This applies to filtering lists, totalling a basket, checking whether a form is valid — anything that's *derived* from existing data. Derived values are just variables, not state.

## Offender 2: reacting to a click… indirectly

Say that after the user submits a form you want to show a notification. A common instinct:

```jsx
// ❌ set a flag, react to the flag
const [submitted, setSubmitted] = useState(false);

useEffect(() => {
  if (submitted) {
    showNotification('Saved!');
  }
}, [submitted]);

// somewhere below:
<button onClick={() => setSubmitted(true)}>Save</button>
```

The user clicked a button, and you want something to happen. So put it in the click handler:

```jsx
// ✅ respond where the event happens
<button onClick={() => {
  saveForm();
  showNotification('Saved!');
}}>Save</button>
```

The rule of thumb: if you can name the *user action* that should trigger the code ("when they click save", "when they pick a country"), the code belongs in that event's handler. Effects are for things that should happen because the component *appeared or changed on screen* — not because the user did something.

## Offender 3: resetting state when a prop changes

You have a comments panel that shows comments for a profile. When the visitor switches to a different profile, you want the draft comment box cleared:

```jsx
// ❌ watch the prop, reset by hand
useEffect(() => {
  setDraft('');
}, [profileId]);
```

React has a built-in way to say "this is a *different* thing now, start fresh" — the `key` prop:

```jsx
// ✅ a new key means a brand new component, with fresh state
<CommentsPanel key={profileId} profileId={profileId} />
```

When `profileId` changes, React throws away the old panel and builds a new one. Every piece of state inside resets automatically — the draft, the scroll position, everything. One line, no effect, and you can't forget to reset a field you added later.

## Offender 4: fetching data

This one deserves nuance. Fetching in `useEffect` *works*, and every React developer has written it:

```jsx
useEffect(() => {
  fetch(`/api/products/${id}`)
    .then(res => res.json())
    .then(setProduct);
}, [id]);
```

The problems are invisible at first: if the user clicks quickly between products, responses can come back out of order and show the wrong data; nothing is cached, so going "back" refetches everything; and the fetch can't even start until the component has rendered once, making everything feel slower.

If you're using a framework like Next.js, the modern answer is to fetch on the server, before the page is sent — no effect at all:

```jsx
// a server component — data arrives with the page
export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  return <ProductDetails product={product} />;
}
```

If you genuinely need to fetch from the browser (say, data that updates while the user watches), use a library built for it, like React Query or SWR. They handle the out-of-order responses, caching and loading states that the hand-written effect silently gets wrong.

## So what is useEffect actually for?

Synchronising your component with something *outside React*. That's the whole list. Real examples:

- Connecting to a chat server when the component appears, and disconnecting when it leaves.
- Subscribing to browser events like "the window was resized".
- Controlling a non-React widget, like a map library, embedded in your page.

Notice the pattern: in each case there's an external system with its own lifecycle, and the effect keeps React and that system in step. If there's no external system in sight — you're only shuffling React's own state around — you almost certainly don't need the effect.

## The quick test

Before writing `useEffect`, ask two questions:

1. **Can this be calculated from what I already have?** Then it's a plain variable. (Offender 1)
2. **Is this caused by a specific user action?** Then it goes in the event handler. (Offender 2)

If it's neither — if the honest description is "keep my component in sync with something outside React" — then and only then reach for the effect. Your components will be shorter, faster, and much easier to debug.
