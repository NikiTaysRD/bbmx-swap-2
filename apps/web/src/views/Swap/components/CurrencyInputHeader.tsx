import { useTranslation } from '@pancakeswap/localization'
import {
  ChartDisableIcon,
  ChartIcon,
  Flex,
  HistoryIcon,
  HotDisableIcon,
  HotIcon,
  IconButton,
  NotificationDot,
  Swap,
  Text,
  TooltipText,
  useModal,
  useTooltip,
} from '@pancakeswap/uikit'
import RefreshIcon from 'components/Svg/RefreshIcon'
import { CHAIN_REFRESH_TIME } from 'config/constants/exchange'
import { useExpertMode } from '@pancakeswap/utils/user'
import TransactionsModal from 'components/App/Transactions/TransactionsModal'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { useSwapHotTokenDisplay } from 'hooks/useSwapHotTokenDisplay'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useRoutingSettingChanged } from 'state/user/smartRouter'
import { useAtom } from 'jotai'
import { ReactElement, useCallback, useContext, useEffect, useState, memo } from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import atomWithStorageWithErrorCatch from 'utils/atomWithStorageWithErrorCatch'
import InternalLink from 'components/Links'
import Image from 'next/image'
import { SettingsMode } from '../../../components/Menu/GlobalSettings/types'
import { SwapFeaturesContext } from '../SwapFeaturesContext'
import BuyCryptoIcon from '../../../../public/images/moneyBangs.svg'

const AppMenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  padding-top: 8px;
`

const AppMenuItem = styled.li`
  color: #fff;
  float: left;
  margin-right: 15px;
  /* color: #a0a3c4; */
  transition: 0.3s all;
  -webkit-transition: 0.3s all;
  -moz-transition: 0.3s all;
  cursor: pointer;
  font-weight: 500;
`

interface Props {
  title: string | ReactElement
  subtitle: string
  noConfig?: boolean
  setIsChartDisplayed?: React.Dispatch<React.SetStateAction<boolean>>
  isChartDisplayed?: boolean
  hasAmount: boolean
  onRefreshPrice: () => void
  setIsShowMarket?: (isShwo: boolean) => void
}

const SUPPORTED_BUY_CRYPTO_CHAINS = [1, 56]

const ColoredIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.textSubtle};
  overflow: hidden;
`

//  disable this during the v3 campaign
const mobileShowOnceTokenHighlightAtom = atomWithStorageWithErrorCatch('pcs::mobileShowOnceTokenHighlightV2', true)

const CurrencyInputHeader: React.FC<React.PropsWithChildren<Props>> = memo(
  ({ subtitle, title, hasAmount, onRefreshPrice, setIsShowMarket }) => {
    const { t } = useTranslation()
    const { chainId } = useActiveChainId()
    const [mobileTooltipShowOnce, setMobileTooltipShowOnce] = useAtom(mobileShowOnceTokenHighlightAtom)
    const [mobileTooltipShow, setMobileTooltipShow] = useState(false)

    const { tooltip, tooltipVisible, targetRef } = useTooltip(<Text>{t('Check out the top traded tokens')}</Text>, {
      placement: isMobile ? 'top' : 'bottom',
      trigger: isMobile ? 'focus' : 'hover',
      ...(isMobile && { manualVisible: mobileTooltipShow }),
    })
    const {
      tooltip: buyCryptoTooltip,
      tooltipVisible: buyCryptoTooltipVisible,
      targetRef: buyCryptoTargetRef,
    } = useTooltip(<Text>{t('Buy crypto with fiat.')}</Text>, {
      placement: isMobile ? 'top' : 'bottom',
      trigger: isMobile ? 'focus' : 'hover',
      ...(isMobile && { manualVisible: mobileTooltipShow }),
    })

    const { isChartSupported, isChartDisplayed, setIsChartDisplayed, isHotTokenSupported } = useContext(
      SwapFeaturesContext,
    )
    const [expertMode] = useExpertMode()
    const [isRoutingSettingChange] = useRoutingSettingChanged()
    const toggleChartDisplayed = () => {
      setIsChartDisplayed((currentIsChartDisplayed) => !currentIsChartDisplayed)
    }
    const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
    const [isSwapHotTokenDisplay, setIsSwapHotTokenDisplay] = useSwapHotTokenDisplay()

    const mobileTooltipClickOutside = useCallback(() => {
      setMobileTooltipShow(false)
    }, [])

    useEffect(() => {
      if (isMobile && !mobileTooltipShowOnce) {
        setMobileTooltipShow(true)
        setMobileTooltipShowOnce(true)
      }
    }, [mobileTooltipShowOnce, setMobileTooltipShowOnce])

    useEffect(() => {
      document.body.addEventListener('click', mobileTooltipClickOutside)
      return () => {
        document.body.removeEventListener('click', mobileTooltipClickOutside)
      }
    }, [mobileTooltipClickOutside])

    const titleContent = (
      <Flex width="100%" alignItems="center" justifyContent="space-between" flexDirection="column">
        <Flex width="100%" justifyContent={setIsShowMarket ? 'space-between' : 'end'}>
          {setIsShowMarket ? (
            <AppMenuList>
              <AppMenuItem onClick={() => setIsShowMarket(true)}>Market</AppMenuItem>
              <AppMenuItem onClick={() => setIsShowMarket(false)}>Limit</AppMenuItem>
            </AppMenuList>
          ) : null}
          <NotificationDot show={expertMode || isRoutingSettingChange}>
            <GlobalSettings color="textSubtle" mr="0" mode={SettingsMode.SWAP_LIQUIDITY} />
          </NotificationDot>
        </Flex>
      </Flex>
    )

    return <Swap.CurrencyInputHeader title={titleContent} withBorder={false} subtitle={<></>} />
  },
)

export default CurrencyInputHeader
