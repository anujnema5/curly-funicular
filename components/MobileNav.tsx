'use client'

import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      <button aria-label="Toggle Menu" onClick={onToggleNav} className="sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100 h-8 w-8"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`fixed left-0 overflow-y-scroll top-0 z-10 h-full w-full transform opacity-95 dark:opacity-[0.98] bg-white duration-300 ease-in-out dark:bg-gray-950 ${navShow ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-end">
          <button className="mr-8 mt-11 h-8 w-8" aria-label="Toggle Menu" onClick={onToggleNav}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className=" mt-8 mb-4 max-w-full h-auto">
        {headerNavLinks?.map((link, i) => {
            if (link.type !== 'dropdown') {
              return (
                <div key={link.title} className="px-12 py-4 flex items-center">
                  <Link
                    href={link.href || ''}
                    className="text-xl font-semibold tracking-widest text-gray-900 dark:text-gray-100"
                    onClick={onToggleNav}
                  >
                    {link.title}
                  </Link>
                  <ChevronRightIcon
                  onClick={onToggleNav}
                    className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                  />
                </div>
              )
            }

            return (
              <div key={`${link}-${i}`}>
                {link.links.map((item, i) => (
                  <div key={`${item.href}-${i}`} className="flex items-center px-12 py-4">
                    <Link
                      href={item.href}
                      className="mono-type text-xl font-semibold tracking-widest dark:text-gray-100 text-gray-800"
                      onClick={onToggleNav}
                    >
                      {item.title}
                      
                    </Link>
                    <Link href={item.href} onClick={onToggleNav}>
                      <ChevronRightIcon
                        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default MobileNav
