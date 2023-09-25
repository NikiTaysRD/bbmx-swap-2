import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | BBMXSwap',
  defaultTitle: 'BBMXSwap',
  description: 'BBMXSwap',
  themeColor: '#4E09F8',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@BBMXSwap',
    site: '@BBMXSwap',
  },
  openGraph: {
    title: 'BBMXSwap',
    description: 'Trade BBMX coins in here!',
  },
}
