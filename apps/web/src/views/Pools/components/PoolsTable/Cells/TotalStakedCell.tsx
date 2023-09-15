import { Flex, Skeleton, Text, Balance, Pool } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { Token } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js'
import { baseDisplay } from 'pages/_app'

interface TotalStakedCellProps {
  totalStakedBalance: number
  stakingToken: Token
  totalStaked: BigNumber
}

const StyledCell = styled(Pool.BaseCell)`
  flex: 1 0 40px;
`

const TotalStakedCell: React.FC<React.PropsWithChildren<TotalStakedCellProps>> = ({
  stakingToken,
  totalStaked,
  totalStakedBalance,
}) => {
  return (
    <StyledCell role="cell">
      <Pool.CellContent>
        <Text
          color="#a0a3c4"
          textAlign="left"
          fontSize="13px"
          lineHeight="160%"
          letterSpacing="0.75px"
          className={baseDisplay.className}
        >
          Staked {stakingToken.symbol}
        </Text>
        {totalStaked && totalStaked.gte(0) ? (
          <Flex height="20px" alignItems="center">
            <Balance fontSize="16px" bold value={totalStakedBalance} decimals={0} unit="" />
          </Flex>
        ) : (
          <Skeleton width="80px" height="16px" />
        )}
      </Pool.CellContent>
    </StyledCell>
  )
}

export default TotalStakedCell
