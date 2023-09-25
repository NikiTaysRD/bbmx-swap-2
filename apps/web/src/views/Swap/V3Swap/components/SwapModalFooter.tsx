import { useTranslation } from '@pancakeswap/localization'
import { Currency, CurrencyAmount, Price, Percent, TradeType } from '@pancakeswap/sdk'
import { AutoRenewIcon, Button, QuestionHelper, Text, Link, AutoColumn } from '@pancakeswap/uikit'
import { formatAmount } from '@pancakeswap/utils/formatFractions'
import { AutoRow, RowBetween, RowFixed } from 'components/Layout/Row'
import { useState, memo } from 'react'
import { Field } from 'state/swap/actions'
import styled from 'styled-components'
import { warningSeverity } from 'utils/exchange'
import { baseDisplay } from 'pages/_app'

import FormattedPriceImpact from '../../components/FormattedPriceImpact'
import { StyledBalanceMaxMini, SwapCallbackError } from '../../components/styleds'
import { formatExecutionPrice } from '../utils/exchange'

const SwapModalFooterContainer = styled(AutoColumn)`
  margin-top: 24px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background-color: ${({ theme }) => theme.colors.background};
`

export const SwapModalFooter = memo(function SwapModalFooter({
  priceImpact: priceImpactWithoutFee,
  lpFee: realizedLPFee,
  inputAmount,
  outputAmount,
  tradeType,
  executionPrice,
  slippageAdjustedAmounts,
  isEnoughInputBalance,
  onConfirm,
  swapErrorMessage,
  disabledConfirm,
}: {
  tradeType: TradeType
  lpFee: CurrencyAmount<Currency>
  inputAmount: CurrencyAmount<Currency>
  outputAmount: CurrencyAmount<Currency>
  priceImpact: Percent
  executionPrice: Price<Currency, Currency>
  slippageAdjustedAmounts: { [field in Field]?: CurrencyAmount<Currency> }
  isEnoughInputBalance: boolean
  onConfirm: () => void
  swapErrorMessage?: string | undefined
  disabledConfirm: boolean
}) {
  const { t } = useTranslation()
  const [showInverted, setShowInverted] = useState<boolean>(false)
  const severity = warningSeverity(priceImpactWithoutFee)

  return (
    <>
      <SwapModalFooterContainer>
        <RowBetween align="center">
          <Text fontSize="11px" style={{ fontWeight: '600', lineHeight: '18px' }} className={baseDisplay.className}>
            {t('Price')}
          </Text>
          <Text
            fontSize="11px"
            className={baseDisplay.className}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '10px',
              fontWeight: '600',
              lineHeight: '18px',
            }}
          >
            {formatExecutionPrice(executionPrice, inputAmount, outputAmount, showInverted)}
            <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
              <AutoRenewIcon width="12px" />
            </StyledBalanceMaxMini>
          </Text>
        </RowBetween>

        <RowBetween>
          <RowFixed>
            <Text fontSize="11px" style={{ fontWeight: '600', lineHeight: '18px' }} className={baseDisplay.className}>
              {tradeType === TradeType.EXACT_INPUT ? t('Minimum received') : t('Maximum sold')}
            </Text>
          </RowFixed>
          <RowFixed>
            <Text fontSize="11px" style={{ fontWeight: '600', lineHeight: '18px' }} className={baseDisplay.className}>
              {tradeType === TradeType.EXACT_INPUT
                ? formatAmount(slippageAdjustedAmounts[Field.OUTPUT], 4) ?? '-'
                : formatAmount(slippageAdjustedAmounts[Field.INPUT], 4) ?? '-'}
            </Text>
            <Text
              fontSize="11px"
              marginLeft="4px"
              style={{ fontWeight: '600', lineHeight: '18px' }}
              className={baseDisplay.className}
            >
              {tradeType === TradeType.EXACT_INPUT ? outputAmount.currency.symbol : inputAmount.currency.symbol}
            </Text>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <Text fontSize="11px" style={{ fontWeight: '600', lineHeight: '18px' }} className={baseDisplay.className}>
              {t('Price Impact')}
            </Text>
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <Text fontSize="11px" style={{ fontWeight: '600', lineHeight: '18px' }} className={baseDisplay.className}>
              {t('Trading Fee')}
            </Text>
          </RowFixed>
          <Text
            fontSize="11px"
            textAlign="right"
            style={{ fontWeight: '600', lineHeight: '18px' }}
            className={baseDisplay.className}
          >
            {realizedLPFee ? `${formatAmount(realizedLPFee, 6)} ${inputAmount.currency.symbol}` : '-'}
          </Text>
        </RowBetween>
      </SwapModalFooterContainer>

      <AutoRow>
        <Button
          variant={severity > 2 ? 'danger' : 'primary'}
          onClick={onConfirm}
          disabled={disabledConfirm}
          mt="12px"
          id="confirm-swap-or-send"
          width="100%"
          className={baseDisplay.className}
        >
          {severity > 2 || (tradeType === TradeType.EXACT_OUTPUT && !isEnoughInputBalance)
            ? t('Swap Anyway')
            : t('Confirm Swap')}
        </Button>

        {swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
      </AutoRow>
    </>
  )
})
