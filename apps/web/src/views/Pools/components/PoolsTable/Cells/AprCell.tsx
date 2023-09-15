import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { Text, useMatchBreakpoints, Pool } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from '@pancakeswap/localization'
import { Token } from '@pancakeswap/sdk'

import { baseDisplay } from 'pages/_app'
import Apr from '../../Apr'

interface AprCellProps {
  pool: Pool.DeserializedPool<Token>
}

const AprCell: React.FC<React.PropsWithChildren<AprCellProps>> = ({ pool }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { userData } = pool
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO

  return (
    <Pool.BaseCell role="cell" flex={['1 0 50px']}>
      <Pool.CellContent>
        <Text
          color="#a0a3c4"
          textAlign="left"
          fontSize="13px"
          lineHeight="160%"
          letterSpacing="0.75px"
          className={baseDisplay.className}
        >
          {t('APR')}
        </Text>
        <Apr pool={pool} stakedBalance={stakedBalance} showIcon={!isMobile} />
      </Pool.CellContent>
    </Pool.BaseCell>
  )
}

export default AprCell
