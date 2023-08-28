import { AutoColumn, promotedGradient, Text, Skeleton } from '@pancakeswap/uikit'
import { FeeAmount } from '@pancakeswap/v3-sdk'
import { LightTertiaryCard } from 'components/Card'
import { PoolState } from 'hooks/v3/types'
import { useFeeTierDistribution } from 'hooks/v3/useFeeTierDistribution'
import styled from 'styled-components'

import { baseDisplay } from 'pages/_app'
import { FEE_AMOUNT_DETAIL } from './shared'

const FeeOptionContainer = styled.div<{ active: boolean }>`
  cursor: pointer;
  height: 100%;
  animation: ${promotedGradient} 4s ease infinite;
  border-radius: 16px;
  padding: 2px 2px 4px 2px;
  &:hover {
    opacity: 0.7;
  }
`

interface FeeOptionProps {
  feeAmount: FeeAmount
  largestUsageFeeTier?: FeeAmount
  active: boolean
  distributions: ReturnType<typeof useFeeTierDistribution>['distributions']
  poolState: PoolState
  onClick: () => void
  isLoading?: boolean
}

const StyledFeeOptionCard = styled(LightTertiaryCard)<{ active: boolean }>`
  background: none;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-color: ${({ active }) => active && '#4E09F8'};
  color: ${({ active }) => active && 'white'};
`

export function FeeOption({
  feeAmount,
  active,
  poolState,
  distributions,
  onClick,
  largestUsageFeeTier,
  isLoading,
}: FeeOptionProps) {
  return (
    <FeeOptionContainer active={active} onClick={onClick}>
      <StyledFeeOptionCard active={active} padding={['4px', '4px', '8px']} height="100%">
        <AutoColumn gap="sm" justify="flex-start" height="100%" justifyItems="center">
          <Text
            textAlign="center"
            color={`${active ? 'white' : '#a0a3c4'}`}
            fontSize="15px"
            className={baseDisplay.className}
          >
            {FEE_AMOUNT_DETAIL[feeAmount].label}%
          </Text>
          <Text textAlign="center" fontSize="11px" className={baseDisplay.className}>
            9% Pick
          </Text>
          {isLoading ? <Skeleton width="100%" height={16} /> : null}
        </AutoColumn>
      </StyledFeeOptionCard>
    </FeeOptionContainer>
  )
}
