import styled from 'styled-components'
import { Flex, FlexGap, Grid, PageSection, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import { useTranslation } from '@pancakeswap/localization'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { ChainId } from '@pancakeswap/sdk'
import Hero from './components/Hero'
import { swapSectionData, earnSectionData, cakeSectionData } from './components/SalesSection/data'
import MetricsSection from './components/MetricsSection'
import SalesSection from './components/SalesSection'
import WinSection from './components/WinSection'
import FarmsPoolsRow from './components/FarmsPoolsRow'
import Footer from './components/Footer'
import CakeDataRow from './components/CakeDataRow'
import { WedgeTopLeft, InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopRight } from './components/WedgeSvgs'
import UserBanner from './components/UserBanner'
import MultipleBanner from './components/Banners/MultipleBanner'
import HomeCard from './components/Card'

import FirstIcon from '../../../public/images/home/icon-1.png'
import SecondIcon from '../../../public/images/home/icon-2.png'
import ThirdIcon from '../../../public/images/home/icon-3.png'
import FourthIcon from '../../../public/images/home/icon-4.png'
import FifthIcon from '../../../public/images/home/icon-5.png'
import SixthIcon from '../../../public/images/home/icon-6.png'
import BaseLogo from '../../../public/images/home/base-logo.png'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const UserBannerWrapper = styled(Container)`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 0px;
  padding-right: 0px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const HomePageSection = styled(PageSection)`
  max-width: 100%;
`

const GradientHeader = styled.p`
  font-size: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: -webkit-linear-gradient(bottom, transparent 0%, #4e09f8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
`

const FeatureText = styled.p`
  font-size: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding-bottom: 15px;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 64px;
  }
`

const BuildingInfo = styled(FlexGap)`
  font-size: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: white;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 64px;
  }
`

const BuildingText = styled.p`
  font-size: 20px;
  line-height: 32px;

  color: #a0a3c4;
`

const Home: React.FC<React.PropsWithChildren> = () => {
  const { theme } = useTheme()
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()

  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }

  const { t } = useTranslation()
  const { isDesktop } = useMatchBreakpoints()

  return (
    <>
      {/* <style jsx global>
        {`
          #home-1 .page-bg {
            background: linear-gradient(139.73deg, #e6fdff 0%, #f3efff 100%);
          }
          [data-theme='dark'] #home-1 .page-bg {
            background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0%, #191326 100%);
          }
          #home-2 .page-bg {
            background: linear-gradient(180deg, #ffffff 22%, #d7caec 100%);
          }
          [data-theme='dark'] #home-2 .page-bg {
            background: linear-gradient(180deg, #09070c 22%, #201335 100%);
          }
          #home-3 .page-bg {
            background: linear-gradient(180deg, #6fb6f1 0%, #eaf2f6 100%);
          }
          [data-theme='dark'] #home-3 .page-bg {
            background: linear-gradient(180deg, #0b4576 0%, #091115 100%);
          }
          #home-4 .inner-wedge svg {
            fill: #d8cbed;
          }
          [data-theme='dark'] #home-4 .inner-wedge svg {
            fill: #201335;
          }
        `}
      </style>
      <StyledHeroSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home-1',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        {account && chainId === ChainId.BSC && (
          <UserBannerWrapper>
            <UserBanner />
          </UserBannerWrapper>
        )}
        <MultipleBanner />
        <Hero />
      </StyledHeroSection>
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home-2',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <MetricsSection />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={theme.colors.background}
        containerProps={{
          id: 'home-4',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <OuterWedgeWrapper>
          <InnerWedgeWrapper top>
            <WedgeTopLeft />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper>
        <SalesSection {...swapSectionData(t)} />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={theme.colors.gradientCardHeader}
        index={2}
        hasCurvedDivider={false}
      >
        <OuterWedgeWrapper>
          <InnerWedgeWrapper width="150%" top>
            <WedgeTopRight />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper>
        <SalesSection {...earnSectionData(t)} />
        <FarmsPoolsRow />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        containerProps={{
          id: 'home-3',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <WinSection />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={theme.colors.background}
        index={2}
        hasCurvedDivider={false}
      >
        <SalesSection {...cakeSectionData(t)} />
        <CakeDataRow />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background="linear-gradient(180deg, #7645D9 0%, #5121B1 100%)"
        index={2}
        hasCurvedDivider={false}
      >
        <Footer />
      </PageSection> */}

      <HomePageSection background="#101124" pt="200px" index={2} hasCurvedDivider={false}>
        <FlexGap gap="10px" flexDirection="column" justifyContent="center" alignItems="center" mb="80px">
          <GradientHeader>BBMX</GradientHeader>
          <FeatureText>FULLY FEATURED</FeatureText>
        </FlexGap>

        <Grid
          gridTemplateColumns={`${isDesktop ? '1fr 1fr 1fr' : '1fr'}`}
          gridTemplateRows={`${isDesktop ? '1fr 1fr' : '1fr'}`}
          gridGap="15px"
          justifyItems="center"
          alignItems="center"
        >
          <HomeCard header="BBMXSwap" image={FirstIcon}>
            An advanced Dex that offers both AMM and CLMM for Base DeFi. With one of the cheapest fee structures and
            non-inflationary liquidity incentives in the market, BBMX is built to last.
            <br />
            It&apos;s a community, not a business.
          </HomeCard>

          <HomeCard header="BBMX Futures" image={SecondIcon}>
            A decentralized perpetual exchange on the Base blockchain that enables direct futures trading of top BaseGem
            from your wallet. We are taking inspiration from GMX and trying to best it on Base.
          </HomeCard>

          <HomeCard header="Smart Stake" image={ThirdIcon}>
            built-for-all universal staking dApp to help boost liquidity for anyone and anywhere on the Base Blockchain
            <br />
            Smart Stake allows anyone to create a single staking or a Farming pool at a fraction of the actual
            development cost using the$BBMX token
          </HomeCard>

          <HomeCard header="Smart Locker" image={FourthIcon}>
            A user-friendly and cost-effective smart contract locker, that allows easy locking of liquidity, tokens, or
            creation of vesting contracts with just a few clicks.
          </HomeCard>

          <HomeCard header="BBMXStarter" image={FifthIcon}>
            A state-of-the-art Launchpad created to support and nurture top-of-the-line projects on BaseChain
            <br />
            We will be co-partnering with top launchpads on Base to bring the best projects to the BBMX community.
          </HomeCard>

          <HomeCard header="BBMX Dao" image={SixthIcon}>
            BBMX&apos;s very own DAO, employing an on-chain governance process using the BBMX token to oversee and
            manage the Protocol.
            <br />A lot of key decisions will be planned and executed with the help of our loyal community of BBMX
            holders.
          </HomeCard>
        </Grid>
      </HomePageSection>

      <HomePageSection background="#1B1C30" index={3} hasCurvedDivider={false}>
        <FlexGap
          gap="20px"
          flexDirection={`${isDesktop ? 'row' : 'column'}`}
          justifyContent={`${isDesktop ? 'space-between' : 'center'}`}
          alignItems={`${!isDesktop && 'center'}`}
        >
          <Flex flexDirection="column" width={`${isDesktop ? '55%' : '100%'}`} alignItems={`${!isDesktop && 'center'}`}>
            <BuildingInfo
              gap="10px"
              flexDirection="column"
              justifyContent="center"
              mb={`${isDesktop ? '80px' : '20px'}`}
              width={`${isDesktop ? '50%' : '60%'}`}
            >
              <p>BUILDING</p>
              <FeatureText>
                <span style={{ color: '#4E09F8' }}>BASE</span> DEFI
              </FeatureText>
            </BuildingInfo>

            <BuildingText>
              BBMX is contributing in Base efforts to help onboard billion users to blockchain. Building the best of
              Ethereum and offering it at 10x cheaper cost.
            </BuildingText>
          </Flex>

          <Flex alignItems="center" width={`${isDesktop ? '30%' : '50%'}`}>
            <img src={BaseLogo.src} alt="" />
          </Flex>
        </FlexGap>
      </HomePageSection>
    </>
  )
}

export default Home
