// Cover + gallery images are real screenshots of the live sites, captured by
// `node scripts/capture-shots.mjs` into /assets/images/work.
const shots = (name) => [
	`/assets/images/work/${name}-1.webp`,
	`/assets/images/work/${name}-2.webp`,
	`/assets/images/work/${name}-3.webp`,
]

export const portfolios2 = [
	{
		slug: 'uk-parliament-website',
		imageUrl: '/assets/images/work/parliament-cover.webp',
		title: 'UK Parliament',
		description:
			'Front-end work across the UK Parliament estate, including UK Parliament Week and the Parliament education service. Theme templates and ACF-driven content blocks with WCAG-compliant markup, serving schools, community groups and the wider public at national scale.',
		categories: ['development'],
		role: 'Front-End Developer',
		stack: 'WordPress, ACF, PHP, JavaScript, SCSS, WCAG 2.1 AA',
		links: [
			{ label: 'UK Parliament Week', url: 'https://www.ukparliamentweek.org/en/' },
			{ label: 'Parliament education service', url: 'https://learning.parliament.uk/en/' },
		],
		photos: shots('parliament'),
	},
	{
		slug: 'fitzwilliam-museum',
		imageUrl: '/assets/images/work/fitzwilliam-cover.webp',
		title: 'The Fitzwilliam Museum',
		description:
			'Templates, layouts and interactive components for a high-traffic museum website — visit planning, exhibition listings and the online collection.',
		categories: ['development'],
		role: 'Front-End Developer',
		stack: 'Craft CMS, Twig, JavaScript, SCSS',
		links: [{ label: 'fitzmuseum.cam.ac.uk', url: 'https://fitzmuseum.cam.ac.uk/' }],
		photos: shots('fitzwilliam'),
	},
	{
		slug: 'kinship',
		imageUrl: '/assets/images/work/kinship-cover.webp',
		title: 'Kinship',
		description:
			'Front-end build for the leading UK kinship care charity: advice and information journeys, workshop and event listings, campaign pages for #ValueOurLove and donation entry points, assembled from ACF content blocks the team edits themselves. Built for carers under pressure, so clarity and accessibility came first.',
		categories: ['development'],
		role: 'Front-End Developer',
		stack: 'WordPress, ACF, PHP, JavaScript, SCSS',
		links: [{ label: 'kinship.org.uk', url: 'https://kinship.org.uk/' }],
		photos: shots('kinship'),
	},
	{
		slug: 'hs2',
		imageUrl: '/assets/images/work/hs2-cover.webp',
		title: 'HS2',
		description:
			"Front-end for the corporate site of Britain's high-speed rail programme, plus The Core — the Safe at Heart resources hub for HS2 staff and supply chain. Templates and ACF blocks covering construction updates, community and supplier information, and a members-only library of health and safety best practice.",
		categories: ['development'],
		role: 'Front-End Developer',
		stack: 'WordPress, ACF, PHP, JavaScript, SCSS',
		links: [
			{ label: 'hs2.org.uk', url: 'https://www.hs2.org.uk/' },
			{ label: 'The Core (Safe at Heart)', url: 'https://safety.hs2.org.uk/' },
		],
		photos: shots('hs2'),
	},
	{
		slug: 'syrris',
		imageUrl: '/assets/images/work/syrris-cover.webp',
		title: 'Syrris',
		description:
			'Front-end for a scientific instrument manufacturer — flow and batch chemistry reactor systems across product, application and support sections, built as ACF blocks and translated through WPML.',
		categories: ['development'],
		role: 'Front-End Developer',
		stack: 'WordPress, ACF, WPML, PHP, JavaScript, SCSS',
		links: [{ label: 'syrris.com', url: 'https://www.syrris.com/' }],
		photos: shots('syrris'),
	},
	{
		slug: 'barcham-trees',
		imageUrl: '/assets/images/work/barcham-cover.webp',
		title: 'Barcham Trees',
		description:
			"Store front-end for a specialist container-grown tree nursery: a faceted catalogue of 450+ trees filtered by type, shape and height, size-based pricing with bulk discount tiers, product galleries with growing data, an accessories range and the basket and checkout flow.",
		categories: ['development'],
		role: 'Front-End Developer',
		stack: 'WordPress, ACF, PHP, JavaScript, SCSS',
		links: [{ label: 'barcham.co.uk', url: 'https://www.barcham.co.uk/' }],
		photos: shots('barcham'),
	},
]
