import {
  MenuItemsType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  TrophyIcon,
  TrophyFillIcon,
  DropdownMenuItems,
  WalletIcon,
  InfoIcon,
  BridgeIcon,
  HomeIcon,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
import { SUPPORTED_CHAIN_IDS as POOL_SUPPORTED_CHAINS } from '@pancakeswap/pools'
import { SUPPORT_FARMS, SUPPORT_ONLY_BSC } from 'config/constants/supportChains'
import { NewIconButton } from 'views/BuyCrypto/components/NewIcon'
import { links } from '@pancakeswap/uikit/src/widgets/Menu/testConfig'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const homeLink = links.find((link) => link.label === 'Home')

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Home'),
      href: homeLink?.href ?? '/',
      icon: HomeIcon,
      hideSubNav: true,
    },
    {
      label: t('Trade'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/swap',
      showItemsOnMobile: false,
      items: [
        {
          label: t('Swap'),
          href: '/swap',
        },
        // {
        //   label: t('Liquidity'),
        //   href: '/liquidity',
        // },
        // {
        //   label: t('Perpetual'),
        //   href: getPerpetualUrl({
        //     chainId,
        //     languageCode,
        //     isDark,
        //   }),
        //   confirmModalId: 'usCitizenConfirmModal',
        //   type: DropdownMenuItemType.EXTERNAL_LINK,
        // },
        {
          label: `${t('Limit')} (V2)`,
          href: '/limit-orders',
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/decorations/3d-coin.png',
        },
        {
          label: t('Buy Crypto'),
          LabelIcon: NewIconButton,
          href: '/buy-crypto',
          status: { text: t('New'), color: 'success' },
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Liquidity'),
      href: '/liquidity',
      icon: WalletIcon,
      hideSubNav: true,
    },
    {
      label: t('Bridge'),
      icon: BridgeIcon,
      items: [
        {
          label: 'Base',
          href: 'https://bridge.base.org/deposit',
        },
        {
          label: 'Orbiter',
          href: 'https://www.orbiter.finance/?source=Ethereum&dest=Base',
        },
      ],
    },
    {
      label: t('Farming'),
      href: '/farms',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: '/images/decorations/pe2.png',
      supportChainIds: SUPPORT_FARMS,
      items: [
        {
          label: t('Farms'),
          href: '/farms',
          supportChainIds: SUPPORT_FARMS,
        },
        {
          label: t('Pools'),
          href: '/pools',
          supportChainIds: POOL_SUPPORTED_CHAINS,
        },
        // {
        //   label: t('Liquid Staking'),
        //   href: '/liquid-staking',
        //   supportChainIds: POOL_SUPPORTED_CHAINS,
        // },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Governance'),
      href: '/governance',
      icon: TrophyIcon,
      fillIcon: TrophyFillIcon,
      supportChainIds: SUPPORT_ONLY_BSC,
      hideSubNav: true,
    },
    {
      label: `${t('Info')} V3`,
      href: '/info/v3',
      icon: InfoIcon,
      hideSubNav: true,
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
