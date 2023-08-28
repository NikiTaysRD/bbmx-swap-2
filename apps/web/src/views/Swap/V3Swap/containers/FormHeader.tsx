import { useTranslation } from '@pancakeswap/localization'
import { FC, useCallback } from 'react'

import CurrencyInputHeader from '../../components/CurrencyInputHeader'

export const FormHeader: FC<{
  refreshDisabled: boolean
  onRefresh: () => void
  setIsShowMarket?: (param: boolean) => void
}> = ({ refreshDisabled, setIsShowMarket, onRefresh }) => {
  const { t } = useTranslation()

  const handleRefresh = useCallback(() => {
    if (refreshDisabled) {
      return
    }
    onRefresh()
  }, [onRefresh, refreshDisabled])

  return (
    <CurrencyInputHeader
      setIsShowMarket={setIsShowMarket}
      title=""
      subtitle=""
      hasAmount={!refreshDisabled}
      onRefreshPrice={handleRefresh}
    />
  )
}
