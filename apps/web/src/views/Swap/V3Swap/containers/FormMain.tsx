/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo, ReactNode } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useWeb3React } from '@pancakeswap/wagmi'
import { Currency, CurrencyAmount, Percent } from '@pancakeswap/sdk'
import replaceBrowserHistory from '@pancakeswap/utils/replaceBrowserHistory'
import { formatAmount } from '@pancakeswap/utils/formatFractions'

import { useSwapActionHandlers } from 'state/swap/useSwapActionHandlers'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { useDefaultsFromURLSearch, useSwapState } from 'state/swap/hooks'
import { Field } from 'state/swap/actions'
import { useCurrency } from 'hooks/Tokens'
import { CommonBasesType } from 'components/SearchModal/types'
import { useCurrencyBalances } from 'state/wallet/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { currencyId } from 'utils/currencyId'

import { useTheme } from '@pancakeswap/hooks'
import { Flex, FlexGap, ImportList, useMatchBreakpoints } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { FormContainer } from '../components'
import useWarningImport from '../../hooks/useWarningImport'
import { useIsWrapping } from '../hooks'
import { FlipButton } from './FlipButton'
import { Recipient } from './Recipient'

interface Props {
  inputAmount?: CurrencyAmount<Currency>
  outputAmount?: CurrencyAmount<Currency>
  tradeLoading?: boolean
  pricingAndSlippage?: ReactNode
  swapCommitButton?: ReactNode
}

const RiskWrapper = styled.div`
  margin-top: 20px;
  margin-top: 5px;
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
`

const TBody = styled.tbody`
  border-color: inherit;
  border-style: solid;
  border-width: 0;
`

const TR = styled.tr`
  font-weight: 600;
  padding: 5px 0;
`

const TH = styled.th`
  font-weight: 600;
`

const TD = styled.td`
  text-align: right;
`

export function FormMain({ pricingAndSlippage, inputAmount, outputAmount, tradeLoading, swapCommitButton }: Props) {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const warningSwapHandler = useWarningImport()
  const {
    independentField,
    typedValue,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const isWrapping = useIsWrapping()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)
  const { onCurrencySelection, onUserInput } = useSwapActionHandlers()
  const [inputBalance] = useCurrencyBalances(account, [inputCurrency, outputCurrency])
  const maxAmountInput = useMemo(() => maxAmountSpend(inputBalance), [inputBalance])
  const loadedUrlParams = useDefaultsFromURLSearch()

  const handleTypeInput = useCallback((value: string) => onUserInput(Field.INPUT, value), [onUserInput])
  const handleTypeOutput = useCallback((value: string) => onUserInput(Field.OUTPUT, value), [onUserInput])

  const handlePercentInput = useCallback(
    (percent: number) => {
      if (maxAmountInput) {
        onUserInput(Field.INPUT, maxAmountInput.multiply(new Percent(percent, 100)).toExact())
      }
    },
    [maxAmountInput, onUserInput],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleCurrencySelect = useCallback(
    (newCurrency: Currency, field: Field, currentInputCurrencyId: string, currentOutputCurrencyId: string) => {
      onCurrencySelection(field, newCurrency)

      warningSwapHandler(newCurrency)

      const isInput = field === Field.INPUT
      const oldCurrencyId = isInput ? currentInputCurrencyId : currentOutputCurrencyId
      const otherCurrencyId = isInput ? currentOutputCurrencyId : currentInputCurrencyId
      const newCurrencyId = currencyId(newCurrency)
      if (newCurrencyId === otherCurrencyId) {
        replaceBrowserHistory(isInput ? 'outputCurrency' : 'inputCurrency', oldCurrencyId)
      }
      replaceBrowserHistory(isInput ? 'inputCurrency' : 'outputCurrency', newCurrencyId)
    },
    [onCurrencySelection, warningSwapHandler],
  )
  const handleInputSelect = useCallback(
    (newCurrency: Currency) => handleCurrencySelect(newCurrency, Field.INPUT, inputCurrencyId, outputCurrencyId),
    [handleCurrencySelect, inputCurrencyId, outputCurrencyId],
  )
  const handleOutputSelect = useCallback(
    (newCurrency: Currency) => handleCurrencySelect(newCurrency, Field.OUTPUT, inputCurrencyId, outputCurrencyId),
    [handleCurrencySelect, inputCurrencyId, outputCurrencyId],
  )

  const isTypingInput = independentField === Field.INPUT
  const inputValue = useMemo(
    () => typedValue && (isTypingInput ? typedValue : formatAmount(inputAmount) || ''),
    [typedValue, isTypingInput, inputAmount],
  )
  const outputValue = useMemo(
    () => typedValue && (isTypingInput ? formatAmount(outputAmount) || '' : typedValue),
    [typedValue, isTypingInput, outputAmount],
  )
  const inputLoading = typedValue ? !isTypingInput && tradeLoading : false
  const outputLoading = typedValue ? isTypingInput && tradeLoading : false

  const { isDark } = useTheme()

  const { isDesktop } = useMatchBreakpoints()
  return (
    <FormContainer>
      <Flex flexDirection="column" width="100%" pl={isDesktop && '15px'} pr={isDesktop && '15px'}>
        <FlexGap gap="5px" flexDirection="column" width="100%">
          <CurrencyInputPanel
            id="swap-currency-input"
            showUSDPrice
            showMaxButton
            showCommonBases
            inputLoading={!isWrapping && inputLoading}
            currencyLoading={!loadedUrlParams}
            label={!isTypingInput && !isWrapping ? t('From (estimated)') : t('From')}
            value={isWrapping ? typedValue : inputValue}
            maxAmount={maxAmountInput}
            showQuickInputButton
            currency={inputCurrency}
            onUserInput={handleTypeInput}
            onPercentInput={handlePercentInput}
            onMax={handleMaxInput}
            onCurrencySelect={handleInputSelect}
            otherCurrency={outputCurrency}
            commonBasesType={CommonBasesType.SWAP_LIMITORDER}
            backgroundColor={`${isDark && '#101124'}`}
            height={115}
          />
          {/* <RiskCheck currency={inputCurrency} /> */}
          <FlipButton />
          <CurrencyInputPanel
            id="swap-currency-output"
            showUSDPrice
            showCommonBases
            showMaxButton={false}
            inputLoading={!isWrapping && outputLoading}
            currencyLoading={!loadedUrlParams}
            label={isTypingInput && !isWrapping ? t('To (estimated)') : t('To')}
            value={isWrapping ? typedValue : outputValue}
            currency={outputCurrency}
            onUserInput={handleTypeOutput}
            onCurrencySelect={handleOutputSelect}
            otherCurrency={outputCurrency}
            commonBasesType={CommonBasesType.SWAP_LIMITORDER}
            backgroundColor="transparent"
            height={115}
          />
        </FlexGap>

        {/* <RiskCheck currency={outputCurrency} /> */}
        <Recipient />
        {/* {pricingAndSlippage} */}

        <RiskWrapper>
          <GasOverview>
            <Estimate>
              1 ETH = 1832.52 USDT <span>(~$1827.23)</span>
            </Estimate>
            <Gas>~$3.34</Gas>
          </GasOverview>
          {/* <ImpactTable>
            <Table>
              <TBody>
                <TR>
                  <TH>Network fees:</TH>
                  <TD>$3.30</TD>
                </TR>
              </TBody>
            </Table>
          </ImpactTable> */}
        </RiskWrapper>

        <span style={{ marginTop: '10px' }}>{swapCommitButton}</span>
      </Flex>
    </FormContainer>
  )
}
