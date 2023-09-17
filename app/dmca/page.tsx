import { Authors, Pages, allPages } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import PostLayout from '@/layouts/PostSimple'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({
  title: `DMCA - ${siteMetadata.headerTitle}`, description: `DMCA policy · What to consider before submitting a copyright complaint · Notifications of infringement · Changes and amendments · Reporting copyright infringement.` })

function TermsAndConditions() {
  const author = allPages.find((p) => p.title === 'DMCA') as Pages
  const mainContent = coreContent(author)  
  return (
    <PostLayout content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} />
    </PostLayout>
  )
}

export default TermsAndConditions