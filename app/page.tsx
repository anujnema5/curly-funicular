import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allChords } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allChords)
  const posts = allCoreContent(sortedPosts)
  
  return <Main posts={posts} />
}
