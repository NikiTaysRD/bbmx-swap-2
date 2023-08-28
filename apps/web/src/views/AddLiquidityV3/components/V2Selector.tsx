import { useState } from 'react'
import { Button, FlexGap, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { SelectButton } from 'components/SelectButton'
import { EvenWidthAutoRow } from 'components/Layout/EvenWidthAutoRow'
import { TOTAL_FEE } from 'config/constants/info'

import { baseDisplay } from 'pages/_app'
import HideShowSelectorSection from './HideShowSelectorSection'
import { HandleFeePoolSelectFn, SELECTOR_TYPE } from '../types'

export function V2Selector({
  isStable,
  handleFeePoolSelect,
  selectorType,
}: {
  isStable: boolean
  selectorType: SELECTOR_TYPE
  handleFeePoolSelect: HandleFeePoolSelectFn
}) {
  const { t } = useTranslation()
  const [showOptions, setShowOptions] = useState(false)

  return (
    <HideShowSelectorSection
      showOptions={showOptions}
      setShowOptions={setShowOptions}
      heading={
        selectorType === SELECTOR_TYPE.STABLE ? (
          <Text>StableSwap LP</Text>
        ) : selectorType === SELECTOR_TYPE.V2 ? (
          <Text className={baseDisplay.className}>
            {(TOTAL_FEE * 100).toFixed(2)} {t('fee tier')}
          </Text>
        ) : (
          <Text>V3 LP</Text>
        )
      }
      content={
        <EvenWidthAutoRow gap="4px">
          {isStable ? (
            <>
              <SelectButton
                isActive={selectorType === SELECTOR_TYPE.STABLE}
                onClick={() => handleFeePoolSelect({ type: SELECTOR_TYPE.STABLE })}
              >
                StableSwap LP
              </SelectButton>
            </>
          ) : (
            <>
              <FlexGap gap="10px" alignItems="center">
                <Button
                  scale="sm"
                  variant="text"
                  onClick={() => handleFeePoolSelect({ type: SELECTOR_TYPE.V3 })}
                  style={{
                    background: 'rgba(78,9,248,0.1)',
                    borderRadius: '6px',
                    letterSpacing: '0.5px',
                    fontSize: '13px',
                  }}
                >
                  <Text color="textSubtle" bold style={{ color: '#4E09F8' }} className={baseDisplay.className}>
                    Add
                  </Text>
                </Button>
                <Text
                  color="textSubtle"
                  bold
                  style={{ color: '#a0a3c4', fontSize: '13px' }}
                  className={baseDisplay.className}
                >
                  {t('V3 Liquidity')}
                </Text>
              </FlexGap>
            </>
          )}
        </EvenWidthAutoRow>
      }
    />
  )
}
