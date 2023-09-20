import { Flex } from '@pancakeswap/uikit'
import { AtomBox } from '@pancakeswap/ui/components/AtomBox'
import { Header } from '@pancakeswap/uikit/src/widgets/Menu/Header'
import { pageVariants } from '@pancakeswap/uikit/src/widgets/Swap/SwapWidget.css'
import styled from 'styled-components'
import Page from 'components/Layout/Page'
import { baseDisplay } from 'pages/_app'
import Hero from './components/Hero'
import { Proposals } from './components/Proposals'

const Content = styled.div`
  flex: 1;
  height: 100%;
`

const Voting = () => {
  return (
    <AtomBox className={[pageVariants(), baseDisplay.className].join(' ')}>
      <Header />
      <Page>
        <Hero />
        <Content>
          <Proposals />
        </Content>
        {/* <Chrome> */}
        {/*  <Footer /> */}
        {/* </Chrome> */}
      </Page>
    </AtomBox>
  )
}

export default Voting
