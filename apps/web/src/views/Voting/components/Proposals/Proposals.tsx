import { Card, Flex, Heading } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import useSWR from 'swr'
import { ProposalState, ProposalType } from 'state/types'
import { getProposals } from 'state/voting/helpers'
import { FetchStatus } from 'config/constants/types'
import { useSessionStorage } from 'hooks/useSessionStorage'
import { baseDisplay } from 'pages/_app'
import styled from 'styled-components'
import { filterProposalsByState, filterProposalsByType } from '../../helpers'
import ProposalsLoading from './ProposalsLoading'
import TabMenu from './TabMenu'
import ProposalRow from './ProposalRow'
import Filters from './Filters'

interface State {
  proposalType: ProposalType
  filterState: ProposalState
}

const Container = styled.div`
  flex: 1;
  height: 100%;
  padding-bottom: 15px;
`

const Proposals = () => {
  const { t } = useTranslation()
  const [state, setState] = useSessionStorage<State>('proposals-filter', {
    proposalType: ProposalType.CORE,
    filterState: ProposalState.ACTIVE,
  })

  const { proposalType, filterState } = state

  const { status, data } = useSWR(['proposals', filterState], async () => getProposals(1000, 0, filterState))

  const handleProposalTypeChange = (newProposalType: ProposalType) => {
    setState((prevState) => ({
      ...prevState,
      proposalType: newProposalType,
    }))
  }

  const handleFilterChange = (newFilterState: ProposalState) => {
    setState((prevState) => ({
      ...prevState,
      filterState: newFilterState,
    }))
  }

  const filteredProposals = filterProposalsByState(filterProposalsByType(data, proposalType), filterState)

  return (
    <>
      <Container>
        {/* <Box mb="48px"> */}
        {/*  <Breadcrumbs> */}
        {/*    <Link href="/">{t('Home')}</Link> */}
        {/*    <Text>{t('Voting')}</Text> */}
        {/*  </Breadcrumbs> */}
        {/* </Box> */}
        <Heading as="h2" scale="xl" mb="9px" id="voting-proposals" style={{ fontSize: '30px', fontWeight: '700' }}>
          {t('Proposals')}
        </Heading>
        <TabMenu proposalType={proposalType} onTypeChange={handleProposalTypeChange} />
      </Container>

      <Container>
        <Card style={{ borderRadius: '10px', background: '#1B1C30' }} background="none">
          <Filters
            filterState={filterState}
            onFilterChange={handleFilterChange}
            isLoading={status !== FetchStatus.Fetched}
          />
          <div
            style={{
              width: '95%',
              height: '0',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          {status !== FetchStatus.Fetched && <ProposalsLoading />}
          {status === FetchStatus.Fetched &&
            filteredProposals.length > 0 &&
            filteredProposals.map((proposal) => {
              return <ProposalRow key={proposal.id} proposal={proposal} />
            })}
          {status === FetchStatus.Fetched && filteredProposals.length === 0 && (
            <Flex alignItems="center" justifyContent="center" p="32px">
              <Heading
                as="h5"
                className={baseDisplay.className}
                style={{ fontWeight: '400', fontSize: '15px', lineHeight: '160%' }}
              >
                {t('No proposals found')}
              </Heading>
            </Flex>
          )}
        </Card>
      </Container>
    </>
  )
}

export default Proposals
