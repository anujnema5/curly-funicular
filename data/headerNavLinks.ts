const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/chords', title: 'Chords' },
  { href: '/category/guitar-chords', title: 'Guitar Chords' },
  { href: '/category/ukulele-chords', title: 'Ukulele Chords' },
  { href: '/category/piano-chords', title: 'Piano Chords' },
  { href: '/privacy-policy', title: 'Privacy Policy' },
  {
    type: 'dropdown',
    title: 'Pages',
    links: [
      { href: '/terms-and-conditions', title: 'Terms & Condition' },
      { href: '/disclaimer', title: 'Disclaimer' },
      { href: '/dmca', title: 'DMCA' },
      { href: '/contact-us', title: 'Contact us' },
      { href: '/about', title: 'About' },
    ],
  },

]

export default headerNavLinks
