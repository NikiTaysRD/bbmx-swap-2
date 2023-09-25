import { useTranslation } from '@pancakeswap/localization'
import { Card, Flex, Heading } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useMemo } from 'react'
import {
  useAllTokenDataSWR,
  useMultiChainPath,
  useProtocolChartDataSWR,
  useProtocolDataSWR,
  useProtocolTransactionsSWR,
} from 'state/info/hooks'
import styled from 'styled-components'
import BarChart from 'views/Info/components/InfoCharts/BarChart'
import LineChart from 'views/Info/components/InfoCharts/LineChart'
import PoolTable from 'views/Info/components/InfoTables/PoolsTable'
import TokenTable from 'views/Info/components/InfoTables/TokensTable'
import TransactionTable from 'views/Info/components/InfoTables/TransactionsTable'
import { v3InfoPath } from 'views/V3Info/constants'
import { useRouter } from 'next/router'
import HoverableChart from '../components/InfoCharts/HoverableChart'
import { usePoolsData } from '../hooks/usePoolsData'

const VersionSelectContainer = styled.div`
  height: 35px;
  width: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
`

const VersionSelectWrapper = styled.div<{ isV3?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    border-radius: ${({ isV3 }) => (isV3 ? '6px 0 0 6px' : '0 6px 6px 0')};
  }
`

const VersionSelectLink = styled.a<{ isActive?: boolean }>`
  background: ${({ isActive }) => isActive && '#4e09f8'};

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const ChartCardsContainer = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 0;
  gap: 1em;

  & > * {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const Overview: React.FC<React.PropsWithChildren> = () => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()

  const protocolData = useProtocolDataSWR()
  const chartData = useProtocolChartDataSWR()
  const transactions = useProtocolTransactionsSWR()
  const chainPath = useMultiChainPath()

  const currentDate = useMemo(
    () => new Date().toLocaleString(locale, { month: 'short', year: 'numeric', day: 'numeric' }),
    [locale],
  )

  const allTokens = useAllTokenDataSWR()

  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((token) => token.data)
      .filter((token) => token.name !== 'unknown')
  }, [allTokens])

  const { poolsData } = usePoolsData()

  const somePoolsAreLoading = useMemo(() => {
    return poolsData.some((pool) => !pool?.token0Price)
  }, [poolsData])

  const router = useRouter()
  const isV3 = router?.pathname?.includes(v3InfoPath)

  return (
    <Page>
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Heading scale="lg" mb="16px" id="info-overview-title">
          BBMX Info & Analytics
        </Heading>

        <VersionSelectContainer>
          <VersionSelectWrapper isV3={isV3}>
            <VersionSelectLink href={`/info/v3${chainPath}`} isActive={isV3}>
              V3
            </VersionSelectLink>
          </VersionSelectWrapper>
          <VersionSelectWrapper isV3={isV3}>
            <VersionSelectLink href={`/info${chainPath}`} isActive={!isV3}>
              V2
            </VersionSelectLink>
          </VersionSelectWrapper>
        </VersionSelectContainer>
      </Flex>
      <ChartCardsContainer>
        <Card borderBackground="none">
          <HoverableChart
            chartData={chartData}
            protocolData={protocolData}
            currentDate={currentDate}
            valueProperty="liquidityUSD"
            title={t('Liquidity')}
            ChartComponent={LineChart}
          />
        </Card>
        <Card borderBackground="none">
          <HoverableChart
            chartData={chartData}
            protocolData={protocolData}
            currentDate={currentDate}
            valueProperty="volumeUSD"
            title={t('Volume')}
            ChartComponent={BarChart}
          />
        </Card>
      </ChartCardsContainer>
      <Heading scale="lg" mt="40px" mb="16px">
        {t('Top Tokens')}
      </Heading>
      <TokenTable tokenDatas={formattedTokens} />
      <Heading scale="lg" mt="40px" mb="16px">
        {t('Top Pairs')}
      </Heading>
      <PoolTable poolDatas={poolsData} loading={somePoolsAreLoading} />
      <Heading scale="lg" mt="40px" mb="16px">
        {t('Transactions')}
      </Heading>
      <TransactionTable transactions={transactions} />
    </Page>
  )
}

export default Overview
