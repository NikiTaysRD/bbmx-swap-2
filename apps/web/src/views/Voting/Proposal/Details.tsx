import { Box, CardBody, CardHeader, Flex, Heading, LinkExternal, ScanLink, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Proposal } from 'state/types'
import { getBlockExploreLink } from 'utils'
import { useTranslation } from '@pancakeswap/localization'
import truncateHash from '@pancakeswap/utils/truncateHash'
import { ChainId } from '@pancakeswap/sdk'
import { IPFS_GATEWAY } from '../config'
import { ProposalStateTag } from '../components/Proposals/tags'

interface DetailsProps {
  proposal: Proposal
}

const DetailBox = styled(Box)`
  border-radius: 10px;
  padding: 20px;
  background: #101124;
`

const Card = styled.div`
  padding: 30px;
  border-radius: 10px;
  background: #1b1c30;
  position: relative;
  margin-bottom: 15px !important;

  h3 {
    font-size: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 20px;
  }
`

const Details: React.FC<React.PropsWithChildren<DetailsProps>> = ({ proposal }) => {
  const { t } = useTranslation()
  const startDate = new Date(proposal.start * 1000)
  const endDate = new Date(proposal.end * 1000)

  return (
    <Card>
      <Heading as="h3" scale="md">
        {t('Details')}
      </Heading>

      <Flex alignItems="center" mb="8px">
        <Text color="textSubtle">{t('Identifier')}</Text>
        <LinkExternal href={`${IPFS_GATEWAY}/${proposal.id}`} ml="8px">
          {proposal.id.slice(0, 8)}
        </LinkExternal>
      </Flex>
      <Flex alignItems="center" mb="8px">
        <Text color="textSubtle">{t('Creator')}</Text>
        <ScanLink chainId={ChainId.BSC} href={getBlockExploreLink(proposal.author, 'address')} ml="8px">
          {truncateHash(proposal.author)}
        </ScanLink>
      </Flex>
      <Flex alignItems="center" mb="16px">
        <Text color="textSubtle">{t('Snapshot')}</Text>
        <ScanLink chainId={ChainId.BSC} href={getBlockExploreLink(proposal.snapshot, 'block')} ml="8px">
          {proposal.snapshot}
        </ScanLink>
      </Flex>
      <DetailBox p="16px">
        <ProposalStateTag proposalState={proposal.state} mb="8px" />
        <Flex alignItems="center">
          <Text color="textSubtle" fontSize="14px">
            {t('Start Date')}
          </Text>
          <Text ml="8px">{format(startDate, 'yyyy-MM-dd HH:mm')}</Text>
        </Flex>
        <Flex alignItems="center">
          <Text color="textSubtle" fontSize="14px">
            {t('End Date')}
          </Text>
          <Text ml="8px">{format(endDate, 'yyyy-MM-dd HH:mm')}</Text>
        </Flex>
      </DetailBox>
    </Card>
  )
}

export default Details
