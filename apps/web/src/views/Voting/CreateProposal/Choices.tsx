import { Button as StyledButton, Heading } from '@pancakeswap/uikit'
import uniqueId from 'lodash/uniqueId'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import Choice from './Choice'

export interface ChoiceIdValue {
  id: string
  value: string
}

interface ChoicesProps {
  choices: ChoiceIdValue[]
  onChange: (newChoices: ChoiceIdValue[]) => void
}

const Card = styled.div`
  padding: 30px;
  border-radius: 10px;
  background: #1b1c30;
  position: relative;

  h3 {
    font-size: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 20px;
  }
`

const Button = styled(StyledButton)`
  background-color: #4e09f8 !important;
  border-radius: 6px;

  &:disabled {
    background-color: #17024b !important;
  }
`

export const MINIMUM_CHOICES = 2
export const makeChoice = (): ChoiceIdValue => ({ id: uniqueId(), value: '' })

const Choices: React.FC<React.PropsWithChildren<ChoicesProps>> = ({ choices, onChange }) => {
  const { t } = useTranslation()
  const hasMinimumChoices = choices.filter((choice) => choice.value.length > 0).length >= MINIMUM_CHOICES

  const addChoice = () => {
    onChange([...choices, makeChoice()])
  }

  return (
    <Card>
      <Heading as="h3" scale="md">
        {t('Choices')}
      </Heading>

      {choices.map(({ id, value }, index) => {
        const handleTextInput = (newValue: string) => {
          const newChoices = [...choices]
          const choiceIndex = newChoices.findIndex((newChoice) => newChoice.id === id)

          newChoices[choiceIndex].value = newValue

          onChange(newChoices)
        }

        const handleRemove = () => {
          onChange(choices.filter((newPrevChoice) => newPrevChoice.id !== id))
        }

        return (
          <Choice
            key={id}
            scale="lg"
            onTextInput={handleTextInput}
            placeholder={t('Input choice text')}
            value={value}
            onRemove={index > 1 ? handleRemove : undefined}
          />
        )
      })}

      <Button type="button" onClick={addChoice} disabled={!hasMinimumChoices}>
        {t('Add Choice')}
      </Button>
    </Card>
  )
}

export default Choices
