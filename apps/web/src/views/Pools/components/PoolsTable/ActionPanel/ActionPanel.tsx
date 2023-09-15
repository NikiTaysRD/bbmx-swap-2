import styled, { keyframes, css } from 'styled-components'
import { Box, Flex, Text, useMatchBreakpoints, Pool, BalanceWithLoading, FlexGap } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { getVaultPosition, VaultPosition } from 'utils/cakePool'
import BigNumber from 'bignumber.js'
import { VaultKey, DeserializedLockedCakeVault, DeserializedLockedVaultUser } from 'state/types'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import { Token } from '@pancakeswap/sdk'
import Harvest from './Harvest'
import Stake from './Stake'
import AutoHarvest from './AutoHarvest'
import { VaultPositionTagWithLabel } from '../../Vault/VaultPositionTag'
import YieldBoostRow from '../../LockedPool/Common/YieldBoostRow'
import LockDurationRow from '../../LockedPool/Common/LockDurationRow'
import useUserDataInVaultPresenter from '../../LockedPool/hooks/useUserDataInVaultPresenter'
import CakeVaultApr from './CakeVaultApr'
import PoolStatsInfo from '../../PoolStatsInfo'

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 1000px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 1000px;
  }
  to {
    max-height: 0px;
  }
`

const StyledActionPanel = styled.div<{ expanded: boolean }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: #111227;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  padding: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }

  border-radius: 0 0 12px 12px;
`

const ActionContainer = styled.div<{ isAutoVault?: boolean; hasBalance?: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-wrap: wrap;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: ${({ isAutoVault }) => (isAutoVault ? 'row' : null)};
    align-items: ${({ isAutoVault, hasBalance }) => (isAutoVault ? (hasBalance ? 'flex-start' : 'stretch') : 'center')};
  }
`

interface ActionPanelProps {
  account: string
  pool: Pool.DeserializedPool<Token>
  expanded: boolean
}

const InfoSection = styled(Box)`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;

  padding: 8px 8px;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0;
    flex-basis: 230px;
    ${Text} {
      font-size: 14px;
    }
  }
`

const YieldBoostDurationRow = ({ lockEndTime, lockStartTime }) => {
  const { weekDuration, secondDuration } = useUserDataInVaultPresenter({
    lockEndTime,
    lockStartTime,
  })

  return (
    <>
      <YieldBoostRow secondDuration={secondDuration} />
      <LockDurationRow weekDuration={weekDuration} />
    </>
  )
}

const ActionPanel: React.FC<React.PropsWithChildren<ActionPanelProps>> = ({ account, pool, expanded }) => {
  const { t } = useTranslation()
  const { userData, vaultKey } = pool
  const { isMobile } = useMatchBreakpoints()

  const vaultData = useVaultPoolByKey(vaultKey)
  const {
    userData: {
      balance: { cakeAsBigNumber },
    },
  } = vaultData

  const vaultPosition = getVaultPosition(vaultData.userData)

  const isLocked = (vaultData as DeserializedLockedCakeVault).userData.locked

  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO

  const poolStakingTokenBalance = vaultKey
    ? cakeAsBigNumber.plus(stakingTokenBalance)
    : stakedBalance.plus(stakingTokenBalance)

  const originalLockedAmount = getBalanceNumber(vaultData.userData?.lockedAmount)

  return (
    <StyledActionPanel expanded={expanded}>
      <InfoSection style={{ flexBasis: 'unset', width: '100%' }}>
        {isMobile && vaultKey === VaultKey.CakeVault && isLocked && (
          <Box mb="16px">
            <YieldBoostDurationRow
              lockEndTime={(vaultData as DeserializedLockedCakeVault).userData.lockEndTime}
              lockStartTime={(vaultData as DeserializedLockedCakeVault).userData.lockStartTime}
            />
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
                {t('Original locked amount')}
              </Text>
              <BalanceWithLoading color="text" bold fontSize="16px" value={originalLockedAmount} decimals={2} />
            </Flex>
          </Box>
        )}
        <FlexGap gap="20px" flexDirection="column" alignItems="center" width="100%">
          <ActionContainer style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {isMobile && vaultKey === VaultKey.CakeVault && vaultPosition === VaultPosition.None && (
              <CakeVaultApr pool={pool} userData={vaultData.userData} vaultPosition={vaultPosition} />
            )}
            <Box width={isMobile ? '100%' : '70%'}>
              {pool.vaultKey === VaultKey.CakeVault && (
                <VaultPositionTagWithLabel
                  userData={vaultData.userData as DeserializedLockedVaultUser}
                  width={['auto', , 'fit-content']}
                  ml={['12px', , , , , '32px']}
                />
              )}
              <ActionContainer isAutoVault={!!pool.vaultKey} hasBalance={poolStakingTokenBalance.gt(0)}>
                {pool.vaultKey ? <AutoHarvest pool={pool} /> : <Harvest {...pool} />}
                <Stake pool={pool} />
              </ActionContainer>
            </Box>
          </ActionContainer>

          <Flex flexDirection="column" mb="8px" mt="15px" width="100%" alignItems="center">
            <PoolStatsInfo pool={pool} account={account} showTotalStaked={isMobile} alignLinksToRight={isMobile} />
          </Flex>
        </FlexGap>

        {/* <Flex alignItems="center"> */}
        {/*  <PoolTypeTag vaultKey={vaultKey} isLocked={isLocked} account={account}> */}
        {/*    {(tagTargetRef) => ( */}
        {/*      <Flex ref={tagTargetRef}> */}
        {/*        <HelpIcon ml="4px" width="20px" height="20px" color="textSubtle" /> */}
        {/*      </Flex> */}
        {/*    )} */}
        {/*  </PoolTypeTag> */}
        {/* </Flex> */}
      </InfoSection>
    </StyledActionPanel>
  )
}

export default ActionPanel
