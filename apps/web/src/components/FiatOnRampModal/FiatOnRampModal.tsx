import { Trans, useTranslation } from '@pancakeswap/localization'
import {
  AutoColumn,
  Box,
  CircleLoader,
  Flex,
  Heading,
  InjectedModalProps,
  ModalTitle,
  ModalWrapper,
  Text,
  useModal,
} from '@pancakeswap/uikit'
import { LoadingDot } from '@pancakeswap/uikit/widgets/Liquidity'

import { CommitButton } from 'components/CommitButton'
import { MERCURYO_WIDGET_ID, MERCURYO_WIDGET_URL } from 'config/constants/endpoints'
import { useActiveChainId } from 'hooks/useActiveChainId'
import Script from 'next/script'
import { Dispatch, ReactNode, SetStateAction, memo, useCallback, useEffect, useState } from 'react'
import { styled, useTheme } from 'styled-components'
import OnRampProviderLogo from 'views/BuyCrypto/components/OnRampProviderLogo/OnRampProviderLogo'
import { ONRAMP_PROVIDERS, chainIdToMercuryoNetworkId } from 'views/BuyCrypto/constants'
import { CryptoFormView } from 'views/BuyCrypto/types'
import { ErrorText } from 'views/Swap/components/styleds'
import { useAccount } from 'wagmi'
import { nanoid } from '@reduxjs/toolkit'
import {
  fetchMercuryoSignedUrl,
  fetchMoonPaySignedUrl,
  fetchTransakSignedUrl,
} from 'views/BuyCrypto/hooks/useIframeUrlFetcher'

export const StyledIframe = styled.iframe<{ isDark: boolean }>`
  height: 90%;
  width: 100%;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  position: absolute;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`

const IFrameWrapper = styled(Flex)`
  height: 90%;
  width: 100%;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => (theme.isDark ? '#27262C' : 'white')};
  position: absolute;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  padding-bottom: 18px;
`
const StyledBackArrowContainer = styled(Box)`
  position: absolute;
  right: 10%;
  &:hover {
    cursor: pointer;
  }
`

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  display: flex;
  padding: 12px 24px;
  position: relative;

  ${({ theme }) => theme.mediaQueries.md} {
    background: ${({ background }) => background || 'transparent'};
  }
`

interface FiatOnRampProps {
  provider: keyof typeof ONRAMP_PROVIDERS
  inputCurrency: string
  outputCurrency: string
  amount: string
  setModalView: Dispatch<SetStateAction<CryptoFormView>>
}

interface IProviderIFrameProps {
  provider: keyof typeof ONRAMP_PROVIDERS
  loading: boolean
  signedIframeUrl: string
}

const LoadingBuffer = ({ loading }: { loading: boolean }) => {
  if (!loading) return <></>
  return (
    <IFrameWrapper justifyContent="center" alignItems="center" style={{ zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <LoadingDot />
        <CircleLoader />
      </div>
    </IFrameWrapper>
  )
}

const ProviderIFrame = ({ provider, loading, signedIframeUrl }: IProviderIFrameProps) => {
  const theme = useTheme()
  const providerIframeId = `${ONRAMP_PROVIDERS[provider].toLowerCase()}_iframe`

  if (provider === ONRAMP_PROVIDERS.MoonPay || provider === ONRAMP_PROVIDERS.Transak) {
    return (
      <>
        <LoadingBuffer loading={loading} />
        <StyledIframe
          id={providerIframeId}
          src={signedIframeUrl}
          title="fiat-onramp-iframe"
          isDark={theme.isDark}
          allow="camera;microphone;fullscreen;payment"
        />
      </>
    )
  }
  return (
    <>
      <LoadingBuffer loading={loading} />
      <IFrameWrapper id="mercuryo-widget" />;
    </>
  )
}

export const FiatOnRampModalButton = ({
  provider,
  inputCurrency,
  outputCurrency,
  amount,
  disabled,
  setModalView,
}: FiatOnRampProps & { disabled: boolean }) => {
  const { t } = useTranslation()
  const [onPresentConfirmModal] = useModal(
    <FiatOnRampModal
      provider={provider}
      inputCurrency={inputCurrency}
      outputCurrency={outputCurrency}
      amount={amount}
      setModalView={setModalView}
    />,
  )

  let buttonText: ReactNode | string = t(`Buy with %provider%`, { provider })
  if (disabled) {
    buttonText = (
      <>
        <Flex alignItems="center">
          <Text px="4px" fontWeight="bold" color="white">
            {t('Fetching Quotes')}
          </Text>
          <CircleLoader stroke="white" />
        </Flex>
      </>
    )
  }
  return (
    <AutoColumn gap="md">
      <CommitButton onClick={onPresentConfirmModal} disabled={disabled} isLoading={disabled} mb="10px" mt="16px">
        {buttonText}
      </CommitButton>
    </AutoColumn>
  )
}

export const FiatOnRampModal = memo<InjectedModalProps & FiatOnRampProps>(function ConfirmSwapModalComp({
  onDismiss,
  inputCurrency,
  outputCurrency,
  amount,
  provider,
  setModalView,
}) {
  const [scriptLoaded, setScriptOnLoad] = useState<boolean>(Boolean(window?.mercuryoWidget))

  const [error, setError] = useState<boolean | string | null>(false)
  const [signedIframeUrl, setSignedIframeUrl] = useState<string>('')
  const [sig, setSig] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()

  const theme = useTheme()
  const account = useAccount()

  const handleDismiss = useCallback(async () => {
    onDismiss?.()
    setModalView(CryptoFormView.Input)
  }, [onDismiss, setModalView])

  const fetchSignedIframeUrl = useCallback(async () => {
    if (!account.address) {
      setError(t('Please connect an account before making a purchase.'))
      return
    }
    setLoading(true)
    setError(null)

    try {
      let result = ''
      if (provider === ONRAMP_PROVIDERS.MoonPay) {
        result = await fetchMoonPaySignedUrl(
          inputCurrency,
          outputCurrency,
          amount,
          theme.isDark,
          account.address,
          chainId as number,
        )
      } else if (provider === ONRAMP_PROVIDERS.Transak) {
        result = await fetchTransakSignedUrl(inputCurrency, outputCurrency, amount, account.address, chainId as number)
      }
      setSignedIframeUrl(result)
    } catch (e: any) {
      setError(e.toString())
    } finally {
      setTimeout(() => setLoading(false), 2000)
    }
  }, [account.address, theme.isDark, inputCurrency, outputCurrency, amount, t, chainId, provider])

  useEffect(() => {
    const fetchSig = async () => {
      setLoading(true)
      setError(null)
      try {
        const signature = await fetchMercuryoSignedUrl(account.address as string)
        setSig(signature as string)
      } catch (e: any) {
        setError(e.toString())
      } finally {
        setTimeout(() => setLoading(false), 2000)
      }
    }
    fetchSig()
  }, [account.address])

  useEffect(() => {
    if (provider === ONRAMP_PROVIDERS.Mercuryo) {
      if (sig && window?.mercuryoWidget) {
        const transactonId = nanoid()
        // @ts-ignore
        const MC_WIDGET = window?.mercuryoWidget
        MC_WIDGET.run({
          widgetId: MERCURYO_WIDGET_ID,
          fiatCurrency: outputCurrency.toUpperCase(),
          currency: inputCurrency.toUpperCase(),
          fiatAmount: amount,
          fixAmount: true,
          fixFiatAmount: true,
          fixFiatCurrency: true,
          fixCurrency: true,
          address: account.address,
          signature: sig,
          network: chainIdToMercuryoNetworkId[chainId as number],
          merchantTransactionId: `${account.address}_${transactonId}`,
          host: document.getElementById('mercuryo-widget'),
          theme: theme.isDark ? 'PCS_dark' : 'PCS_light',
        })
      }
    } else fetchSignedIframeUrl()
  }, [
    fetchSignedIframeUrl,
    provider,
    sig,
    account.address,
    amount,
    inputCurrency,
    outputCurrency,
    theme,
    scriptLoaded,
    chainId,
  ])

  return (
    <>
      <ModalWrapper minHeight="700px" minWidth="360px">
        <ModalHeader background={theme.colors.gradientCardHeader}>
          <ModalTitle pt="6px" justifyContent="center">
            <StyledBackArrowContainer onClick={handleDismiss}>
              <Text color="primary">{t('Close')}</Text>
            </StyledBackArrowContainer>
            <Heading width="100%" textAlign="center" pr="20px">
              <OnRampProviderLogo provider={provider} />
            </Heading>
          </ModalTitle>
        </ModalHeader>
        {error ? (
          <Flex justifyContent="center" alignItems="center" alignContent="center">
            <ErrorText>
              <Trans>something went wrong!</Trans>
            </ErrorText>
          </Flex>
        ) : (
          <ProviderIFrame provider={provider} loading={loading} signedIframeUrl={signedIframeUrl} />
        )}
      </ModalWrapper>
      <Script
        src={MERCURYO_WIDGET_URL}
        onLoad={() => {
          setScriptOnLoad(true)
        }}
      />
    </>
  )
})

export default FiatOnRampModal
