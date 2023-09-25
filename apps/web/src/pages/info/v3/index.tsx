import { InfoPageLayout } from 'views/V3Info/components/Layout'
import Overview from 'views/V3Info'
import { Header } from '@pancakeswap/uikit/src/widgets/Menu/Header'
import { Flex } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'

const InfoPage = () => {
  const { theme } = useTheme()
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
      background={theme.colors.gradientBubblegum}
    >
      <Header />
      <Overview />
    </Flex>
  )
}

InfoPage.Layout = InfoPageLayout
InfoPage.chains = [] // set all

export default InfoPage
