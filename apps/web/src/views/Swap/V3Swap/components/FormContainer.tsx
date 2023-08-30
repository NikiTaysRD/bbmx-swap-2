import { PropsWithChildren, memo } from 'react'
import { Column } from '@pancakeswap/uikit'

import { Wrapper } from '../../components/styleds'

export const FormContainer = memo(function FormContainer({ children }: PropsWithChildren) {
  return (
    <Wrapper id="swap-page" style={{ minHeight: '320px', paddingTop: '0px' }}>
      <Column gap="sm">{children}</Column>
    </Wrapper>
  )
})
