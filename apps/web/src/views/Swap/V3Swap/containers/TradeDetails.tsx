import { TradeType } from '@pancakeswap/sdk'
import { SmartRouter, SmartRouterTrade } from '@pancakeswap/smart-router/evm'
import { AutoColumn } from '@pancakeswap/uikit'
import useLastTruthy from 'hooks/useLast'
import { useMemo, memo, useState } from 'react'
import styled from 'styled-components'
import { formatAmount } from '@pancakeswap/utils/formatFractions'
import FormattedPriceImpact from 'views/Swap/components/FormattedPriceImpact'

import { AdvancedSwapDetails, TradeSummary } from 'views/Swap/components/AdvancedSwapDetails'
import { AdvancedDetailsFooter } from 'views/Swap/components/AdvancedSwapDetailsDropdown'
import { Field } from 'state/swap/actions'

import { MMTradeInfo } from 'views/Swap/MMLinkPools/hooks'
import { RoutesBreakdown } from '../components'
import { useSlippageAdjustedAmounts, useIsWrapping } from '../hooks'
import { computeTradePriceBreakdown } from '../utils/exchange'
import { formatNumber } from '@pancakeswap/utils/formatBalance'

interface Props {
  loaded: boolean
  trade?: SmartRouterTrade<TradeType> | null
  amountInDollar: number
}

const RiskWrapper = styled.div`
  margin-top: 10px;
  padding: 12px;
  border-radius: 15px;
  border: 1px solid transparent;
  background: #101124;
`

const GasOverview = styled.div`
  font-size: 12px;
  cursor: pointer;
  align-items: center !important;
  justify-content: space-between !important;
  display: flex !important;
`

const Estimate = styled.div`
  font-size: 12px;
  cursor: pointer;
`

const Gas = styled.div`
  color: #a0a3c4;
`

const ImpactTable = styled.div`
  padding-top: 10px;
`

const Table = styled.table`
  width: 100%;
  font-size: 12px;
  caption-side: bottom;
  border-collapse: collapse;
`

const TBody = styled.tbody`
  border-color: inherit;
  border-style: solid;
  border-width: 0;
`

const TR = styled.tr`
  width: 100%;
  font-size: 12px;
  transition: 0.3s all;
  -webkit-transition: 0.3s all;
  -moz-transition: 0.3s all;
`

const TH = styled.th`
  font-weight: 600;
  font-size: 11px;
  line-height: 18px;
  padding: 5px 0;
  text-align: left;
  letter-spacing: normal;
  transition: 0.3s all;
  -webkit-transition: 0.3s all;
  -moz-transition: 0.3s all;
`

const TD = styled.td`
  font-size: 11px;
  text-align: right;
  letter-spacing: normal;
`

export function MMTradeDetail({ loaded, mmTrade }: { loaded: boolean; mmTrade?: MMTradeInfo }) {
  const lastTrade = useLastTruthy(mmTrade?.trade)

  return (
    <AdvancedDetailsFooter show={loaded}>
      <AutoColumn gap="0px">
        {lastTrade && (
          <AdvancedSwapDetails
            pairs={lastTrade?.route.pairs}
            path={lastTrade?.route.path}
            slippageAdjustedAmounts={mmTrade?.slippageAdjustedAmounts}
            realizedLPFee={mmTrade?.realizedLPFee}
            inputAmount={mmTrade?.inputAmount}
            outputAmount={mmTrade?.outputAmount}
            tradeType={mmTrade?.tradeType}
            priceImpactWithoutFee={mmTrade?.priceImpactWithoutFee}
            isMM
          />
        )}
      </AutoColumn>
    </AdvancedDetailsFooter>
  )
}

export const TradeDetails = memo(function TradeDetails({ loaded, trade, amountInDollar }: Props) {
  const [isOpenedRiskTable, setIsOpenedRiskTable] = useState(false)

  const slippageAdjustedAmounts = useSlippageAdjustedAmounts(trade)
  const isWrapping = useIsWrapping()
  const { priceImpactWithoutFee, lpFeeAmount } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const hasStablePool = useMemo(() => trade?.routes.some((route) => route.pools.some(SmartRouter.isStablePool)), [
    trade,
  ])

  if (isWrapping || !loaded || !trade) {
    return null
  }

  const { inputAmount, outputAmount, tradeType, routes } = trade

  return (
    <RiskWrapper>
      <GasOverview onClick={() => setIsOpenedRiskTable(!isOpenedRiskTable)}>
        <Estimate>
          {`${formatAmount(slippageAdjustedAmounts[Field.INPUT], 4)} ${inputAmount.currency.symbol}`} ={' '}
          {`${formatAmount(slippageAdjustedAmounts[Field.OUTPUT], 4)} ${outputAmount.currency.symbol}`}{' '}
          <span>(~${formatNumber(amountInDollar)})</span>
        </Estimate>
        <Gas>~$3.34</Gas>
      </GasOverview>
      <ImpactTable style={{ display: isOpenedRiskTable ? '' : 'none' }}>
        <Table>
          <TBody>
            <TR>
              <TH>Network fees:</TH>
              <TD>$3.30</TD>
            </TR>
            <TR>
              <TH>Minimum output:</TH>
              <TD>{`${formatAmount(slippageAdjustedAmounts[Field.OUTPUT], 4)} ${outputAmount.currency.symbol}`}</TD>
            </TR>
            <TR>
              <TH>Expected output:</TH>
              <TD>{`${formatAmount(slippageAdjustedAmounts[Field.OUTPUT], 4)} ${outputAmount.currency.symbol}`}</TD>
            </TR>
            <TR>
              <TH>Price impact:</TH>
              <TD>
                <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
              </TD>
            </TR>
            <TR>
              <TH>Trading fee:</TH>
              <TD>{`${formatAmount(lpFeeAmount, 4)} ${inputAmount.currency.symbol}`}</TD>
            </TR>
            <RoutesBreakdown routes={routes} />
          </TBody>
        </Table>
      </ImpactTable>
    </RiskWrapper>
  )
})
