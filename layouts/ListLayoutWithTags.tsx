/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { chords } from 'contentlayer/generated'
import Link from '@/components/Link'
import Category from '@/components/Category'
import siteMetadata from '@/data/siteMetadata'
import categoryData from 'app/category-data.json'
import Image from 'next/image'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<chords>[]
  title: string
  initialDisplayPosts?: CoreContent<chords>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const categoryCounts = categoryData as Record<string, number>
  const categoryKeys = Object.keys(categoryCounts)
  const sortedcategories = categoryKeys.sort((a, b) => categoryCounts[b] - categoryCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pb-3 pt-6">
          <h1 className="sm:hidden text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden max-h-screen h-full sm:flex flex-wrap bg-gray-50 dark:bg-gray-900/70 shadow-md pt-5 dark:shadow-gray-800/40 rounded min-w-[280px] max-w-[280px] overflow-auto">
            <div className="py-4 px-6">
              {pathname.startsWith('/chords') ? (
                <h3 className="text-primary-500 font-bold uppercase">All Posts</h3>
              ) : (
                <Link
                  href={`/chords`}
                  className="font-bold uppercase text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {sortedcategories.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {pathname.split('/category/')[1] === slug(t) ? (
                        <h3 className="inline py-2 px-3 uppercase text-sm font-bold text-primary-500">
                          {`${t} (${categoryCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/category/${slug(t)}`}
                          className="py-2 px-3 uppercase text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500"
                          aria-label={`View posts categoryged ${t}`}
                        >
                          {`${t} (${categoryCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, category, images } = post
                return (
                  <li key={path} className="py-5">
                    <article className="space-y-2 flex flex-col xl:space-y-0">
                      <div className='sm:flex xl:flex-row sm:flex-col gap-5 justify-center items-center'>
                        {images?.length !== 0 ? 
                        <Image src={`${images[0]}`} className='xl:w-48 xl:h-52 rounded-md h-7/12 w-full ' alt='thumbnail' aria-label='Thumnail Image for Post' width={1000} height={1000} /> :
                          <div className='sm:w-72 sm:h-60 w-full h-56 rounded-md bg-gray-800/50 flex items-center justify-center text-gray-400'>Insert Image</div>
                        }
                        <div className='mt-4'>
                          <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                            </dd>
                          </dl>
                          <div className="space-y-3">
                            <div>
                              <h2 className="sm:text-2xl text-xl font-bold leading-8 tracking-tight">
                                <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                                  {title}
                                </Link>
                              </h2>
                              <div className="flex flex-wrap">
                                {category?.map((category) => 
                                <Category key={category} text={category} />)}
                              </div>
                            </div>
                            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                              {summary}
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
