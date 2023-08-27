import { Authors, Pages, allAuthors, allPages } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Contact - ChordsCo', description:'Welcome to chordsco our website is about chords and lyrics Our platform is the perfect destination for musicians who want to master their favorite songs.' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'contact') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout title="Contact us" content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
