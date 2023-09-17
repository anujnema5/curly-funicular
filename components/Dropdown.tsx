"use client"

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown({ links }) {
  return (
    <Menu as="div" className="relative hidden text-left z-[50] lg:inline-block">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md dark:bg-gray-950  text-sm font-semibold dark:text-gray-300 text-gray-800 shadow-sm ">
          Others
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md dark:bg-gray-900 bg-gray-100 shadow-lg dark:text-gray-200">

          <div className="py-1">
            {links?.map((link) => (
            <Menu.Item key={link.title}>
              {({ active }) => (
                <Link
                  href={link.href}
                  className={classNames(
                    active ? 'dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-primary-500/70  dark:ring-gray-700 hover:bg-gray-300 rounded-md' : 'dark:text-gray-100',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  {link.title}
                </Link>
              )}
            </Menu.Item>))
            }

          </div>

        </Menu.Items>
      </Transition>
    </Menu>
  )
}
