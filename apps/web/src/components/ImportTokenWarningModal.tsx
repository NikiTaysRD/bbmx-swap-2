import { Token } from '@pancakeswap/sdk'
import { Modal, Box, InjectedModalProps } from '@pancakeswap/uikit'
import ImportToken from 'components/SearchModal/ImportToken'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import { baseDisplay } from 'pages/_app'

interface Props extends InjectedModalProps {
  tokens: Token[]
  onCancel: () => void
}

const ImportTokenWarningModal: React.FC<React.PropsWithChildren<Props>> = ({ tokens, onDismiss, onCancel }) => {
  const { t } = useTranslation()
  return (
    <div className={baseDisplay.className}>
      <Modal
        title={t('Import Token')}
        onDismiss={() => {
          onDismiss?.()
          onCancel()
        }}
      >
        <Box maxWidth="380px">
          <ImportToken tokens={tokens} handleCurrencySelect={onDismiss} />
        </Box>
      </Modal>
    </div>
  )
}

export default ImportTokenWarningModal
