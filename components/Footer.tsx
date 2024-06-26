import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import footerNavLink from '@/data/footerNavLinks'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <span>All rights reserved</span>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400 flex flex-wrap items-center justify-center lg:gap-3 gap-2">
          {footerNavLink?.map((link) => (
            <Link href={link.href} aria-label={link.title} key={link.title} rel="noopener" className='hover:text-primary-600'>
              {`${link.title}`} 
            </Link>
          ))}

        </div>
      </div>
    </footer>
  )
}
