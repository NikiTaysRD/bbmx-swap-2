import { useTranslation } from '@pancakeswap/localization'
import { Route } from '@pancakeswap/smart-router/evm'
import { Box, IconButton, QuestionHelper, SearchIcon, Text, useModalV2 } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { memo } from 'react'

import { RowBetween } from 'components/Layout/Row'
import SwapRoute from 'views/Swap/components/SwapRoute'
import { RouteDisplayModal } from './RouteDisplayModal'

interface Props {
  routes?: Route[]
}

const TR = styled.tr`
  width: 100%;
  font-size: 12px;
  transition: 0.3s all;
  -webkit-transition: 0.3s all;
  -moz-transition: 0.3s all;
`

const TH = styled.th`
  font-weight: 600;
  font-size: 11px;
  line-height: 18px;
  padding: 5px 0;
  text-align: left;
  letter-spacing: normal;
  transition: 0.3s all;
  -webkit-transition: 0.3s all;
  -moz-transition: 0.3s all;
`

const TD = styled.td`
  font-size: 11px;
  text-align: right;
  letter-spacing: normal;
`

export const RoutesBreakdown = memo(function RoutesBreakdown({ routes = [] }: Props) {
  const { t } = useTranslation()
  const routeDisplayModal = useModalV2()

  if (!routes.length) {
    return null
  }

  const count = routes.length

  return (
    <TR>
      <TH>
        <Text fontSize="11px">Route:</Text>
      </TH>
      <TD>
        <Box onClick={routeDisplayModal.onOpen} role="button">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {count > 1 ? (
              <Text fontSize="11px" color="#FFFFFF">
                {t('%count% Separate Routes', { count })}
              </Text>
            ) : (
              <RouteComp route={routes[0]} />
            )}
            <IconButton ml="8px" variant="text" color="#FFFFFF" scale="xs">
              <SearchIcon width="16px" height="16px" color="#FFFFFF" />
            </IconButton>
          </span>
        </Box>
        <RouteDisplayModal {...routeDisplayModal} routes={routes} />
      </TD>
    </TR>
  )
})

interface RouteProps {
  route: Route
}

function RouteComp({ route }: RouteProps) {
  const { path } = route

  return (
    <RowBetween>
      <SwapRoute path={path} />
    </RowBetween>
  )
}
