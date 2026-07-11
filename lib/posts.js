import matter from 'gray-matter'
import hljs from 'highlight.js'
import {Marked} from 'marked'
import {markedHighlight} from 'marked-highlight'
import fs from 'node:fs'
import path from 'node:path'
import {cache} from 'react'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

// Server-side syntax highlighting: highlight.js adds `hljs-*` token classes;
// a highlight.js theme stylesheet (imported in app/layout.js) colours them.
const marked = new Marked(
	markedHighlight({
		emptyLangClass: 'hljs',
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext'
			return hljs.highlight(code, {language}).value
		},
	})
)

const readPostFile = cache((fileName) => {
	const slug = fileName.replace(/\.md$/, '')
	const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf8')
	const {data, content} = matter(raw)
	return {slug, data, content}
})

function formatDate(value) {
	if (!value) return ''
	const d = new Date(value)
	if (Number.isNaN(d.getTime())) return String(value)
	return d.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
}

function toPostMeta(slug, data) {
	return {
		slug,
		title: data.title ?? slug,
		description: data.description ?? '',
		date: formatDate(data.pubDate),
		image: data.image ?? '/assets/images/gen/blog.svg',
		tags: data.tags ?? [],
		author: data.author ?? 'Miro Ostafinski',
	}
}

export const getAllPosts = cache(() => {
	if (!fs.existsSync(BLOG_DIR)) return []
	return fs
		.readdirSync(BLOG_DIR)
		.filter((f) => f.endsWith('.md'))
		.map((f) => {
			const {slug, data} = readPostFile(f)
			return {...toPostMeta(slug, data), rawDate: data.pubDate ?? ''}
		})
		.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate))
})

export function getPostSlugs() {
	return getAllPosts().map((p) => p.slug)
}

export const getPost = cache((slug) => {
	const {data, content} = readPostFile(`${slug}.md`)
	// Code blocks scroll horizontally, so they must be keyboard-focusable
	// (axe: scrollable-region-focusable).
	const contentHtml = marked
		.parse(content)
		.replaceAll('<pre>', '<pre tabindex="0">')
	return {...toPostMeta(slug, data), contentHtml}
})
