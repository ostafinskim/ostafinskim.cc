// One-page (home) scrollspy menu.
export const boldOnepage = [
	{href: '#home', text: 'Home', className: 'active'},
	{href: '#about', text: 'About'},
	{href: '#experience', text: 'Experience'},
	{href: '#services', text: 'Skills'},
	{href: '#portfolio', text: 'Work'},
	{href: '#blog', text: 'Blog'},
	{href: '#contact', text: 'Contact'},
]

// Multi-page routes (about, blog) share this nav; the active item is derived
// from the pathname in the nav component.
export const siteMenu = [
	{href: '/', text: 'Home'},
	{href: '/about', text: 'About'},
	{href: '/blog', text: 'Blog'},
]

// Work detail pages link back to the portfolio section on the home page.
export const workMenu = [
	{href: '/', text: 'Home'},
	{href: '/#portfolio', text: 'Work'},
	{href: '/blog', text: 'Blog'},
]
