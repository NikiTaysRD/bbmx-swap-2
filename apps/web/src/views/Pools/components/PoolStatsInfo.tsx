import { Flex, LinkExternal, Text, Pool, ScanLink, FlexGap } from '@pancakeswap/uikit'
import AddToWalletButton, { AddToWalletTextOptions } from 'components/AddToWallet/AddToWalletButton'
import { useTranslation } from '@pancakeswap/localization'
import { Token } from '@pancakeswap/sdk'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { memo, useMemo } from 'react'
import { useCurrentBlock } from 'state/block/hooks'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { VaultKey } from 'state/types'
import { getVaultPoolAddress } from 'utils/addressHelpers'
import { getPoolBlockInfo } from 'views/Pools/helpers'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { getBlockExploreLink } from 'utils'
import { getTokenInfoPath } from 'state/info/utils'
import { baseDisplay } from 'pages/_app'
import styled from 'styled-components'
import MaxStakeRow from './MaxStakeRow'
import { DurationAvg, PerformanceFee, TotalLocked } from './Stat'

interface ExpandedFooterProps {
  pool: Pool.DeserializedPool<Token>
  account: string
  showTotalStaked?: boolean
  alignLinksToRight?: boolean
}

const StyledLinkExternal = styled(LinkExternal)`
  font-size: 12px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 14px;
  }

  line-height: 160%;
  transition: 0.3s all;
  &:hover {
    color: #4e09f8;
  }
`

const StyledScanLink = styled(ScanLink)`
  font-size: 12px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 14px;
  }
  line-height: 160%;
  transition: 0.3s all;

  &:hover {
    color: #4e09f8;
  }
`

const PoolStatsInfo: React.FC<React.PropsWithChildren<ExpandedFooterProps>> = ({
  pool,
  account,
  showTotalStaked = true,
  alignLinksToRight = true,
}) => {
  const { t } = useTranslation()
  const currentBlock = useCurrentBlock()
  const { chainId } = useActiveChainId()

  const {
    stakingToken,
    earningToken,
    totalStaked,
    startTimestamp,
    endTimestamp,
    stakingLimit,
    stakingLimitEndTimestamp,
    contractAddress,
    vaultKey,
    profileRequirement,
    isFinished,
    userData: poolUserData,
  } = pool

  const stakedBalance = poolUserData?.stakedBalance ? poolUserData.stakedBalance : BIG_ZERO

  const {
    totalCakeInVault,
    totalLockedAmount,
    fees: { performanceFeeAsDecimal },
    userData,
  } = useVaultPoolByKey(vaultKey)

  const tokenAddress = earningToken.address || ''
  const poolContractAddress = contractAddress
  const cakeVaultContractAddress = getVaultPoolAddress(vaultKey)

  const { shouldShowBlockCountdown, timeUntilStart, timeRemaining, hasPoolStarted } = getPoolBlockInfo(
    pool,
    currentBlock,
  )
  const tokenInfoPath = useMemo(() => getTokenInfoPath(chainId, earningToken.address), [chainId, earningToken.address])

  return (
    <>
      {profileRequirement && (profileRequirement.required || profileRequirement.thresholdPoints.gt(0)) && (
        <Flex mb="8px" justifyContent="space-between">
          <Text small>{t('Requirement')}:</Text>
          <Text small textAlign="right">
            {profileRequirement.required && t('Pancake Profile')}{' '}
            {profileRequirement.thresholdPoints.gt(0) && (
              <Text small>
                {profileRequirement.thresholdPoints.toNumber()} {t('Profile Points')}
              </Text>
            )}
          </Text>
        </Flex>
      )}
      {/* {!vaultKey && <AprInfo pool={pool} stakedBalance={stakedBalance} />} */}
      {showTotalStaked && (
        <Pool.TotalStaked
          totalStaked={vaultKey ? totalCakeInVault : totalStaked}
          tokenDecimals={stakingToken.decimals}
          symbol={stakingToken.symbol}
          decimalsToShow={0}
        />
      )}
      {vaultKey === VaultKey.CakeVault && <TotalLocked totalLocked={totalLockedAmount} lockedToken={stakingToken} />}
      {vaultKey === VaultKey.CakeVault && <DurationAvg />}
      {!isFinished && stakingLimit && stakingLimit.gt(0) && (
        <MaxStakeRow
          small
          currentBlock={currentBlock}
          hasPoolStarted={hasPoolStarted}
          stakingLimit={stakingLimit}
          stakingLimitEndTimestamp={stakingLimitEndTimestamp}
          stakingToken={stakingToken}
          endTimestamp={endTimestamp}
        />
      )}
      {vaultKey && <PerformanceFee userData={userData} performanceFeeAsDecimal={performanceFeeAsDecimal} />}
      <FlexGap gap="10px" width="100%" justifyContent="space-around">
        <Flex mb="2px" justifyContent="center" width="33.3%" borderRight="1px solid rgba(255,255,255,0.15)">
          <StyledLinkExternal
            href={tokenInfoPath}
            bold={false}
            small
            showExternalIcon={false}
            color="#a0a3c4"
            className={baseDisplay.className}
          >
            {t('See Token Info')}
          </StyledLinkExternal>
        </Flex>
        {!vaultKey && (
          <Flex mb="2px" justifyContent="center" width="33.3%" borderRight="1px solid rgba(255,255,255,0.15)">
            <StyledLinkExternal
              href={earningToken.projectLink}
              bold={false}
              small
              showExternalIcon={false}
              color="#a0a3c4"
              className={baseDisplay.className}
            >
              {t('View Project Site')}
            </StyledLinkExternal>
          </Flex>
        )}
        {poolContractAddress && (
          <Flex mb="2px" justifyContent="center" width="33.3%" borderRight="1px solid rgba(255,255,255,0.15)">
            <StyledScanLink
              href={getBlockExploreLink(vaultKey ? cakeVaultContractAddress : poolContractAddress, 'address', chainId)}
              bold={false}
              small
              showIcons={false}
              color="#a0a3c4"
              className={baseDisplay.className}
            >
              {t('View Contract')}
            </StyledScanLink>
          </Flex>
        )}
      </FlexGap>
      {/* {vaultKey && ( */}
      {/*  <Flex mb="2px" justifyContent={alignLinksToRight ? 'flex-end' : 'flex-start'}> */}
      {/*    <LinkExternal href="https://docs.pancakeswap.finance/products/syrup-pool/new-cake-pool" bold={false} small> */}
      {/*      {t('View Tutorial')} */}
      {/*    </LinkExternal> */}
      {/*  </Flex> */}
      {/* )} */}
      {account && tokenAddress && (
        <Flex justifyContent={alignLinksToRight ? 'flex-end' : 'flex-start'}>
          <AddToWalletButton
            variant="text"
            p="0"
            height="auto"
            style={{ fontSize: '14px', fontWeight: '400', lineHeight: 'normal' }}
            marginTextBetweenLogo="4px"
            textOptions={AddToWalletTextOptions.TEXT}
            tokenAddress={tokenAddress}
            tokenSymbol={earningToken.symbol}
            tokenDecimals={earningToken.decimals}
            tokenLogo={`https://tokens.pancakeswap.finance/images/${tokenAddress}.png`}
          />
        </Flex>
      )}
    </>
  )
}

export default memo(PoolStatsInfo)
