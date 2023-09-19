import { Box, Text, Flex, Heading, Progress, Skeleton, Farm as FarmUI } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { Vote } from 'state/types'
import { formatNumber } from '@pancakeswap/utils/formatBalance'
import { useTranslation } from '@pancakeswap/localization'
import { FetchStatus, TFetchStatus } from 'config/constants/types'
import styled from 'styled-components'
import { calculateVoteResults, getTotalFromVotes } from '../helpers'
import TextEllipsis from '../components/TextEllipsis'

const { VotedTag } = FarmUI.Tags

interface ResultsProps {
  choices: string[]
  votes: Vote[]
  votesLoadingStatus: TFetchStatus
}

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

const Results: React.FC<React.PropsWithChildren<ResultsProps>> = ({ choices, votes, votesLoadingStatus }) => {
  const { t } = useTranslation()
  const results = calculateVoteResults(votes)
  const { address: account } = useAccount()
  const totalVotes = getTotalFromVotes(votes)

  return (
    <Card>
      <Heading as="h3" scale="md">
        {t('Current Results')}
      </Heading>

      {votesLoadingStatus === FetchStatus.Fetched &&
        choices.map((choice, index) => {
          const choiceVotes = results[choice] || []
          const totalChoiceVote = getTotalFromVotes(choiceVotes)
          const progress = totalVotes === 0 ? 0 : (totalChoiceVote / totalVotes) * 100
          const hasVoted = choiceVotes.some((vote) => {
            return account && vote.voter.toLowerCase() === account.toLowerCase()
          })

          return (
            <Box key={choice} mt={index > 0 ? '24px' : '0px'}>
              <Flex alignItems="center" mb="8px">
                <TextEllipsis mb="4px" title={choice}>
                  {choice}
                </TextEllipsis>
                {hasVoted && <VotedTag mr="4px" />}
              </Flex>
              <Box mb="4px">
                <Progress primaryStep={progress} scale="sm" />
              </Box>
              <Flex alignItems="center" justifyContent="space-between">
                <Text color="textSubtle">{t('%total% Votes', { total: formatNumber(totalChoiceVote, 0, 2) })}</Text>
                <Text>
                  {progress.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                </Text>
              </Flex>
            </Box>
          )
        })}

      {votesLoadingStatus === FetchStatus.Fetching &&
        choices.map((choice, index) => {
          return (
            <Box key={choice} mt={index > 0 ? '24px' : '0px'}>
              <Flex alignItems="center" mb="8px">
                <TextEllipsis mb="4px" title={choice}>
                  {choice}
                </TextEllipsis>
              </Flex>
              <Box mb="4px">
                <Skeleton height="36px" mb="4px" />
              </Box>
            </Box>
          )
        })}
    </Card>
  )
}

export default Results
