import styled from 'styled-components'
import { Skeleton, Text, Flex, Box, useModal, useMatchBreakpoints, Balance, Pool } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { PoolCategory } from 'config/constants/types'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from '@pancakeswap/utils/formatBalance'
import { useTranslation } from '@pancakeswap/localization'
import { Token } from '@pancakeswap/sdk'
import { baseDisplay } from 'pages/_app'
import CollectModal from '../../Modals/CollectModal'

interface EarningsCellProps {
  pool: Pool.DeserializedPool<Token>
  account: string
}

const StyledCell = styled(Pool.BaseCell)`
  flex: 4.5;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 40px;
  }
`

const EarningsCell: React.FC<React.PropsWithChildren<EarningsCellProps>> = ({ pool, account }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { sousId, earningToken, poolCategory, userData, earningTokenPrice } = pool

  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)
  const hasEarnings = account && earnings.gt(0)
  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)
  const isBnbPool = poolCategory === PoolCategory.BINANCE

  const labelText = t('%asset% Earned', { asset: earningToken.symbol })

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningTokenSymbol={earningToken.symbol}
      earningsDollarValue={earningTokenDollarBalance}
      sousId={sousId}
      isBnbPool={isBnbPool}
    />,
  )

  const handleEarningsClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onPresentCollect()
  }

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
          {labelText}
        </Text>
        {!pool.userDataLoaded && account ? (
          <Skeleton width="80px" height="16px" />
        ) : (
          <>
            <Flex>
              <Box mr="8px" height="32px" onClick={hasEarnings ? handleEarningsClick : undefined}>
                <Balance
                  mt="4px"
                  bold={!isMobile}
                  fontSize={isMobile ? '14px' : '16px'}
                  color="white"
                  decimals={0}
                  value={hasEarnings ? earningTokenBalance : 0}
                />
                {hasEarnings ? (
                  <>
                    {earningTokenPrice > 0 && (
                      <Balance
                        display="inline"
                        fontSize="12px"
                        color="textSubtle"
                        decimals={2}
                        prefix="~"
                        value={earningTokenDollarBalance}
                        unit=" USD"
                        fontWeight={600}
                      />
                    )}
                  </>
                ) : (
                  <></>
                )}
              </Box>
            </Flex>
          </>
        )}
      </Pool.CellContent>
    </StyledCell>
  )
}

export default EarningsCell
