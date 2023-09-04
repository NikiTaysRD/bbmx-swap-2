import { Flex, IconButton, CogIcon, Toggle, QuestionHelper, Text, ExpertModal, useModal } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useState } from 'react'
import { useExpertMode, useUserExpertModeAcknowledgement } from '@pancakeswap/utils/user/expertMode'
import useTranslation from '@pancakeswap/localization/src/useTranslation'
import { useSwapActionHandlers } from 'state/swap/useSwapActionHandlers'
import { RoutingSettingsButton } from './SettingsModal'

type Props = {
  color?: string
  mr?: string
  mode?: string
  onClick?: () => void
}

const SlippageContainer = styled.div`
  width: 300px;
  position: absolute;
  top: 100%;
  right: -20px;
  background: #101124;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 99999;
`

const Heading3 = styled.h3`
  font-size: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;

  font-weight: 700;
`

const SlippageSet = styled.div`
  margin-bottom: 8px;
`

const SlippageTitle = styled.h4`
  font-size: 13px;
  margin-bottom: 12px;
`

const SlippageField = styled.div`
  align-items: center !important;
  justify-content: space-between !important;
  display: flex !important;
`

const SField = styled.div`
  position: relative;
  width: calc(100% - 90px);
`

const SFieldInput = styled.input`
  line-height: 44px;
  padding: 0 40px 0 15px;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 14px;
  background: none;
  outline: none;
  box-shadow: none;
  width: 100%;
`

const SFieldSpan = styled.span`
  position: absolute;
  right: 10px;
  color: #a0a3c4;
  font-size: 12px;
  top: 50%;
  transform: translateY(-50%);
`

const AutoBtn = styled.div`
  position: relative;
`

const AutoBtnInput = styled.input`
  display: none;
`

const AutoBtnLabel = styled.label`
  line-height: 44px;
  text-align: center;
  display: block;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 14px;
  width: 80px;
  cursor: pointer;
`

const FieldMin = styled.div`
  width: 100%;
  position: relative;
`

const FieldMinInput = styled.input`
  line-height: 44px;
  padding: 0 40px 0 15px;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 14px;
  background: none;
  outline: none;
  box-shadow: none;
  width: 100%;
`

const FieldMinSpan = styled.span`
  position: absolute;
  right: 10px;
  color: #a0a3c4;
  font-size: 12px;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: tranlasteY(-50%);
  -moz-transform: translateY(-50%);
`

const GlobalSettings = ({ color, mr = '8px', mode, onClick }: Props) => {
  const [isShow, setIsShow] = useState(false)
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [expertMode, setExpertMode] = useExpertMode()
  const [showExpertModeAcknowledgement, setShowExpertModeAcknowledgement] = useUserExpertModeAcknowledgement()
  const { onChangeRecipient } = useSwapActionHandlers()

  const { t } = useTranslation()
  const [ExportModalWindow] = useModal(
    <ExpertModal
      setShowConfirmExpertModal={setShowConfirmExpertModal}
      toggleExpertMode={() => setExpertMode((s) => !s)}
      setShowExpertModeAcknowledgement={setShowExpertModeAcknowledgement}
    />,
  )

  const handleExpertModeToggle = () => {
    if (expertMode || !showExpertModeAcknowledgement) {
      onChangeRecipient(null)
      setExpertMode((s) => !s)
    } else {
      setShowConfirmExpertModal(true)
      ExportModalWindow()
    }
  }

  return (
    <Flex>
      <IconButton
        onClick={() => setIsShow(!isShow)}
        variant="text"
        scale="sm"
        mr={mr}
        id={`open-settings-dialog-button-${mode}`}
      >
        <CogIcon height={24} width={24} color={color || 'textSubtle'} />
      </IconButton>
      <SlippageContainer style={{ display: isShow ? '' : 'none' }}>
        <Heading3>Transaction Settings</Heading3>
        <SlippageSet>
          <SlippageTitle>Slippage tolerance</SlippageTitle>
          <SlippageField>
            <SField>
              <SFieldInput value={5} type="text" />
              <SFieldSpan>%</SFieldSpan>
            </SField>
            <AutoBtn>
              <AutoBtnInput type="checkbox" id="auto" />
              <AutoBtnLabel htmlFor="auto">Auto</AutoBtnLabel>
            </AutoBtn>
          </SlippageField>
        </SlippageSet>
        <SlippageSet>
          <SlippageTitle>Transaction deadline</SlippageTitle>
          <SlippageField>
            <FieldMin>
              <FieldMinInput type="text" value="30" />
              <FieldMinSpan>Minutes</FieldMinSpan>
            </FieldMin>
          </SlippageField>
        </SlippageSet>
        <Flex justifyContent="space-between" alignItems="center" mb="24px">
          <Flex alignItems="center">
            <Text>{t('Expert Mode')}</Text>
            <QuestionHelper
              text={t('Bypasses confirmation modals and allows high slippage trades. Use at your own risk.')}
              placement="top"
              ml="4px"
            />
          </Flex>
          <Toggle id="toggle-expert-mode-button" scale="md" checked={expertMode} onChange={handleExpertModeToggle} />
        </Flex>
        <RoutingSettingsButton />
      </SlippageContainer>
    </Flex>
  )
}

export default GlobalSettings
