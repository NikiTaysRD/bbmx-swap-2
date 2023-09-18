import { ChangeEvent } from 'react'
import { Flex, Radio, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { ProposalState } from 'state/types'
import { baseDisplay } from 'pages/_app'

interface FiltersProps {
  filterState: ProposalState
  onFilterChange: (filterState: ProposalState) => void
  isLoading: boolean
}

const StyledFilters = styled(Flex).attrs({ alignItems: 'center' })`
  // border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 14px 0 14px 28px;
`

const FilterLabel = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-right: 16px;
`

const StyledRadio = styled(Radio)`
  &:checked {
    background-color: #4e09f8;

    &:after {
      background-color: #4e09f8;
      top: 4px;
      left: 8px;

      width: 7px;
      height: 14px;
      border-bottom: 2px solid white;
      border-right: 2px solid white;
      border-radius: 0;

      transform: rotate(45deg);
    }
  }
`

const options = [
  { value: ProposalState.ACTIVE, label: 'Vote Now' },
  { value: ProposalState.PENDING, label: 'Soon' },
  { value: ProposalState.CLOSED, label: 'Closed' },
]

const Filters: React.FC<React.PropsWithChildren<FiltersProps>> = ({ filterState, onFilterChange, isLoading }) => {
  const { t } = useTranslation()

  return (
    <StyledFilters>
      {options.map(({ value, label }) => {
        const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
          const { value: radioValue } = evt.currentTarget
          onFilterChange(radioValue as ProposalState)
        }

        return (
          <FilterLabel key={label}>
            <StyledRadio
              scale="sm"
              value={value}
              checked={filterState === value}
              onChange={handleChange}
              disabled={isLoading}
            />
            <Text ml="8px" fontSize="15px" letterSpacing="0.5px" lineHeight="24px" className={baseDisplay.className}>
              {t(label)}
            </Text>
          </FilterLabel>
        )
      })}
    </StyledFilters>
  )
}

export default Filters
