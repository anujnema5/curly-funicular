import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Dropdown from './Dropdown'

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="h-6 sm:text-2xl sm:font-semibold sm:block text-xl font-semibold">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center leading-5 space-x-4 sm:space-x-8">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link, index) => {
            if (link.type !== 'dropdown') {
              return (
                <Link
                  key={link.title}
                  href={link.href || ''}
                  className="hidden sm:block font-medium text-gray-900 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              )
            } if (link.type === 'dropdown') {
              return (
                <Dropdown key={index} links={link.links} />
              )
            }
          })}
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
