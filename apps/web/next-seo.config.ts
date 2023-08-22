import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | BBMXSwap',
  defaultTitle: 'BBMXSwap',
  description: 'BBMXSwap',
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
