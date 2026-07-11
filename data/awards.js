export const awards = [
	{
		id: 1,
		month: 'Feb 2026 – Present',
		title: 'Full-Stack Developer',
		company: 'TaxAssist Group',
		description:
			"Building and maintaining the web applications powering one of the UK's most established tax and accountancy networks. End-to-end work across UI and server-side logic with Next.js and React, data modelling with Drizzle ORM and PostgreSQL, deployed and hosted on Vercel.",
		imgSrc: '/assets/images/demo-bold/awards-1.jpg',
	},
	{
		id: 2,
		month: 'Aug 2022 – Nov 2025',
		title: 'Web Developer',
		company: 'Studio 24',
		description:
			'Delivered responsive, accessible web solutions for high-profile public-sector and cultural clients using vanilla HTML, CSS and JavaScript, Laravel, and WordPress and Directus CMS. Secured a 98% public-sector audit score for the UK Parliament website.',
		clients: [
			{name: 'W3C', url: 'https://www.w3.org'},
			{name: 'UK Parliament', url: 'https://www.parliament.uk'},
			{name: 'HS2', url: 'https://www.hs2.org.uk'},
			{
				name: 'HMICFRS',
				url: 'https://www.justiceinspectorates.gov.uk/hmicfrs/',
			},
			{name: 'Kinship', url: 'https://kinship.org.uk'},
			{
				name: 'The Fitzwilliam Museum',
				url: 'https://www.fitzmuseum.cam.ac.uk',
			},
		],
		imgSrc: '/assets/images/demo-bold/awards-2.jpg',
	},
	{
		id: 3,
		month: 'Jan 2022 – May 2022',
		title: 'Full-Stack Intern',
		company: 'intive',
		description:
			'Built a RESTful API with Node.js, Express.js and TypeScript, and an e-commerce admin dashboard with Next.js, React, Material UI and TypeScript, with JWT auth and Sequelize data models.',
		imgSrc: '/assets/images/demo-bold/awards-3.jpg',
	},
]
