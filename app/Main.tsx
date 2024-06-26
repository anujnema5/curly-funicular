import Link from '@/components/Link'
import Category from '@/components/Category'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Image from 'next/image'
import React from 'react'
import { slug as gitSlug } from 'github-slugger'
import ArticleLayout from '@/layouts/ArticleLayout'
// import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {

  // FETCHING ONLY UKULELE CHORDS
  const ukulelePosts = posts?.filter((post) => {
    return post?.category.includes('ukulele chords');
  });

  const newReleased = posts?.filter((post) => {
    return post?.category.includes('piano chords');
  });

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Latest Songs
          </h1>
          <p className="text-lg leading-7 lg:w-4/5 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, category, images } = post

            return (
              <li key={slug} className="py-8">
                <article>
                  <div className={"flex flex-col sm:flex-row gap-7 items-center justify-center px-1"}>

                    {images.length !== 0 ?
                      <Image src={images[0]} className='sm:w-72 sm:h-60 rounded-md w-full max-h-72' alt='thumbnail' aria-label='Thumnail Image for Post' width={300} height={300} /> : <div className='sm:w-72 sm:h-60 w-full h-56 rounded-md bg-gray-800/50 flex items-center justify-center text-gray-400'>Insert Image</div>}
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-3">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                          </dd>
                        </dl>
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/chords/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex lg:gap-5 gap-3 sm:mt-2 mt-3 flex-wrap">
                            {category.map((category) => (
                              <Category key={category} text={category} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/chords/${slug}`}
                          className="text-primary-600 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Play song &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/chords"
            className="text-primary-600 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}

      {ukulelePosts && (
        <ArticleLayout posts={ukulelePosts.slice(0, MAX_DISPLAY)} title={"Ukulele"} slug={'ukulele-chords'} />
      )}

      {newReleased && (
        <ArticleLayout posts={newReleased.slice(0, MAX_DISPLAY)} title={"Piano"} slug={'piano-chords'} />
      )}

    </>
  )
}
