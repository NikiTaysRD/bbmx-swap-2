import styled from 'styled-components'

import { useAccount } from 'wagmi'
import { Heading, Flex, Image, Text, Link, FlexLayout, Loading, Pool, ViewMode, PageHeader } from '@pancakeswap/uikit'
import { Header } from '@pancakeswap/uikit/src/widgets/Menu/Header'
import { useTranslation } from '@pancakeswap/localization'
import { usePoolsPageFetch, usePoolsWithVault } from 'state/pools/hooks'
import Page, { StyledPage } from 'components/Layout/Page'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { ChainId, Token } from '@pancakeswap/sdk'
import { TokenPairImage } from 'components/TokenImage'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { V3SubgraphHealthIndicator } from 'components/SubgraphHealthIndicator'
import VCakeModal from 'views/Pools/components/RevenueSharing/JoinRevenueModal/VCakeModal'

import CardActions from './components/PoolCard/CardActions'
import AprRow from './components/PoolCard/AprRow'
import CardFooter from './components/PoolCard/CardFooter'
import CakeVaultCard from './components/CakeVaultCard'
import PoolControls from './components/PoolControls'
import PoolRow, { VaultPoolRow } from './components/PoolsTable/PoolRow'

const CardLayout = styled(FlexLayout)`
  justify-content: center;
`

const FinishedTextContainer = styled(Flex)`
  padding-bottom: 32px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const FinishedTextLink = styled(Link)`
  font-weight: 400;
  white-space: nowrap;
  text-decoration: underline;
`

const StyledHeadingH3 = styled(Heading)`
  font-size: 24px;
  color: #ffffff;
`
const StyledHeadingText = styled(Heading)`
  font-size: 15px;
  color: #a0a3c4;
`

const StyledPageHeader = styled(PageHeader)`
  background: none;
  padding-bottom: 0;
`

const Background = styled.div`
  background-color: #101124;

  ${StyledPage} {
    padding-top: 0;
  }
`

const FlexHeaderWrapper = styled(Flex)`
  background: rgba(78, 9, 248, 0.08);
  padding: 20px 30px;
  border-radius: 12px;
`

const Pools: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()
  const { pools, userDataLoaded } = usePoolsWithVault()

  usePoolsPageFetch()

  return (
    <Background>
      <div style={{ height: '110px' }}>
        <Header />
      </div>

      <VCakeModal />
      <StyledPageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <FlexHeaderWrapper flex="1" flexDirection="column" mr={['8px', 0]}>
            <StyledHeadingH3 as="h3" scale="xxl" color="secondary" mb="24px">
              {t('Syrup Pools')}
            </StyledHeadingH3>
            <StyledHeadingText scale="md" color="text">
              {t('Just stake some tokens to earn.')}
            </StyledHeadingText>
            <StyledHeadingText scale="md" color="text">
              {t('High APR, low risk.')}
            </StyledHeadingText>
          </FlexHeaderWrapper>
        </Flex>
      </StyledPageHeader>
      <Page>
        <PoolControls pools={pools}>
          {({ chosenPools, viewMode, stakedOnly, normalizedUrlSearch, showFinishedPools }) => (
            <>
              {showFinishedPools && chainId === ChainId.BSC && (
                <FinishedTextContainer>
                  <Text fontSize={['16px', null, '20px']} color="failure" pr="4px">
                    {t('Looking for v1 CAKE syrup pools?')}
                  </Text>
                  <FinishedTextLink
                    href="https://v1-farms.pancakeswap.finance/pools/history"
                    fontSize={['16px', null, '20px']}
                    color="failure"
                  >
                    {t('Go to migration page')}.
                  </FinishedTextLink>
                </FinishedTextContainer>
              )}
              {account && !userDataLoaded && stakedOnly && (
                <Flex justifyContent="center" mb="4px">
                  <Loading />
                </Flex>
              )}
              {viewMode === ViewMode.CARD ? (
                <CardLayout>
                  {chosenPools.map((pool) =>
                    pool.vaultKey ? (
                      <CakeVaultCard key={pool.vaultKey} pool={pool} showStakedOnly={stakedOnly} />
                    ) : (
                      <Pool.PoolCard<Token>
                        key={pool.sousId}
                        pool={pool}
                        isStaked={Boolean(pool?.userData?.stakedBalance?.gt(0))}
                        cardContent={
                          account ? (
                            <CardActions pool={pool} stakedBalance={pool?.userData?.stakedBalance} />
                          ) : (
                            <>
                              <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                                {t('Start earning')}
                              </Text>
                              <ConnectWalletButton />
                            </>
                          )
                        }
                        tokenPairImage={
                          <TokenPairImage
                            primaryToken={pool.earningToken}
                            secondaryToken={pool.stakingToken}
                            width={64}
                            height={64}
                          />
                        }
                        cardFooter={<CardFooter pool={pool} account={account} />}
                        aprRow={<AprRow pool={pool} stakedBalance={pool?.userData?.stakedBalance} />}
                      />
                    ),
                  )}
                </CardLayout>
              ) : (
                <Pool.PoolsTable>
                  {chosenPools.map((pool) =>
                    pool.vaultKey ? (
                      <VaultPoolRow
                        initialActivity={normalizedUrlSearch.toLowerCase() === pool.earningToken.symbol?.toLowerCase()}
                        key={pool.vaultKey}
                        vaultKey={pool.vaultKey}
                        account={account}
                      />
                    ) : (
                      <PoolRow
                        initialActivity={normalizedUrlSearch.toLowerCase() === pool.earningToken.symbol?.toLowerCase()}
                        key={pool.sousId}
                        sousId={pool.sousId}
                        account={account}
                      />
                    ),
                  )}
                </Pool.PoolsTable>
              )}
              {/* <Image */}
              {/*  mx="auto" */}
              {/*  mt="12px" */}
              {/*  src="/images/decorations/3d-syrup-bunnies.png" */}
              {/*  alt="Pancake illustration" */}
              {/*  width={192} */}
              {/*  height={184.5} */}
              {/* /> */}
            </>
          )}
        </PoolControls>
        <V3SubgraphHealthIndicator />
      </Page>
    </Background>
  )
}

export default Pools
