import { Authors, Pages, allPages } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import PostLayout from '@/layouts/PostSimple'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({
  title: `Disclaimer - ${siteMetadata.headerTitle}`, description: `Disclaimer for ChordsCo.` })

function TermsAndConditions() {
  const author = allPages.find((p) => p.title === 'Disclaimer') as Pages
  const mainContent = coreContent(author)  
  return (
    <PostLayout content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} />
    </PostLayout>
  )
}

export default TermsAndConditions