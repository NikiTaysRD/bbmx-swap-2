import { useTranslation } from '@pancakeswap/localization'
import { AddCircleIcon, AutoColumn, AutoRow, IconButton, NumericalInput, RemoveIcon } from '@pancakeswap/uikit'
import { FeeAmount } from '@pancakeswap/v3-sdk'
import { LightGreyCard } from 'components/Card'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { baseDisplay } from 'pages/_app'

interface StepCounterProps {
  value: string
  onUserInput: (value: string) => void
  decrement: () => string
  increment: () => string
  decrementDisabled?: boolean
  incrementDisabled?: boolean
  feeAmount?: FeeAmount
  label?: string
  width?: string
  locked?: boolean // disable input
  title: ReactNode
  tokenA: string | undefined
  tokenB: string | undefined
}

const StyledCard = styled(LightGreyCard)`
  border-radius: 6px;
  background: #101124;
  border: 1px solid rgba(255, 255, 255, 0.15);
`

const StepCounter = ({
  value,
  decrement,
  increment,
  decrementDisabled = false,
  incrementDisabled = false,
  // width,
  locked,
  onUserInput,
  title,
  tokenA,
  tokenB,
}: StepCounterProps) => {
  const { t } = useTranslation()
  //  for focus state, styled components doesnt let you select input parent container
  const [, setActive] = useState(false)

  // let user type value and only update parent value on blur
  const [localValue, setLocalValue] = useState('')
  const [useLocalValue, setUseLocalValue] = useState(false)

  // animation if parent value updates local value
  // const [

  //   pulsing,
  //   setPulsing,
  // ] = useState<boolean>(false)

  const handleOnFocus = () => {
    setUseLocalValue(true)
    setActive(true)
  }

  const handleOnBlur = useCallback(() => {
    setUseLocalValue(false)
    setActive(false)
    onUserInput(localValue) // trigger update on parent value
  }, [localValue, onUserInput])

  // for button clicks
  const handleDecrement = useCallback(() => {
    setUseLocalValue(false)
    onUserInput(decrement())
  }, [decrement, onUserInput])

  const handleIncrement = useCallback(() => {
    setUseLocalValue(false)
    onUserInput(increment())
  }, [increment, onUserInput])

  useEffect(() => {
    if (localValue !== value && !useLocalValue) {
      setTimeout(() => {
        setLocalValue(value) // reset local value to match parent
        // setPulsing(true) // trigger animation
        // setTimeout(() => {
        //   setPulsing(false)
        // }, 1800)
      }, 0)
    }
  }, [localValue, useLocalValue, value])

  return (
    <StyledCard padding="0">
      <AutoColumn
        py="16px"
        textAlign="center"
        gap="8px"
        width="100%"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        style={{ fontSize: '12px', color: '#a0a3c4' }}
        className={baseDisplay.className}
      >
        {title}
        <AutoRow style={{ padding: '0 10px' }}>
          {!locked && (
            <IconButton
              onClick={handleDecrement}
              disabled={decrementDisabled}
              scale="xs"
              variant="text"
              style={{ width: 20, padding: 16, background: '#1B1C30', borderRadius: '6px' }}
            >
              <RemoveIcon color="primary" width={20} height={20} style={{ fill: 'white' }} />
            </IconButton>
          )}

          <NumericalInput
            value={localValue}
            fontSize="20px"
            align="center"
            disabled={locked}
            onUserInput={(val) => {
              setLocalValue(val)
            }}
          />

          {!locked && (
            <IconButton
              px="16px"
              onClick={handleIncrement}
              disabled={incrementDisabled}
              scale="xs"
              variant="text"
              style={{ width: 20, padding: 16, background: '#1B1C30', borderRadius: '6px' }}
            >
              <AddCircleIcon color="primary" width={20} height={20} style={{ fill: 'white' }} />
            </IconButton>
          )}
        </AutoRow>
        {t('%assetA% per %assetB%', { assetA: tokenB, assetB: tokenA })}
      </AutoColumn>
    </StyledCard>
  )
}

export default StepCounter
