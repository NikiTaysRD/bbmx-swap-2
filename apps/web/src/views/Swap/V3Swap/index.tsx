import { SmartRouter } from '@pancakeswap/smart-router/evm'
import throttle from 'lodash/throttle'
import { useMemo, useState } from 'react'
import { Box } from '@pancakeswap/uikit'

import { shouldShowMMLiquidityError } from 'views/Swap/MMLinkPools/utils/exchange'
import { MMLiquidityWarning } from 'views/Swap/MMLinkPools/components/MMLiquidityWarning'

import { useDerivedBestTradeWithMM } from '../MMLinkPools/hooks/useDerivedSwapInfoWithMM'
import { useCheckInsufficientError } from './hooks/useCheckSufficient'
import {
  FormHeader,
  FormMain,
  MMTradeDetail,
  PricingAndSlippage,
  SwapCommitButton,
  TradeDetails,
  BuyCryptoLink,
} from './containers'
import { MMCommitButton } from './containers/MMCommitButton'
import { useSwapBestTrade } from './hooks'

export function V3SwapForm({ setIsLimitOpened }) {
  const [isShowMarket, setIsShowMarket] = useState(true)

  const { isLoading, trade, refresh, syncing, isStale, error } = useSwapBestTrade()
  const mm = useDerivedBestTradeWithMM(trade)
  const throttledHandleRefresh = useMemo(
    () =>
      throttle(() => {
        refresh()
      }, 3000),
    [refresh],
  )

  const finalTrade = mm.isMMBetter ? mm?.mmTradeInfo?.trade : trade

  const tradeLoaded = !isLoading
  const price = useMemo(() => trade && SmartRouter.getExecutionPrice(trade), [trade])

  const insufficientFundCurrency = useCheckInsufficientError(trade)

  return (
    <>
      <FormHeader
        onRefresh={throttledHandleRefresh}
        refreshDisabled={!tradeLoaded || syncing || !isStale}
        setIsShowMarket={setIsShowMarket}
        isShowMarket={isShowMarket}
        setIsLimitOpened={setIsLimitOpened}
      />
      <FormMain
        tradeLoading={mm.isMMBetter ? false : !tradeLoaded}
        pricingAndSlippage={<PricingAndSlippage priceLoading={isLoading} price={price} showSlippage={!mm.isMMBetter} />}
        isMMBetter={mm.isMMBetter}
        inputAmount={finalTrade?.inputAmount}
        loaded={!mm.mmOrderBookTrade.isLoading}
        trade={trade}
        mmTrade={mm.mmTradeInfo}
        outputAmount={finalTrade?.outputAmount}
        isShowMarket={isShowMarket}
        swapCommitButton={
          mm?.isMMBetter ? (
            <MMCommitButton {...mm} />
          ) : (
            <SwapCommitButton trade={trade} tradeError={error} tradeLoading={!tradeLoaded} />
          )
        }
      />

      {/* <BuyCryptoLink currency={insufficientFundCurrency} /> */}

      {(shouldShowMMLiquidityError(mm?.mmOrderBookTrade?.inputError) || mm?.mmRFQTrade?.error) && !trade && (
        <Box mt="5px">
          <MMLiquidityWarning />
        </Box>
      )}
    </>
  )
}
