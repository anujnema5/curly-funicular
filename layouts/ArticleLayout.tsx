import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from 'pliny/utils/formatDate'
import { slug as gitSlug } from 'github-slugger'
import React from 'react'

const MAX_DISPLAY = 5

function ArticleLayout({posts, title}) {
  return (
    <React.Fragment>
          <h1 className='xl:text-3xl lg:text-3xl lg:pt-14 lg:pb-3 pt-8 pb-3 text-primary-500 lg:font-bold text-2xl font-semibold'>{title} <span className='text-gray-200'>Chords &rarr;</span></h1>

          <span className='text-gray-400 text-base'>Checkout the {title} library by {siteMetadata.headerTitle}</span>

          <ul className='lg:py-7 grid sm:grid-cols-2 grid-cols-1 xl:gap-7 gap-8 pt-10'>
            {posts.slice(0, 10).map((post) => {
              const { slug, date, title, summary, category, images } = post

              return (
                <li key={title}>
                  <article>
                    <div className='lg:w-full lg:h-full xl:h-44 lg:flex xl:flex-row lg:flex-col border border-gray-700/40 rounded-xl hover:scale-105 transition-all ease-in-out'>

                      <div className="">
                        <Image src={images[0]} alt='thumbnail' width={500} height={200} className='xl:h-full xl:w-full lg:h-1/2 w-full h-72 rounded-t-lg xl:rounded-l-lg' />
                      </div>

                      <div className='flex-auto flex flex-col justify-center items-left lg:p-5 p-4 hover:bg-gray-800/10'>
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                          </dd>
                        </dl>

                        <h2 className='text-lg lg:pt-2 dark:text-gray-300 text-gray-600 font-semibold leading-8 tracking-tight pt-3'>
                          <Link
                            href={`/chords/${slug}`}
                            className="text-gray-900 dark:text-gray-200"
                          >
                            {title}
                          </Link>
                        </h2>


                        <div className="flex gap-2 py-3 flex-wrap">
                          {category.slice(0, 3).map((category) => (
                            <Link
                            key={category}
                              href={`/category/${gitSlug(category)}`}
                              className="px-2 py-1 bg-primary-700/10 rounded-md text-[0.7rem] font-medium uppercase text-primary-700 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {category.split(' ').join('-')}
                            </Link>
                          ))}
                        </div>

                        <div className="xl:hidden prose max-w-none text-gray-500 dark:text-gray-400 ">
                          {summary.split(' ').slice(0, 17).join(' ')}...
                        </div>

                        <div className="text-base py-3 lg:py-0 lg:px-2 lg:hidden ml-1 font-medium leading-6">
                          <Link
                            href={`/chords/${slug}`}
                            className="text-primary-700 hover:text-primary-600 dark:hover:text-primary-400"
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

          {posts.length > MAX_DISPLAY && (
            <div className="flex justify-end text-base font-medium leading-6">
              <Link
                href="/category/ukulele-chords"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="All posts"
              >
                All {title} Songs &rarr;
              </Link>
            </div>
          )}
        </React.Fragment>
  )
}

export default ArticleLayout