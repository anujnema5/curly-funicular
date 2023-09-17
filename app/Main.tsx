import Link from '@/components/Link'
import Category from '@/components/Category'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Image from 'next/image'
import React from 'react'
import { slug as gitSlug } from 'github-slugger'
// import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {

  // FETCHING ONLY UKULELE CHORDS
  const ukulelePosts = posts?.filter((post) => {
    return post?.category.includes('rock bands');
  });

  const newReleased = posts?.filter((post) => {
    return post?.category.includes('new released');
  });

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Latest Songs
          </h1>
          <p className="text-lg leading-7 lg:w-4/5 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, category, images } = post

            return (
              <li key={slug} className="py-8">
                <article>
                  <div className={"flex flex-col sm:flex-row gap-7 items-center justify-center px-1"}>
                    {/* <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl> */}
                    {images.length !== 0 ?
                      <Image src={images[0]} className='sm:w-72 sm:h-60 rounded-md w-full max-h-72' alt='thumbnail' aria-label='Thumnail Image for Post' width={1000} height={1000} /> : <div className='sm:w-72 sm:h-60 w-full h-56 rounded-md bg-gray-800/50 flex items-center justify-center text-gray-400'>Insert Image</div>}
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
                          <div className="flex lg:gap-3 gap-0 sm:mt-2 mt-1 flex-wrap">
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
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
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
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}

      {ukulelePosts && (
        <React.Fragment>
          <h1 className='xl:text-3xl lg:text-3xl lg:pt-14 lg:pb-3 pt-8 pb-3 text-primary-500 lg:font-bold text-2xl font-semibold'>Ukulele <span className='text-gray-200'>Chords &rarr;</span></h1>

          <span className='text-gray-400 text-base'>Checkout the Ukulele library by {siteMetadata.headerTitle}</span>

          <ul className='lg:py-7 grid sm:grid-cols-2 grid-cols-1 xl:gap-7 gap-8 pt-10'>
            {ukulelePosts.slice(0, 10).map((post) => {
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

          {ukulelePosts.length > MAX_DISPLAY && (
            <div className="flex justify-end text-base font-medium leading-6">
              <Link
                href="/category/ukulele-chords"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="All posts"
              >
                All Ukulele Songs &rarr;
              </Link>
            </div>
          )}
        </React.Fragment>
      )}

      {newReleased && (
        <React.Fragment>
          <h1 className='xl:text-3xl lg:text-3xl lg:pt-14 lg:pb-3 pt-8 pb-3 text-primary-500 lg:font-bold text-2xl font-semibold'>New <span className='text-gray-200'>Released &rarr;</span></h1>

          <span className='text-gray-400 text-base'>Checkout the new released library by {siteMetadata.headerTitle}</span>

          <ul className='lg:py-7 grid sm:grid-cols-2 grid-cols-1 xl:gap-7 gap-8 pt-10'>
            {newReleased.slice(0, 10).map((post) => {
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

                        <div className="text-base py-3 lg:py-0 lg:px-2 lg:hidden font-medium leading-6">
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

          {newReleased.length > MAX_DISPLAY && (
            <div className="flex justify-end text-base font-medium leading-6">
              <Link
                href="/category/new-released"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="All posts"
              >
                All New Released Songs &rarr;
              </Link>
            </div>
          )}
        </React.Fragment>
      )}

    </>
  )
}
