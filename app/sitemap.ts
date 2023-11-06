import { MetadataRoute } from 'next'
import { allChords, allPages } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const site = [{
    url: siteMetadata.siteUrl,
    lastModified: new Date().toISOString().split('T')[0],
    priority : 0.9
  }]
  const chordsRoutes = allChords.map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.lastmod || post.date,
    priority : 0.9
  }))

  const pagesRoutes = allPages.map((page) => ({
    url: `${siteUrl}/${page.path.replace('pages/', '')}`,
    lastModified: page.date,
    priority : 0.8
  }))

  const routes = ['about', 'authors', 'category', 'chords', 'contact-us'].map((route) => ({
    url: `${siteUrl}/${`${route}`}`,
    lastModified: new Date().toISOString().split('T')[0],
    priority : 0.8
  }))


  return [...site,  ...pagesRoutes,...routes, ...chordsRoutes]
}
