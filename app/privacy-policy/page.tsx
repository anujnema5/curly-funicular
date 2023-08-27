import { Authors, Pages, allPages } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import PostLayout from '@/layouts/PostSimple'

export const metadata = genPageMetadata({ title: 'About - ChordsCo', description: 'Welcome to chordsco our website is about chords and lyrics Our platform is the perfect destination for musicians who want to master their favorite songs.' })

export default function Page() {
    const author = allPages.find((p) => p.title === 'Privacy Policy') as Pages
    const mainContent = coreContent(author)    

    return (
        <PostLayout content={mainContent}>
            <MDXLayoutRenderer code={author.body.code} />
        </PostLayout>
    )
}
