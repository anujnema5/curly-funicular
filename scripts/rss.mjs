import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import GithubSlugger from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import categoryData from '../app/category-data.json' assert { type: 'json' }
import { allChords } from '../.contentlayer/generated/index.mjs'

const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/chords/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/chords/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post?.category && post?.category?.map((t) => `<category>${t}</category>`).join('')}
  </item>
`

const generateRss = (config, posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/chords</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
`

async function generateRSS(config, allChords, page = 'feed.xml') {
  const publishPosts = allChords.filter((post) => post.draft !== true)
  // RSS for chords post
  if (publishPosts.length > 0) {
    const rss = generateRss(config, publishPosts)
    writeFileSync(`./public/${page}`, rss)
  }

  if (publishPosts.length > 0) {
    for (const category of Object.keys(categoryData)) {
      const filteredPosts = allChords.filter((post) =>
        post.category.map((t) => GithubSlugger.slug(t)).includes(category)
      )
      const rss = generateRss(config, filteredPosts, `category/${category}/${page}`)
      const rssPath = path.join('public', 'categories', category)
      mkdirSync(rssPath, { recursive: true })
      writeFileSync(path.join(rssPath, page), rss)
    }
  }
}

const rss = () => {
  generateRSS(siteMetadata, allChords)
  console.log('RSS feed generated...')
}
export default rss
