import styled from 'styled-components'
import { Text, Flex } from '@pancakeswap/uikit'

export const ClickableColumnHeader = styled(Text)`
  cursor: pointer;
  display: flex;
  justify-content: start;
  gap: 5px;
`

export const TableWrapper = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: 16px;
  background-color: #1b1c30;
  border-radius: 6px;
  padding: 25px 15px;

  overflow: hidden;
`

export const PageButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2em;
  margin-bottom: 1.2em;
`

export const Arrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 20px;
  :hover {
    cursor: pointer;
  }
`

export const Break = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.cardBorder};
  width: 100%;
`
