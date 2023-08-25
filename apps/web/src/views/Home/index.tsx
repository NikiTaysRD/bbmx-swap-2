import styled, { keyframes } from 'styled-components'
import { Flex, FlexGap, Grid, PageSection, useMatchBreakpoints } from '@pancakeswap/uikit'
import HomeCard from './components/Card'

import FirstIcon from '../../../public/images/home/icon-1.png'
import SecondIcon from '../../../public/images/home/icon-2.png'
import ThirdIcon from '../../../public/images/home/icon-3.png'
import FourthIcon from '../../../public/images/home/icon-4.png'
import FifthIcon from '../../../public/images/home/icon-5.png'
import SixthIcon from '../../../public/images/home/icon-6.png'
import BaseLogo from '../../../public/images/home/base-logo.png'
import CheckCircle from '../../../public/images/home/check-circle.svg'
import FormSection from './components/FormSection'
import Header from './components/Header'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

const HomePageSection = styled(PageSection)`
  max-width: 100%;
`

const WideHomePageSection = styled(HomePageSection)<{ maxWidth?: string }>`
  & > * {
    max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : 'unset')};
  }
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

  font-weight: 700;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 64px;
  }
`

const BuildingInfo = styled(FlexGap)`
  font-size: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: white;
  font-weight: 700;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 64px;
  }
`

const BuildingText = styled.p`
  font-size: 20px;
  line-height: 32px;

  color: #a0a3c4;

  width: 95%;
`
const RewardsText = styled.p`
  color: #a0a3c4;
  font-size: 24px;
  line-height: 50px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 45%;
  }
`

const RewardsListItem = styled.p`
  font-size: 20px;
  line-height: 32px;
  color: #a0a3c4;
`

// roadmap start

const Checklist = styled.ul`
  list-style: none;
  position: relative;
`

const ListItem = styled.li`
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 15px;
  position: relative;
  padding-left: 24px;

  &:before {
    background-image: url('path/to/your/icon.svg');
    font-family: 'Font Awesome 6 Free';
    font-weight: 900;
    font-size: 15px;
    position: absolute;
    left: 0;
    top: 1px;
  }

  &.check:before {
    color: #4e09f8;
  }

  &.pending:before {
    content: '\f1da';
    opacity: 0.75;
  }

  @media (max-width: 1680px) {
    font-size: 15px;
    margin-bottom: 12px;
  }

  @media (max-width: 1399.98px) {
    font-size: 12px;
    margin-bottom: 8px;
  }
`

const RoadmapBox = styled.div`
  margin: 0 20px;
  padding: 30px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);

  p {
    font-size: 15px;
    color: #a0a3c4;
    line-height: 30px;
  }
`

const RoadmapContainer = styled.div`
  positiom: relative;
`

const barAnimation = keyframes`
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 50px 50px;
    }
`

const RoadmapItem = styled.div`
  position: relative;
  color: #fff;

  &.active h4,
  &.upcoming h4 {
    text-align: center;
    font-style: normal;
    font-size: 22px;
    font-weight: 700;
    line-height: 100%;
    margin-bottom: 10px;
    color: #4e09f8;
  }

  & .poster span {
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & .meter {
    width: 100%;
    height: 10px;
    position: absolute;
    left: 50%;
    top: 48px;
    z-index: -1;
    background-color: #4e09f8;
  }

  &.active .poster {
    background-color: #4e09f8;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  }

  &.upcoming .poster {
    background: #e7e7e3;
  }

  &.active .meter {
    background: linear-gradient(135deg, #4e09f8 25%, #7f4ff3 25%, #7f4ff3 50%, #4e09f8 50%, #4e09f8 75%, #7f4ff3 75%);
    background-size: 25px 25px;
    animation: ${barAnimation} 3s linear infinite;
  }

  &.upcoming .meter {
    background: linear-gradient(135deg, #fff 25%, #e7e7e3 25%, #e7e7e3 50%, #fff 50%, #fff 75%, #e7e7e3 75%);
    background-size: 25px 25px;
    animation: ${barAnimation} 3s linear infinite;
  }

  &.last .meter {
    display: none;
  }
`

const Poster = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 60px;
  background-color: #4e09f8;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
`

// end of roadmap

const Home: React.FC<React.PropsWithChildren> = () => {
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
      <Header />
      <FormSection />
      <WideHomePageSection background="#101124" index={2} hasCurvedDivider={false}>
        <FlexGap gap="10px" flexDirection="column" justifyContent="center" alignItems="center" mb="80px" pt="150px">
          <GradientHeader>BBMX</GradientHeader>
          <FeatureText>FULLY FEATURED</FeatureText>
        </FlexGap>

        <Grid
          gridTemplateColumns={`${isDesktop ? '1fr 1fr 1fr' : '1fr'}`}
          gridTemplateRows={`${isDesktop ? '1fr 1fr' : '1fr'}`}
          gridGap="15px"
          justifyItems="center"
          alignItems="center"
          gridColumnGap="25px"
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
      </WideHomePageSection>

      <WideHomePageSection background="#1B1C30" index={3} hasCurvedDivider={false} maxWidth="1300">
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
              width={`${isDesktop ? '55%' : '60%'}`}
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
      </WideHomePageSection>

      <HomePageSection background="#101124" pt="200px" index={2} hasCurvedDivider={false}>
        <FlexGap gap="10px" flexDirection="column" justifyContent="center" alignItems="center" mb="80px">
          <GradientHeader>HOLD BBMX &</GradientHeader>
          <FeatureText>EARN REWARDS</FeatureText>
        </FlexGap>

        <FlexGap
          gap="50px"
          justifyContent="space-around"
          alignItems="flex-start"
          flexDirection={`${isDesktop ? 'row' : 'column'}`}
        >
          <RewardsText>
            $BBMX is our utility and governance token, pivotal to the BBMX protocol. It unlocks the full potential of
            all BBMX products and will be instrumental in guiding the protocol&apos;s growth
          </RewardsText>

          <FlexGap gap="5px" flexDirection="column" justifyContent="center">
            <RewardsListItem>Turn off swapping fees by holding BBMX</RewardsListItem>
            <RewardsListItem>Considerably reduce Futures trading fees</RewardsListItem>
            <RewardsListItem>Claim a portion of protocol’s revenue via Real Yield</RewardsListItem>
            <RewardsListItem>Unlock Smart stake using $BBMX</RewardsListItem>
            <RewardsListItem>Get access to Tier-1 project on BBMXStarter</RewardsListItem>

            <Flex alignItems="center" justifyContent="center">
              <p style={{ fontSize: '16px', color: '#a0a3c4', lineHeight: '32px' }}>
                Thats not it, there’s more coming as we progress
              </p>
            </Flex>
          </FlexGap>
        </FlexGap>
      </HomePageSection>

      <HomePageSection background="#101124" pt="200px" index={3} hasCurvedDivider={false}>
        <FlexGap gap="10px" flexDirection="column" justifyContent="center" alignItems="center" mb="80px">
          <GradientHeader>BBMX JOURNEY</GradientHeader>
          <FeatureText>ROADMAP</FeatureText>
        </FlexGap>

        <RoadmapContainer>
          <Swiper
            style={innerWidth < 1200 ? { width: innerWidth - 50 } : {}}
            slidesPerView={innerWidth > 1200 ? 3 : 1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <RoadmapItem className="active">
                <h4>Phase 1</h4>
                <Poster>
                  <span></span>
                </Poster>
                <div className="meter">
                  <span></span>
                </div>
                <RoadmapBox>
                  <Checklist>
                    <ListItem>Detailed roadmap</ListItem>
                    <ListItem>Website update</ListItem>
                    <ListItem>Whitepaper launch</ListItem>
                    <ListItem>BBMXSwap (Goreli testnet)</ListItem>
                    <ListItem>BBMXSwap (Mainnet)</ListItem>
                    <ListItem>Super Stake (Mainnet)</ListItem>
                    <ListItem>Real yield for BBMX holders</ListItem>
                  </Checklist>
                </RoadmapBox>
              </RoadmapItem>
            </SwiperSlide>

            <SwiperSlide>
              <RoadmapItem className="upcoming">
                <h4>Phase 2</h4>
                <Poster>
                  <span></span>
                </Poster>
                <div className="meter">
                  <span></span>
                </div>
                <RoadmapBox>
                  <Checklist>
                    <ListItem>BBMX Futures early access (Testnet Beta)</ListItem>
                    <ListItem>BBMX Futures public access (Testnet Beta)</ListItem>
                    <ListItem>BBMX Futures public access (Mainnet Beta)</ListItem>
                    <ListItem>BBMXStarter (Launchpad)</ListItem>
                    <ListItem>BBMX Futures New trading assets</ListItem>
                    <ListItem>Futures Trading contest</ListItem>
                    <ListItem>BBMX Buybacks</ListItem>
                  </Checklist>
                </RoadmapBox>
              </RoadmapItem>
            </SwiperSlide>

            <SwiperSlide>
              <RoadmapItem className="upcoming last">
                <h4>Phase 3 Mainnet launch</h4>
                <Poster>
                  <span></span>
                </Poster>
                <div className="meter">
                  <span></span>
                </div>
                <RoadmapBox>
                  <Checklist>
                    <ListItem>(Details to be announced)</ListItem>
                  </Checklist>
                </RoadmapBox>
              </RoadmapItem>
            </SwiperSlide>
          </Swiper>
        </RoadmapContainer>
      </HomePageSection>
    </>
  )
}

export default Home
