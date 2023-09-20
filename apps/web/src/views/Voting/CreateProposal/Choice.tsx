import { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { Box, CloseIcon, IconButton, Input as StyledInput, InputProps } from '@pancakeswap/uikit'
import styled from 'styled-components'

interface ChoiceProps extends InputProps, InputHTMLAttributes<HTMLInputElement> {
  onTextInput: (value: string) => void
  onRemove?: () => void
}

const Input = styled(StyledInput)`
  padding: 0 15px;
  font-size: 16px;
  font-weight: 400;
  line-height: 44px;
  color: #fff;
  background-color: transparent;
  background-clip: padding-box;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`

const Choice: React.FC<React.PropsWithChildren<ChoiceProps>> = ({ onRemove, onTextInput, ...props }) => {
  const [isWarning, setIsWarning] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget

    setIsWarning(isDirty && value.length === 0)
    setIsDirty(true)
    onTextInput(value)
  }

  return (
    <Box position="relative" mb="16px">
      <Input {...props} onChange={handleChange} isWarning={isWarning} />
      {onRemove && (
        <Box position="absolute" right="8px" top="0px" zIndex={30}>
          <IconButton variant="text" onClick={onRemove}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}

export default Choice
