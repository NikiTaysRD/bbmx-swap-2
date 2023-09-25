import { useTranslation } from '@pancakeswap/localization'
import { AutoColumn, Box, Button, Card, Flex, Heading, Text } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import dayjs from 'dayjs'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useTheme from 'hooks/useTheme'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useMultiChainPath } from 'state/info/hooks'
import { baseDisplay } from 'pages/_app'
import { useRouter } from 'next/router'
import { v3InfoPath } from 'views/V3Info/constants'
import BarChart from './components/BarChart/alt'
import { DarkGreyCard } from './components/Card'
import LineChart from './components/LineChart/alt'
import Percent from './components/Percent'
import PoolTable from './components/PoolTable'
import { RowBetween, RowFixed } from './components/Row'
import TokenTable from './components/TokenTable'
import TransactionsTable from './components/TransactionsTable'
import { ChartCardsContainer, MonoSpace, ProtocolWrapper } from './components/shared'
import {
  useProtocolChartData,
  useProtocolData,
  useProtocolTransactionData,
  useTopPoolsData,
  useTopTokensData,
} from './hooks'
import { useTransformedVolumeData } from './hooks/chart'
import { VolumeWindow } from './types'
import { notEmpty } from './utils'
import { getPercentChange } from './utils/data'
import { unixToDate } from './utils/date'
import { formatDollarAmount } from './utils/numbers'

const StyledButton = styled(Button)<{ borderRadius?: 'string' }>`
  border-radius: ${({ borderRadius }) => borderRadius ?? 'unset'};
`

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

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { theme } = useTheme()

  const protocolData = useProtocolData()
  const transactionData = useProtocolTransactionData()
  const topTokensData = useTopTokensData()
  const topPoolsData = useTopPoolsData()
  const chartData = useProtocolChartData()
  const { chainId } = useActiveChainId()
  const { t } = useTranslation()

  const [volumeHover, setVolumeHover] = useState<number | undefined>()
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [leftLabel, setLeftLabel] = useState<string | undefined>()
  const [rightLabel, setRightLabel] = useState<string | undefined>()
  const now = dayjs()

  useEffect(() => {
    setLiquidityHover(undefined)
    setVolumeHover(undefined)
  }, [chainId])

  useEffect(() => {
    if (liquidityHover === undefined && protocolData) {
      setLiquidityHover(protocolData.tvlUSD)
    }
  }, [liquidityHover, protocolData])

  const formattedTvlData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: unixToDate(day.date),
          value: day.tvlUSD,
        }
      })
    }
    return []
  }, [chartData])

  const formattedVolumeData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: unixToDate(day.date),
          value: day.volumeUSD,
        }
      })
    }
    return []
  }, [chartData])

  const weeklyVolumeData = useTransformedVolumeData(chartData, 'week')
  const monthlyVolumeData = useTransformedVolumeData(chartData, 'month')
  const [volumeWindow, setVolumeWindow] = useState(VolumeWindow.daily)

  const router = useRouter()
  const chainPath = useMultiChainPath()
  const isV3 = router?.pathname?.includes(v3InfoPath)

  const formattedTokens = useMemo(() => {
    if (topTokensData)
      return Object.values(topTokensData)
        .map((d) => d)
        .filter(notEmpty)
        .filter((d) => d.tvlUSD > 0)
    return []
  }, [topTokensData])

  const poolDatas = useMemo(() => {
    if (topPoolsData)
      return Object.values(topPoolsData)
        .map((p) => p)
        .filter(notEmpty)
    return []
  }, [topPoolsData])

  const tvlValue = useMemo(() => {
    return formatDollarAmount(liquidityHover, 2, true)
  }, [liquidityHover])

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
          <LineChart
            data={formattedTvlData}
            height={220}
            minHeight={332}
            // color={theme.colors.primary}
            value={liquidityHover}
            label={leftLabel}
            setValue={setLiquidityHover}
            setLabel={setLeftLabel}
            topLeft={
              <AutoColumn gap="4px">
                <Text fontSize="14px" bold className={baseDisplay.className} lineHeight="1.2">
                  {t('TVL')}
                </Text>
                <Text fontSize="1.75em" bold>
                  <MonoSpace>{tvlValue}</MonoSpace>
                </Text>
                <Text fontSize="11px" color="#a0a3c4" lineHeight="160%" className={baseDisplay.className}>
                  <MonoSpace>{leftLabel ?? now.format('MMM D, YYYY')} (UTC)</MonoSpace>
                </Text>
              </AutoColumn>
            }
          />
        </Card>
        <Card borderBackground="none">
          <BarChart
            height={200}
            minHeight={332}
            data={
              volumeWindow === VolumeWindow.monthly
                ? monthlyVolumeData
                : volumeWindow === VolumeWindow.weekly
                ? weeklyVolumeData
                : formattedVolumeData
            }
            color={theme.colors.primary}
            setValue={setVolumeHover}
            setLabel={setRightLabel}
            value={volumeHover}
            label={rightLabel}
            activeWindow={volumeWindow}
            topRight={
              <RowFixed
                style={{
                  marginLeft: '-40px',
                  marginTop: '8px',
                  borderRadius: 'none',
                }}
              >
                <StyledButton
                  scale="sm"
                  variant={volumeWindow === VolumeWindow.daily ? 'primary' : 'infochart'}
                  onClick={() => setVolumeWindow(VolumeWindow.daily)}
                  borderRadius="6px 0 0 6px !important"
                >
                  D
                </StyledButton>
                <StyledButton
                  scale="sm"
                  variant={volumeWindow === VolumeWindow.weekly ? 'primary' : 'infochart'}
                  borderRadius="unset"
                  onClick={() => setVolumeWindow(VolumeWindow.weekly)}
                >
                  W
                </StyledButton>
                <StyledButton
                  variant={volumeWindow === VolumeWindow.monthly ? 'primary' : 'infochart'}
                  scale="sm"
                  borderRadius="0 6px 6px 0 !important"
                  onClick={() => setVolumeWindow(VolumeWindow.monthly)}
                >
                  M
                </StyledButton>
              </RowFixed>
            }
            topLeft={
              <AutoColumn gap="4px">
                <Text fontSize="14px" bold className={baseDisplay.className} lineHeight="1.2">
                  Volume
                </Text>
                <Text fontSize="1.75em" bold>
                  <MonoSpace>
                    {volumeHover
                      ? formatDollarAmount(volumeHover)
                      : formatDollarAmount(formattedVolumeData[formattedVolumeData.length - 1]?.value, 2)}
                  </MonoSpace>
                </Text>
                <Text fontSize="11px" color="#a0a3c4" lineHeight="160%" className={baseDisplay.className}>
                  <MonoSpace>{rightLabel ?? now.format('MMM D, YYYY')} (UTC)</MonoSpace>
                </Text>
              </AutoColumn>
            }
          />
        </Card>
      </ChartCardsContainer>
      <ProtocolWrapper>
        <DarkGreyCard paddingLeft="0 !important" style={{ background: 'none' }}>
          <RowBetween>
            <RowFixed>
              <RowFixed mr="15px">
                <Text mr="4px" fontSize="16px" lineHeight="160%" className={baseDisplay.className}>
                  {t('Volume 24H')}:{' '}
                </Text>
                <Text mr="4px" fontSize="16px" lineHeight="160%" className={baseDisplay.className}>
                  {formatDollarAmount(formattedVolumeData[formattedVolumeData.length - 1]?.value)}
                </Text>
                <Percent
                  value={getPercentChange(
                    formattedVolumeData[formattedVolumeData.length - 1]?.value.toString(),
                    formattedVolumeData[formattedVolumeData.length - 2]?.value.toString(),
                  )}
                  wrap
                />
              </RowFixed>
              <RowFixed mr="15px">
                <Text mr="4px" fontSize="16px" lineHeight="160%" className={baseDisplay.className}>
                  {t('Fees 24H')}:{' '}
                </Text>
                <Text mr="4px" fontSize="16px" lineHeight="160%" className={baseDisplay.className}>
                  {formatDollarAmount(protocolData?.feesUSD)}
                </Text>
                <Percent value={protocolData?.feeChange} wrap />
              </RowFixed>
              <Box>
                <RowFixed mr="15px">
                  <Text mr="4px" fontSize="16px" lineHeight="160%" className={baseDisplay.className}>
                    {t('TVL')}:{' '}
                  </Text>
                  <Text mr="4px" fontSize="16px" lineHeight="160%" className={baseDisplay.className}>
                    {formatDollarAmount(protocolData?.tvlUSD)}
                  </Text>
                  <Percent value={protocolData?.tvlUSDChange} wrap />
                </RowFixed>
              </Box>
            </RowFixed>
          </RowBetween>
        </DarkGreyCard>
      </ProtocolWrapper>
      <Heading scale="lg" mt="40px" mb="16px">
        {t('Top Tokens')}
      </Heading>
      <TokenTable tokenDatas={formattedTokens} />

      <Heading scale="lg" mt="40px" mb="16px">
        {t('Top Pairs')}
      </Heading>
      <PoolTable poolDatas={poolDatas} />
      <Heading scale="lg" mt="40px" mb="16px">
        {t('Transactions')}
      </Heading>

      {transactionData ? <TransactionsTable transactions={transactionData} /> : null}
    </Page>
  )
}
