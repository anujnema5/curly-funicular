import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from 'pliny/utils/formatDate'
import { slug as gitSlug } from 'github-slugger'
import React from 'react'
import Category from '@/components/Category'

const MAX_DISPLAY = 5

function ArticleLayout({ posts, title, slug }) {
  return (
    <React.Fragment>
      <h1 className='xl:text-3xl lg:text-3xl lg:pt-14 lg:pb-3 pt-8 pb-3 text-primary-600 lg:font-bold text-2xl font-semibold px-1'>{title} <span className='dark:text-gray-200 text-gray-600'>Chords &rarr;</span></h1>

      <span className='text-gray-600 dark:text-gray-400 text-base px-1'>Checkout the {title} library by {siteMetadata.headerTitle}</span>

      <ul className='divide-y divide-gray-200 dark:divide-gray-800'>
        {posts.map((post) => {
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
                        aria-label={`play-song"`}
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

      {/* {posts.length > MAX_DISPLAY && ( */}
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href={`/category/${slug}`}
            className="text-primary-600 hover:text-primary-600 dark:hover:text-primary-400 "
            aria-label={`all-${title}-songs`}
          >
            All {title} Songs &rarr;
          </Link>
        </div>
      {/* )} */}
    </React.Fragment>
  )
}

export default ArticleLayout