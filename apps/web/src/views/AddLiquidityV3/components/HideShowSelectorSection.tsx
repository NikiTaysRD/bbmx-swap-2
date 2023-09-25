import { AutoRow, Button } from '@pancakeswap/uikit'
import { LightGreyCard } from 'components/Card'
import { Dispatch, ReactElement, SetStateAction } from 'react'
import { baseDisplay } from 'pages/_app'

interface HideShowSelectorSectionPropsType {
  noHideButton?: boolean
  showOptions: boolean
  setShowOptions: Dispatch<SetStateAction<boolean>>
  heading: ReactElement
  content: ReactElement
}

export default function HideShowSelectorSection({
  noHideButton,
  showOptions,
  setShowOptions,
  heading,
  content,
}: HideShowSelectorSectionPropsType) {
  return (
    <LightGreyCard
      padding="8px"
      style={{
        height: 'fit-content',
        background: 'none',
        borderRadius: '6px',
        border: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      <AutoRow justifyContent="space-between" marginBottom={showOptions ? '8px' : '0px'}>
        {heading ?? <div />}
        {noHideButton || (
          <Button
            scale="sm"
            onClick={() => setShowOptions((prev) => !prev)}
            variant="text"
            style={{
              color: '#4E09F8',
              background: 'rgba(78,9,248,0.1)',
              letterSpacing: '0.5px',
              lineHeight: '30px',
              borderRadius: '6px',
              width: '55px',
              fontSize: '13px',
            }}
            className={baseDisplay.className}
          >
            EDIT
          </Button>
        )}
      </AutoRow>
      {showOptions && content}
    </LightGreyCard>
  )
}
