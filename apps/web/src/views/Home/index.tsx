import styled, { keyframes } from 'styled-components'
import { Flex, FlexGap, Grid, PageSection, useMatchBreakpoints } from '@pancakeswap/uikit'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/fontawesome-free-regular'
import { useCallback, useState } from 'react'
import type SwiperCore from 'swiper'
import { baseDisplay } from 'pages/_app'
import { faClockRotateLeft, faCheckCircle as fasCheckCircle } from '@fortawesome/free-solid-svg-icons'
import HomeCard from './components/Card'

import FirstIcon from '../../../public/images/home/icon-1.png'
import SecondIcon from '../../../public/images/home/icon-2.png'
import ThirdIcon from '../../../public/images/home/icon-3.png'
import FourthIcon from '../../../public/images/home/icon-4.png'
import FifthIcon from '../../../public/images/home/icon-5.png'
import SixthIcon from '../../../public/images/home/icon-6.png'
import BaseLogo from '../../../public/images/home/base-logo.png'
import ArrowLeft from '../../../public/images/home/arrow-left.svg'
import ArrowRight from '../../../public/images/home/arrow-right.svg'
import FormSection from './components/FormSection'
import Header from './components/Header'

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
  font-size: 36px;
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
  font-size: 16px;
  line-height: 32px;

  color: #a0a3c4;

  width: 95%;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
  }
`
const RewardsText = styled.p`
  color: #a0a3c4;
  font-size: 18px;
  line-height: 50px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 45%;
    font-size: 24px;
  }
`

const RewardsListItem = styled.p`
  font-size: 16px;
  line-height: 32px;
  color: #a0a3c4;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
  }
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

  &:before {
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
  //backdrop-filter: blur(5px);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  /* max-width: 348px; */

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
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
`

const CirckleCenter = styled.span`
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
`

const NavButtonsContainer = styled.div`
  margin-top: 30px;
  text-align: center;

  @media (min-width: 800px) {
    display: none;
  }
`

const NavButtons = styled.div`
  text-align: center;
`

const PrevButton = styled.div`
  margin: 0 10px;
  padding: 0;
  background: none;
  font-size: 24px;
  color: #fff;
  display: inline-block;
  zoom: 1;

  cursor: pointer;
  text-align: center;
`

const NextButton = styled.div`
  margin: 0 10px;
  padding: 0;
  background: none;
  font-size: 24px;
  color: #fff;
  display: inline-block;
  zoom: 1;

  cursor: pointer;
  text-align: center;
`

// end of roadmap

const Home: React.FC<React.PropsWithChildren> = () => {
  const { isDesktop } = useMatchBreakpoints()
  const [swiperRef, setSwiperRef] = useState<SwiperCore>(null)
  console.log('====== swiperRef ', swiperRef)
  const prevSlide = useCallback(() => swiperRef.slidePrev(), [swiperRef])

  const nextSlide = useCallback(() => swiperRef.slideNext(), [swiperRef])

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
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
        <FlexGap gap="10px" flexDirection="column" justifyContent="center" alignItems="center" mb="80px" pt="100px">
          <GradientHeader>BBMX</GradientHeader>
          <FeatureText>FULLY FEATURED</FeatureText>
        </FlexGap>

        <Grid
          gridTemplateColumns={`${isDesktop ? '1fr 1fr 1fr' : '1fr'}`}
          gridTemplateRows={`${isDesktop ? '1fr 1fr' : '1fr'}`}
          gridGap="35px"
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
              mb={`${isDesktop ? '60px' : '20px'}`}
              width={`${isDesktop ? '60%' : '80%'}`}
              alignItems={`${!isDesktop && 'center'}`}
            >
              <p>BUILDING</p>
              <FeatureText>
                <span style={{ color: '#4E09F8' }}>BASE</span> DEFI
              </FeatureText>
            </BuildingInfo>

            <BuildingText className={baseDisplay.className}>
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
          <RewardsText className={baseDisplay.className}>
            $BBMX is our utility and governance token, pivotal to the BBMX protocol. It unlocks the full potential of
            all BBMX products and will be instrumental in guiding the protocol&apos;s growth
          </RewardsText>

          <FlexGap gap="5px" flexDirection="column" justifyContent="center">
            <RewardsListItem className={baseDisplay.className}>
              <div style={{ color: '#4E09F8' }}>
                {/*
// @ts-ignore */}
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              Turn off swapping fees by holding BBMX
            </RewardsListItem>
            <RewardsListItem className={baseDisplay.className}>
              <div style={{ color: '#4E09F8' }}>
                {/*
// @ts-ignore */}
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              Considerably reduce Futures trading fees
            </RewardsListItem>
            <RewardsListItem className={baseDisplay.className}>
              <div style={{ color: '#4E09F8' }}>
                {/*
// @ts-ignore */}
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              Claim a portion of protocol’s revenue via Real Yield
            </RewardsListItem>
            <RewardsListItem className={baseDisplay.className}>
              <div style={{ color: '#4E09F8' }}>
                {/*
// @ts-ignore */}
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              Unlock Smart stake using $BBMX
            </RewardsListItem>
            <RewardsListItem className={baseDisplay.className}>
              <div style={{ color: '#4E09F8' }}>
                {/*
// @ts-ignore */}
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              Get access to Tier-1 project on BBMXStarter
            </RewardsListItem>

            <Flex alignItems="center" justifyContent="center">
              <p style={{ fontSize: '16px', color: '#a0a3c4', lineHeight: '32px' }} className={baseDisplay.className}>
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
            onSwiper={(swiper) => {
              setSwiperRef(swiper)
            }}
            style={window.innerWidth < 1200 ? { width: window.innerWidth - 50 } : {}}
            slidesPerView={window.innerWidth > 1000 ? 3 : window.innerWidth < 1000 && window.innerWidth > 500 ? 2 : 1}
          >
            <SwiperSlide>
              <RoadmapItem className="active">
                <h4 className={baseDisplay.className}>Phase 1</h4>
                <Poster style={{ backgroundColor: '#4e09f8' }}>
                  <CirckleCenter />
                </Poster>
                <div className="meter">
                  <span />
                </div>
                <RoadmapBox className={baseDisplay.className}>
                  <Checklist>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={fasCheckCircle} />
                      </span>
                      Detailed roadmap
                    </ListItem>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={fasCheckCircle} />
                      </span>
                      Website update
                    </ListItem>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: 'white', opacity: '0.75' }} />
                      </span>
                      Whitepaper launch
                    </ListItem>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: 'white', opacity: '0.75' }} />
                      </span>
                      BBMXSwap (Goreli testnet)
                    </ListItem>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: 'white', opacity: '0.75' }} />
                      </span>
                      BBMXSwap (Mainnet)
                    </ListItem>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: 'white', opacity: '0.75' }} />
                      </span>
                      Super Stake (Mainnet)
                    </ListItem>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: 'white', opacity: '0.75' }} />
                      </span>
                      Real yield for BBMX holders
                    </ListItem>
                  </Checklist>
                </RoadmapBox>
              </RoadmapItem>
            </SwiperSlide>

            <SwiperSlide>
              <RoadmapItem className="upcoming">
                <h4 className={baseDisplay.className}>Phase 2</h4>
                <Poster style={{ backgroundColor: '#e7e7e3' }}>
                  <CirckleCenter />
                </Poster>
                <div className="meter">
                  <span />
                </div>
                <RoadmapBox className={baseDisplay.className}>
                  <Checklist>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: 'white', opacity: '0.75' }} />
                      </span>
                      BBMX Futures early access (Testnet Beta)
                    </ListItem>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: 'white', opacity: '0.75' }} />
                      </span>
                      BBMX Futures public access (Testnet Beta)
                    </ListItem>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: 'white', opacity: '0.75' }} />
                      </span>
                      BBMX Futures public access (Mainnet Beta)
                    </ListItem>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: 'white', opacity: '0.75' }} />
                      </span>
                      BBMXStarter (Launchpad)
                    </ListItem>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: 'white', opacity: '0.75' }} />
                      </span>
                      BBMX Futures New trading assets
                    </ListItem>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: 'white', opacity: '0.75' }} />
                      </span>
                      Futures Trading contest
                    </ListItem>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: 'white', opacity: '0.75' }} />
                      </span>
                      BBMX Buybacks
                    </ListItem>
                  </Checklist>
                </RoadmapBox>
              </RoadmapItem>
            </SwiperSlide>

            <SwiperSlide>
              <RoadmapItem className="upcoming last">
                <h4 className={baseDisplay.className}>Phase 3 Mainnet launch</h4>
                <Poster style={{ backgroundColor: '#e7e7e3' }}>
                  <CirckleCenter />
                </Poster>
                <div className="meter">
                  <span />
                </div>
                <RoadmapBox className={baseDisplay.className}>
                  <Checklist>
                    <ListItem>
                      <span style={{ color: '#4E09F8', marginRight: '7px' }}>
                        {/*
// @ts-ignore */}
                        <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: 'white', opacity: '0.75' }} />
                      </span>
                      (Details to be announced)
                    </ListItem>
                  </Checklist>
                </RoadmapBox>
              </RoadmapItem>
            </SwiperSlide>
          </Swiper>
        </RoadmapContainer>
        <NavButtonsContainer>
          <NavButtons>
            <PrevButton onClick={prevSlide}>
              <img src={ArrowLeft.src} alt="" />
            </PrevButton>
            <NextButton onClick={nextSlide}>
              <img src={ArrowRight.src} alt="" />
            </NextButton>
          </NavButtons>
        </NavButtonsContainer>
      </HomePageSection>
    </>
  )
}

export default Home
