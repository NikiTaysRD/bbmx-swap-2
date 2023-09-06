import { FC, useCallback } from 'react'

import CurrencyInputHeader from '../../components/CurrencyInputHeader'

export const FormHeader: FC<{
  refreshDisabled: boolean
  onRefresh: () => void
  setIsShowMarket?: (param: boolean) => void
  isShowMarket?: boolean
  setIsLimitOpened?: () => void
  setIsSettingsOpened?: () => void
  isSwap?: boolean
}> = ({ refreshDisabled, setIsShowMarket, onRefresh, isShowMarket, setIsLimitOpened, setIsSettingsOpened, isSwap }) => {
  const handleRefresh = useCallback(() => {
    if (refreshDisabled) {
      return
    }
    onRefresh()
  }, [onRefresh, refreshDisabled])

  return (
    <CurrencyInputHeader
      setIsShowMarket={setIsShowMarket}
      isShowMarket={isShowMarket}
      title=""
      subtitle=""
      hasAmount={!refreshDisabled}
      onRefreshPrice={handleRefresh}
      setIsLimitOpened={setIsLimitOpened}
      setIsSettingsOpened={setIsSettingsOpened}
      isSwap={isSwap}
    />
  )
}
