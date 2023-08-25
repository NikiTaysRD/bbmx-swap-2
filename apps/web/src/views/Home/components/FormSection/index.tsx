import { useCallback, useState } from 'react'
import styled from 'styled-components'

import BG2 from '../../../../../public/images/home/bg-2.jpg'
import Base from '../../../../../public/images/home/base.png'
import TwitterIcon from '../../../../../public/images/home/twitter.svg'
import EnvelopeIcon from '../../../../../public/images/home/envelope.svg'
import PaperPlaneIcon from '../../../../../public/images/home/paper-plane.svg'

const Banner = styled.section`
  position: relative;
  min-height: 100vh;
  background: url(${BG2.src}) no-repeat 0 0;
  background-size: cover;

  @media (max-width: 991.98px) {
    min-height: 0;
    background-position: 50% 0;
  }
`

const MainWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);

  @media (max-width: 991.98px) {
    position: relative;
    left: auto;
    top: auto;
    width: auto;
    transform: translateY(0);
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    padding: 150px 0;
  }
`

const Container = styled.div`
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;

  @media (max-width: 575.98px) {
    width: 100%;
    padding-left: 12px;
    padding-right: 12px;
  }
`

const Row = styled.div`
  align-items: center;
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) * -0.5);
  margin-left: calc(var(--bs-gutter-x) * -0.5);
`

const Column = styled.div`
  flex: 0 0 auto;
  width: 100%;

  @media (min-width: 992px) {
    width: 50%;
  }

  padding-left: 15px;
  padding-right: 15px;
`

const Input = styled.input`
  padding-left: 70px;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.75);
  font-size: 16px;
  line-height: 50px;
  display: block;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  box-shadow: none;
  width: 100%;

  @media (max-width: 1399.98px) {
    line-height: 50px;
    padding: 0 15px 0 50px;
    font-size: 13px;
  }
`

const MainCaption = styled.div`
  position: relative;
  z-index: 1;
`

const Heading1 = styled.h1`
  font-size: 16px;
  margin-bottom: 15px;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 15px;
  text-transform: uppercase;
  line-height: 130%;
  font-weight: 700;
  letter-spacing: 3px;
  width: 70%;

  @media (max-width: 1399.98px) {
    font-size: 13px;
    margin-bottom: 15px;
    margin-bottom: 25px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 50%;
  }
`

const BaseIcon = styled.img`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
`

const HighlightSpan = styled.span`
  color: #4e09f8;
  font-weight: 700;
`

const Paragraph = styled.p`
  color: #ebebeb;
  font-size: 40px;
  line-height: 1.6;
  margin-bottom: 30px;

  @media (max-width: 1399.98px) {
    font-size: 34px;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  @media (max-width: 575.98px) {
    font-size: 27px;
  }
`

const TokenSummary = styled.div`
  background: rgba(164, 187, 234, 0.05);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 20px;

  @media (max-width: 1399.98px) {
    padding: 18px;
    margin-bottom: 5px;
  }
`

const Heading3 = styled.h3`
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 10px;

  @media (max-width: 1399.98px) {
    font-size: 11px;
  }
`

const IconedDiv = styled.div`
  position: relative;
`

const ButtonSet = styled.div``

const Button = styled.a`
  display: inline-block;
  padding: 0 25px;
  line-height: 44px;
  font-size: 14px;
  background: #4e09f8;
  color: #fff;
  border-radius: 6px;
  font-weight: 400;
  text-transform: uppercase;
  outline: none;
  box-shadow: none !important;
  text-align: center;
`

const SocialLinks = styled.ul`
  margin-top: 20px;
`

const ListItem = styled.li`
  margin-right: 20px;
  float: left;
  list-style-type: none;
`

const SocialLink = styled.a`
  display: block;
  height: 24px;
  width: 24px;
  
  img {
    width: 100%;
    height: 100%;
  }
`

const FormSection = () => {
  const [address, setAddress] = useState('0x024BAea0ae99a05Aad4Cc7D4F423Be5c9b86Bf37')

  const onBuyRocketSwapClick = useCallback(
    () => window.open(`https://app.rocketswap.cc/exchange/swap?outputCurrency=${address}`, '_blank'),
    [address],
  )

  return (
    <Banner>
      <MainWrapper>
        <Container>
          <Row>
            <Column>
              <MainCaption>
                <Heading1>
                  Your portal to <HighlightSpan>Base</HighlightSpan> DeFi
                </Heading1>
                <Paragraph>
                  Swap, Trade, Farm or Launch <i>anything</i> on <HighlightSpan>Base</HighlightSpan> Blockchain
                </Paragraph>
                <TokenSummary>
                  <Heading3>BBMX Smart Contract (BASE)</Heading3>
                  <IconedDiv>
                    <i>
                      <BaseIcon src={Base.src} alt="base icon" />
                    </i>
                    <Input type="text" value={address} onChange={({ target: { value } }) => setAddress(value)} />
                  </IconedDiv>
                </TokenSummary>
                <ButtonSet>
                  <Button target="_blank" onClick={onBuyRocketSwapClick}>
                    Buy on Rocketswap
                  </Button>
                </ButtonSet>
                <SocialLinks>
                  <ListItem>
                    <SocialLink href="https://twitter.com/bbmxexchange" target="_blank">
                      <img src={TwitterIcon.src} alt="Twitter" />
                    </SocialLink>
                  </ListItem>
                  <ListItem>
                    <SocialLink href="https://t.me/BBMXExchange" target="_blank">
                      <img src={PaperPlaneIcon.src} alt="Twitter" />
                    </SocialLink>
                  </ListItem>
                  <ListItem>
                    <SocialLink href="mailto:business@bbmx.exchange" target="_blank">
                      <img src={EnvelopeIcon.src} alt="Twitter" />
                    </SocialLink>
                  </ListItem>
                </SocialLinks>
              </MainCaption>
            </Column>
          </Row>
        </Container>
      </MainWrapper>
    </Banner>
  )
}

export default FormSection
