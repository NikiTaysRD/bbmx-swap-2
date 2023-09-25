import {
  AddIcon,
  Button,
  CardBody,
  CardFooter,
  Text,
  Dots,
  Flex,
  Tag,
  ButtonMenu,
  useModal,
  useMatchBreakpoints,
  FlexGap,
} from '@pancakeswap/uikit'
import { PositionDetails } from '@pancakeswap/farms'
import NextLink from 'next/link'
import styled from 'styled-components'
import { AppBody } from 'components/App'
import { useV3Positions } from 'hooks/v3/useV3Positions'
import { CHAIN_IDS } from 'utils/wagmi'
import PositionListItem from 'views/AddLiquidityV3/formViews/V3FormView/components/PoolListItem'
import Page from 'views/Page'
import { useTranslation } from '@pancakeswap/localization'
import { Pair } from '@pancakeswap/sdk'
import { RangeTag } from 'components/RangeTag'
import useV2PairsByAccount from 'hooks/useV2Pairs'
import useStableConfig, {
  LPStablePair,
  StableConfigContext,
  useLPTokensWithBalanceByAccount,
} from 'views/Swap/hooks/useStableConfig'
import { useMemo, useState } from 'react'
import { V2PairCard } from 'views/AddLiquidityV3/components/V2PairCard'
import { StablePairCard } from 'views/AddLiquidityV3/components/StablePairCard'
import TransactionsModal from 'components/App/Transactions/TransactionsModal'
import { LiquidityCardRow } from 'components/LiquidityCardRow'
import atomWithStorageWithErrorCatch from 'utils/atomWithStorageWithErrorCatch'
import { useAtom } from 'jotai'
import { FindOtherLP } from '@pancakeswap/uikit/src/widgets/Liquidity'
import { V3SubgraphHealthIndicator } from 'components/SubgraphHealthIndicator'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import LiquidityBox from '@pancakeswap/uikit/src/components/Svg/Icons/LiquidityBox'
import { baseDisplay } from 'pages/_app'

const Body = styled(CardBody)`
  background-color: #1b1c30;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StableContextProvider = (props: { pair: LPStablePair; account: string }) => {
  const stableConfig = useStableConfig({
    tokenA: props.pair?.token0,
    tokenB: props.pair?.token1,
  })

  if (!stableConfig.stableSwapConfig) return null

  return (
    <StableConfigContext.Provider value={stableConfig}>
      <StablePairCard {...props} />
    </StableConfigContext.Provider>
  )
}

enum FILTER {
  ALL = 0,
  V3 = 1,
  V2 = 2,
}

const hideClosePositionAtom = atomWithStorageWithErrorCatch('pcs:hide-close-position', false)

function useHideClosePosition() {
  return useAtom(hideClosePositionAtom)
}

export default function PoolListPage() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  const [selectedTypeIndex, setSelectedTypeIndex] = useState(FILTER.ALL)
  const [hideClosedPositions, setHideClosedPositions] = useHideClosePosition()

  const { positions, loading: v3Loading } = useV3Positions(account)

  const { data: v2Pairs, loading: v2Loading } = useV2PairsByAccount(account)

  const stablePairs = useLPTokensWithBalanceByAccount(account)

  let v2PairsSection = null

  if (v2Pairs?.length) {
    v2PairsSection = v2Pairs.map((pair) => (
      <V2PairCard key={Pair.getAddress(pair.token0, pair.token1)} pair={pair} account={account} />
    ))
  }

  let stablePairsSection = null

  if (stablePairs?.length) {
    stablePairsSection = stablePairs.map((pair) => (
      <StableContextProvider key={pair.lpAddress} pair={pair} account={account} />
    ))
  }

  let v3PairsSection = null

  if (positions?.length) {
    const [openPositions, closedPositions] = positions?.reduce<[PositionDetails[], PositionDetails[]]>(
      (acc, p) => {
        acc[p.liquidity === 0n ? 1 : 0].push(p)
        return acc
      },
      [[], []],
    ) ?? [[], []]

    const filteredPositions = [...openPositions, ...(hideClosedPositions ? [] : closedPositions)]

    v3PairsSection = filteredPositions.map((p) => {
      return (
        <PositionListItem key={p.tokenId.toString()} positionDetails={p}>
          {({
            currencyBase,
            currencyQuote,
            removed,
            outOfRange,
            feeAmount,
            positionSummaryLink,
            subtitle,
            setInverted,
          }) => {
            let token0Symbol = ''
            let token1Symbol = ''
            if (currencyQuote && currencyBase) {
              token0Symbol =
                currencyQuote.symbol.length > 7 ? currencyQuote.symbol.slice(0, 7).concat('...') : currencyQuote.symbol
              token1Symbol =
                currencyBase.symbol.length > 7 ? currencyBase.symbol.slice(0, 7).concat('...') : currencyBase.symbol
            }

            return (
              <LiquidityCardRow
                feeAmount={feeAmount}
                link={positionSummaryLink}
                currency0={currencyQuote}
                currency1={currencyBase}
                tokenId={p.tokenId}
                pairText={
                  !token0Symbol || !token1Symbol ? <Dots>{t('Loading')}</Dots> : `${token0Symbol}-${token1Symbol} LP`
                }
                tags={
                  <>
                    {p.isStaked && (
                      <Tag outline variant="warning" mr="8px">
                        Farming
                      </Tag>
                    )}
                    <RangeTag removed={removed} outOfRange={outOfRange} />
                  </>
                }
                subtitle={subtitle}
                onSwitch={() => setInverted((prev) => !prev)}
              />
            )
          }}
        </PositionListItem>
      )
    })
  }

  const mainSection = useMemo(() => {
    let resultSection = null
    if (v3Loading || v2Loading) {
      resultSection = (
        <Text color="textSubtle" textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      )
    } else if (!v2PairsSection && !stablePairsSection && !v3PairsSection) {
      resultSection = (
        <FlexGap gap="5px" justifyContent="center" flexDirection="column">
          <LiquidityBox />
          <Text
            color="textSubtle"
            textAlign="center"
            style={{ color: '#a0a3c4', fontSize: '15px', lineHeight: '160%' }}
            className={baseDisplay.className}
          >
            {t('Your active liquidity positions will \n appear here.')}
          </Text>
        </FlexGap>
      )
    } else {
      // Order should be v3, stable, v2
      const sections = [v3PairsSection, v2PairsSection]

      resultSection = selectedTypeIndex ? sections.filter((_, index) => selectedTypeIndex === index + 1) : sections
    }

    return resultSection
  }, [selectedTypeIndex, stablePairsSection, t, v2Loading, v2PairsSection, v3Loading, v3PairsSection])

  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  const { isDesktop } = useMatchBreakpoints()

  const StyledAppBody = styled(AppBody)`
    height: 191px;
    background: none;
    div:first-child {
      border-radius: 6px;
    }
  `

  const StyledButtonMenu = styled(ButtonMenu)`
    border-radius: 6px;

    button {
      border-radius: 6px;
    }
  `

  return (
    <Page>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Text fontSize="24px" fontWeight="bold">
            Pools
          </Text>
          <CardFooter
            style={{
              textAlign: 'center',
              borderRadius: '6px',
              borderTop: 'none',
              paddingRight: '0',
              fontWeight: '400',
            }}
          >
            <NextLink href="/add" passHref>
              <Button
                id="join-pool-button"
                width="100%"
                height="30px"
                startIcon={<AddIcon color="white" />}
                style={{
                  borderRadius: '6px',
                  color: 'white',
                  backgroundColor: '#4E09F8',
                  textTransform: 'uppercase',
                }}
              >
                {t('Add Liquidity')}
              </Button>
            </NextLink>
          </CardFooter>
        </Flex>
        <StyledAppBody
          style={{
            maxWidth: '854px',
            width: `${isDesktop && '800px'}`,
            borderRadius: '6px',
          }}
        >
          {/* <AppHeader */}
          {/*  title={t('Your Liquidity')} */}
          {/*  subtitle={t('List of your liquidity positions')} */}
          {/*  IconSlot={ */}
          {/*    <IconButton onClick={onPresentTransactionsModal} variant="text" scale="sm"> */}
          {/*      <HistoryIcon color="textSubtle" width="24px" /> */}
          {/*    </IconButton> */}
          {/*  } */}
          {/*  filter={ */}
          {/*    <> */}
          {/*      <Flex as="label" htmlFor="hide-close-positions" alignItems="center"> */}
          {/*        <Checkbox */}
          {/*          id="hide-close-positions" */}
          {/*          scale="sm" */}
          {/*          name="confirmed" */}
          {/*          type="checkbox" */}
          {/*          checked={hideClosedPositions} */}
          {/*          onChange={() => setHideClosedPositions((prev) => !prev)} */}
          {/*        /> */}
          {/*        <Text ml="8px" color="textSubtle" fontSize="14px"> */}
          {/*          {t('Hide closed positions')} */}
          {/*        </Text> */}
          {/*      </Flex> */}

          {/*      <StyledButtonMenu */}
          {/*        scale="sm" */}
          {/*        activeIndex={selectedTypeIndex} */}
          {/*        onItemClick={(index) => setSelectedTypeIndex(index)} */}
          {/*        variant="subtle" */}
          {/*      > */}
          {/*        <ButtonMenuItem>{t('All')}</ButtonMenuItem> */}
          {/*        <ButtonMenuItem>V3</ButtonMenuItem> */}
          {/*        <ButtonMenuItem>V2</ButtonMenuItem> */}
          {/*      </StyledButtonMenu> */}
          {/*    </> */}
          {/*  } */}
          {/* /> */}

          <Body>
            {mainSection}
            {selectedTypeIndex === FILTER.V2 ? <FindOtherLP /> : null}
          </Body>
          <V3SubgraphHealthIndicator />
        </StyledAppBody>
      </Flex>
    </Page>
  )
}

PoolListPage.chains = CHAIN_IDS
