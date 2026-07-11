---
title: "Node.js grew up — you might not need all those packages"
pubDate: "2026-04-09"
description: "Node.js now does out of the box what used to require half a dozen npm packages: fetching data, running tests, reloading on changes, reading .env files, even TypeScript."
lang: en
image: /assets/images/gen/blog-4.svg
tags: ["nodejs", "javascript"]
author: "Miro Ostafinski"
---

## The old ritual

For years, starting a Node.js project began with the same shopping list. You'd install `axios` to make web requests, `jest` to run tests, `nodemon` to restart the app when you saved a file, `dotenv` to read configuration, and `ts-node` if you wanted TypeScript. None of it was your app yet — it was just the plumbing everybody needed.

Quietly, over the last few releases, Node.js absorbed almost all of it. If you learned Node a few years ago and haven't checked what's built in lately, this post is your catch-up. Everything below works in Node 22 and newer with no packages installed.

## Making web requests: fetch is just there

The `fetch` function — the same one browsers have — is built into Node now. No import, no install:

```javascript
const response = await fetch('https://api.github.com/users/octocat');
const user = await response.json();
console.log(user.name);
```

That covers the vast majority of what people installed `axios` or `node-fetch` for. If you're writing a new project and your first instinct is `npm install axios` — pause. Plain `fetch` probably does the job.

## Running tests: a test runner ships in the box

Node has a built-in test runner. You import it from `node:test`, write tests in a familiar style, and run them with `node --test`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert';

test('adds two numbers', () => {
  assert.strictEqual(2 + 2, 4);
});
```

```bash
node --test
```

It finds your test files, runs them, and prints a readable report. It handles the essentials — grouping tests, skipping, mocking, even code coverage with `--experimental-test-coverage`. For a library or a small service, it's genuinely enough. Jest and Vitest still earn their place in bigger projects (better watch mode, richer ecosystem), but "I need to install a test framework before I can write a single test" is no longer true.

## Restarting on file changes: --watch

`nodemon` had one job: restart your app when you save a file. Node does that itself now:

```bash
node --watch server.js
```

Save a file, the process restarts. That's it. One less tool to configure.

## Reading .env files: --env-file

Almost every project keeps secrets and settings in a `.env` file, and almost every project installed `dotenv` to read it. Now:

```bash
node --env-file=.env server.js
```

Your `process.env` values are populated, exactly as with dotenv. There's also `--env-file-if-exists` for when the file is optional — handy so the same command works both locally and in production, where settings usually come from the hosting platform instead of a file.

## TypeScript: Node runs it directly

This is the big one. Modern Node can run TypeScript files without any compilation step:

```bash
node app.ts
```

The honest fine print: Node doesn't *check* your types — it strips them out and runs the JavaScript underneath. Type checking is still your editor's job (or `tsc --noEmit` in CI). And a few TypeScript features that generate extra code, like `enum`, need a flag. But for the everyday case — you write TypeScript, you want to run the file — it just works. The `ts-node` era is over.

## The sleeper hit: a built-in database

Node now includes SQLite, a small file-based database, in the standard library:

```javascript
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('app.db');
db.exec('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, text TEXT)');

db.prepare('INSERT INTO notes (text) VALUES (?)').run('hello');
const notes = db.prepare('SELECT * FROM notes').all();
```

For scripts, prototypes and small tools, this removes the "but I'd have to set up a database" excuse entirely. Your data lives in a single file next to your code.

## What this changes in practice

Fewer packages isn't just tidiness. Every dependency is code you didn't write but are responsible for — it can break on update, conflict with another package, or be abandoned. The built-in versions are maintained with Node itself and follow web standards where they exist (like `fetch`), so what you learn transfers to the browser too.

My rule for new projects now: **start with zero dependencies and add packages only when you hit a real limit.** You'll hit limits — a complex app still wants a proper framework, a big test suite still wants Vitest. But you'll be surprised how far the standard library takes you, and how pleasant `package.json` looks with three entries instead of thirty.
