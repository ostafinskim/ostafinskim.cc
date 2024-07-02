---
title: Intro to the Web Components
pubDate: "2022-07-01"
description: "Learn how to create your first vanilla JavaScript web component."
lang: en
image:
  url: /images/photo.jpg
  alt: "Test photo"
tags: ["javascript", "web-components"]
author: "Miro Ostafinski"
---

**If you know HTML and a bit of JavaScript, you already know enough to write your first Web Component.**

Web Components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. Web Components are based on existing web standards and are supported by all modern browsers.

In this article, you will learn how to create your first Web Component using vanilla JavaScript.

## What are Web Components?

Web Components consist of three main technologies:

1. **Custom Elements**: A way to define your own HTML elements.
2. **Shadow DOM**: A way to encapsulate the style and markup of a component.
3. **HTML Templates**: A way to define reusable markup fragments.

## Creating a Web Component

Let's create a simple Web Component that displays a custom greeting message.

1. Create a new file called `greeting.js` and add the following code:

```javascript

// Define a new custom element called 'x-greeting'
class Greeting extends HTMLElement {
  constructor() {
	super();
	// Create a shadow DOM for the custom element
	const shadow = this.attachShadow({ mode: 'open' });
	// Get the 'text' attribute value or use a default message
	const text = this.getAttribute('text') || 'Hello, World!';
	// Create a paragraph element and set its text content
	const p = document.createElement('p');
	p.textContent = text;
	// Append the paragraph element to the shadow DOM
	shadow.appendChild(p);
  }
}
// Register the custom element with the browser
customElements.define('x-greeting', G customElements.define('x-greeting', Greeting);
```

2. Create an HTML file called `index.html` and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Component Example</title>
</head>
<body>
  <x-greeting text="Hello, Web Components!"></x-greeting>
  <script src="greeting.js"></script>
</body>
</html>
```

3. Open the `index.html` file in your browser. You should see the custom greeting message displayed on the page.

In this example, we created a custom element called `x-greeting` that displays a greeting message. The `Greeting` class extends `HTMLElement` and defines the behavior of the custom element. We use the `shadow` DOM to encapsulate the style and markup of the component. The `text` attribute allows us to customize the greeting message.

## Conclusion

Web Components are a powerful way to create reusable and encapsulated components for the web. They are based on existing web standards and are supported by all modern browsers. If you know HTML and a bit of JavaScript, you already know enough to write your first Web Component. Give it a try and see how easy it is to create your own custom elements.
.