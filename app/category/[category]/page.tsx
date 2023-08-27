import { slug } from 'github-slugger'
import { allCoreContent } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allChords } from 'contentlayer/generated'
import categoryData from 'app/category-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = decodeURI(params.category)
  return genPageMetadata({
    title: `Archieved ${category.split("-").join(" ")}`,
    description: `${siteMetadata.title} ${category} categoryged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/category/${category}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const categoryCounts = categoryData as Record<string, number>
  const categoryKeys = Object.keys(categoryCounts)
  const paths = categoryKeys.map((category) => ({
    category: category,
  }))
  return paths
}

export default function categoryPage({ params }: { params: { category: string } }) {
  const category = decodeURI(params.category)
  // Capitalize first letter and convert space to dash
  const title = category[0].toUpperCase() + category.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    allChords.filter((post) => post.category && post.category.map((t) => slug(t)).includes(category))
    )
  return <ListLayout posts={filteredPosts} title={title} />
}
