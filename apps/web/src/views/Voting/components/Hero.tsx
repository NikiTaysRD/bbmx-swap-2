import { Box, Button as StyledButton, Flex, Heading } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import Link from 'next/link'

const StyledHero = styled(Box)`
  margin-bottom: 25px;
  background: rgba(78, 9, 248, 0.08);
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

  ${Heading}:first-child {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 1px;
    font-family: 'Base Display', sans-serif;
    color: #fff;
  }

  ${Heading}:last-child {
    font-size: 15px;
    font-weight: 400;
    font-family: 'Base Display', sans-serif;
    color: #a0a3c4;
  }
`

const Button = styled(StyledButton)`
  background-color: #4e09f8;
  border-radius: 6px;
  font-weight: 400;
  font-size: 12px;
  line-height: 28px;
  padding: 0 20px;
  height: auto;
  text-transform: uppercase;
`

const Hero = () => {
  const { t } = useTranslation()

  return (
    <StyledHero>
      <Flex flexDirection="row" justifyItems="center" alignItems="center">
        <Flex style={{ flexGrow: 1 }}>
          <Box>
            <Heading as="h3" scale="lg" color="secondary" mb="16px">
              {t('Voting')}
            </Heading>
            <Heading as="h3" scale="md">
              {t('Have your say in the future of the BBMX Ecosystem')}
            </Heading>
          </Box>
        </Flex>
        <Flex>
          <Link href="/voting/proposal/create" passHref prefetch={false}>
            <Button>{t('Make a Proposal')}</Button>
          </Link>
        </Flex>
      </Flex>
    </StyledHero>
  )
}

export default Hero
