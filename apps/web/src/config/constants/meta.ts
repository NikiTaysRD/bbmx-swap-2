import memoize from 'lodash/memoize'
import { ContextApi } from '@pancakeswap/localization'
import { PageMeta } from './types'
import { ASSET_CDN } from './endpoints'
import BBMXBanner from '../../../public/images/seo-banner.jpg'

export const DEFAULT_META: PageMeta = {
  title: 'BBMXSwap',
  description:
    'BBMX is a robust DeFi ecosystem on BaseChain, featuring a decentralized exchange, futures trading, universal staking, smart contract locking, project launch support, and a community-driven DAO. Our mission is to provide professional, user-friendly financial solutions on the Base blockchain. Join us in shaping the future of DeFi.',
  image: BBMXBanner.src,
}

interface PathList {
  paths: { [path: string]: { title: string; basePath?: boolean; description?: string; image?: string } }
  defaultTitleSuffix: string
}

const getPathList = (t: ContextApi['t']): PathList => {
  return {
    paths: {
      '/': { title: t('Home') },
      '/swap': { basePath: true, title: t('Exchange'), image: BBMXBanner.src },
      '/limit-orders': { basePath: true, title: t('Limit Orders'), image: BBMXBanner.src },
      '/add': { basePath: true, title: t('Add Liquidity'), image: BBMXBanner.src },
      '/remove': { basePath: true, title: t('Remove Liquidity'), image: BBMXBanner.src },
      '/liquidity': { title: t('Liquidity'), image: BBMXBanner.src },
      '/find': { title: t('Import Pool') },
      '/competition': { title: t('Trading Battle') },
      '/prediction': { title: t('Prediction'), image: BBMXBanner.src },
      '/prediction/leaderboard': { title: t('Leaderboard'), image: BBMXBanner.src },
      '/farms': { title: t('Farms'), image: BBMXBanner.src },
      '/farms/auction': { title: t('Farm Auctions'), image: BBMXBanner.src },
      '/pools': { title: t('Pools'), image: BBMXBanner.src },
      '/lottery': { title: t('Lottery'), image: BBMXBanner.src },
      '/ifo': { title: t('Initial Farm Offering'), image: BBMXBanner.src },
      '/teams': { basePath: true, title: t('Leaderboard'), image: BBMXBanner.src },
      '/voting': { basePath: true, title: t('Voting'), image: BBMXBanner.src },
      '/voting/proposal': { title: t('Proposals'), image: BBMXBanner.src },
      '/voting/proposal/create': { title: t('Make a Proposal'), image: BBMXBanner.src },
      '/info': {
        title: `${t('Overview')} - ${t('Info')}`,
        description: 'View statistics for Pancakeswap exchanges.',
        image: BBMXBanner.src,
      },
      '/info/pairs': {
        title: `${t('Pairs')} - ${t('Info')}`,
        description: 'View statistics for Pancakeswap exchanges.',
        image: BBMXBanner.src,
      },
      '/info/tokens': {
        title: `${t('Tokens')} - ${t('Info')}`,
        description: 'View statistics for Pancakeswap exchanges.',
        image: BBMXBanner.src,
      },
      '/nfts': { title: t('NFT Marketplace'), image: BBMXBanner.src },
      '/nfts/collections': { basePath: true, title: t('Collections'), image: BBMXBanner.src },
      '/nfts/activity': { title: t('Activity'), image: BBMXBanner.src },
      '/profile': { basePath: true, title: t('Profile') },
      '/pancake-squad': { basePath: true, title: t('Pancake Squad') },
      '/pottery': { basePath: true, title: t('Pottery'), image: BBMXBanner.src },
    },
    defaultTitleSuffix: 'BBMXSwap',
  }
}

export const getCustomMeta = memoize(
  (path: string, t: ContextApi['t'], _: string): PageMeta => {
    const pathList = getPathList(t)
    const pathMetadata =
      pathList.paths[path] ??
      pathList.paths[Object.entries(pathList.paths).find(([url, data]) => data.basePath && path.startsWith(url))?.[0]]

    if (pathMetadata) {
      return {
        title: `${pathMetadata.title}`,
        ...(pathMetadata.description && { description: pathMetadata.description }),
        image: pathMetadata.image,
      }
    }
    return null
  },
  (path, t, locale) => `${path}#${locale}`,
)
