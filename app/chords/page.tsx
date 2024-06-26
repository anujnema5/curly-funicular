import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allChords } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Archieved Chords', description: `Archieved - posts of ChordsCo` })

export default function chordsPage() {
  const posts = allCoreContent(sortPosts(allChords))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
