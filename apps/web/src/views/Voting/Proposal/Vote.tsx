import { useState } from 'react'
import styled from 'styled-components'
import {
  Button as StyledButton,
  Card as StyledCard,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  Radio,
  Text,
  useModal,
  useToast,
} from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { Proposal } from 'state/types'
import { useTranslation } from '@pancakeswap/localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import CastVoteModal from '../components/CastVoteModal'

interface VoteProps extends CardProps {
  proposal: Proposal
  onSuccess?: () => void
}

interface State {
  label: string
  value: number
}

const Button = styled(StyledButton)`
  background-color: #4e09f8;
  border-radius: 6px;
`

const Choice = styled.label<{ isChecked: boolean; isDisabled: boolean }>`
  align-items: center;
  border: 1px solid ${({ theme, isChecked }) => theme.colors[isChecked ? 'success' : 'cardBorder']};
  border-radius: 6px;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  display: flex;
  margin-bottom: 16px;
  padding: 16px;
`

const ChoiceText = styled.div`
  flex: 1;
  padding-left: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 0;
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

const Vote: React.FC<React.PropsWithChildren<VoteProps>> = ({ proposal, onSuccess, ...props }) => {
  const [vote, setVote] = useState<State>(null)
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const { address: account } = useAccount()

  const handleSuccess = async () => {
    toastSuccess(t('Vote cast!'))
    onSuccess?.()
  }

  const [presentCastVoteModal] = useModal(
    <CastVoteModal onSuccess={handleSuccess} proposalId={proposal.id} vote={vote} block={Number(proposal.snapshot)} />,
  )

  return (
    <Card {...props}>
      <Heading as="h3" scale="md">
        {t('Cast your vote')}
      </Heading>

      {proposal.choices.map((choice, index) => {
        const isChecked = index + 1 === vote?.value

        const handleChange = () => {
          setVote({
            label: choice,
            value: index + 1,
          })
        }

        return (
          <Choice key={choice} isChecked={isChecked} isDisabled={!account}>
            <div style={{ flexShrink: 0 }}>
              <Radio scale="sm" value={choice} checked={isChecked} onChange={handleChange} disabled={!account} />
            </div>
            <ChoiceText>
              <Text as="span" title={choice}>
                {choice}
              </Text>
            </ChoiceText>
          </Choice>
        )
      })}
      {account ? (
        <Button onClick={presentCastVoteModal} disabled={vote === null}>
          {t('Cast Vote')}
        </Button>
      ) : (
        <ConnectWalletButton />
      )}
    </Card>
  )
}

export default Vote
