import { Authors, Pages, allPages } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import PostLayout from '@/layouts/PostSimple'

export const metadata = genPageMetadata({ title: 'Privacy Policy - ChordsCo', description: 'At ChordsCo, accessible from https://chordsco.com, one of our main priorities is the privacy of our visitors.' })

export default function Page() {
    const author = allPages.find((p) => p.title === 'Privacy Policy') as Pages
    const mainContent = coreContent(author)    

    return (
        <PostLayout content={mainContent}>
            <MDXLayoutRenderer code={author.body.code} />
        </PostLayout>
    )
}
