import { InfoPageLayout } from 'views/Info'
import Overview from 'views/Info/Overview'
import { Flex } from '@pancakeswap/uikit'
import { Header } from '@pancakeswap/uikit/src/widgets/Menu/Header'
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
