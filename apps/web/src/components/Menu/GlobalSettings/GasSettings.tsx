import { Flex, Button, Text, QuestionHelper, FlexGap } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useGasPriceManager } from 'state/user/hooks'
import { GAS_PRICE_GWEI, GAS_PRICE } from 'state/types'
import { baseDisplay } from 'pages/_app'

const GasSettings = () => {
  const { t } = useTranslation()
  const [gasPrice, setGasPrice] = useGasPriceManager()

  return (
    <Flex flexDirection="column">
      <Flex mb="12px" alignItems="center">
        <Text fontSize="16px" className={baseDisplay.className}>
          Default Transaction Speed (GWEI)
        </Text>
        <QuestionHelper
          text={
            <Flex flexDirection="column">
              <Text>
                {t(
                  'Adjusts the gas price (transaction fee) for your transaction. Higher GWEI = higher speed = higher fees.',
                )}
              </Text>
              <Text mt="8px">{t('Choose “Default” to use the settings from your current blockchain RPC node.')}</Text>
            </Flex>
          }
          placement="top"
          ml="4px"
        />
      </Flex>
      <FlexGap gap="5px" flexWrap="wrap" mb="10px" justifyContent="space-evenly">
        <Button
          mt="4px"
          mr="4px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.rpcDefault)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.rpcDefault ? 'primary' : 'tertiary'}
          style={{ width: '45%' }}
        >
          <Text fontSize="10px">{t('Default')}</Text>
        </Button>
        <Button
          mt="4px"
          mr="4px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.default)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.default ? 'primary' : 'tertiary'}
          style={{ width: '45%' }}
        >
          <Text fontSize="10px"> {t('Standard (%gasPrice%)', { gasPrice: GAS_PRICE.default })}</Text>
        </Button>
        <Button
          mt="4px"
          mr="4px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.fast)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.fast ? 'primary' : 'tertiary'}
          style={{ width: '45%' }}
        >
          <Text fontSize="10px"> {t('Fast (%gasPrice%)', { gasPrice: GAS_PRICE.fast })}</Text>
        </Button>
        <Button
          mr="4px"
          mt="4px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.instant)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.instant ? 'primary' : 'tertiary'}
          style={{ width: '45%' }}
        >
          <Text fontSize="10px"> {t('Instant (%gasPrice%)', { gasPrice: GAS_PRICE.instant })}</Text>
        </Button>
      </FlexGap>
    </Flex>
  )
}

export default GasSettings
