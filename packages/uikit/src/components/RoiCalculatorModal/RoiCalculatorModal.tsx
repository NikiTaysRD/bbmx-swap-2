import { useTranslation } from "@pancakeswap/localization";
import { getBalanceNumber } from "@pancakeswap/utils/formatBalance";
import BigNumber from "bignumber.js";
import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import RoiCalculatorFooter from "./RoiCalculatorFooter";
import RoiCard from "./RoiCard";
import useRoiCalculatorReducer, {
  CalculatorMode,
  DefaultCompoundStrategy,
  EditingCurrency,
} from "./useRoiCalculatorReducer";
import AnimatedArrow from "./AnimatedArrow";
import { Flex } from "../Box";
import { Text } from "../Text";
import { HelpIcon } from "../Svg";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Modal } from "../../widgets/Modal";
import { BalanceInput } from "../BalanceInput";
import { useTooltip } from "../../hooks/useTooltip";
import { ButtonMenu, ButtonMenuItem } from "../ButtonMenu";
import { FullWidthButtonMenu } from "../../widgets/RoiCalculator/FullWidthButtonMenu";
import { StyledTimeButtonMenuItem } from "../../widgets/RoiCalculator/StyledTimeButtonMenuItem";

const StyledModal = styled(Modal)`
  font-family: "Base Display", sans-serif;

  & > :nth-child(2) {
    padding: 0;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 380px;
  }
`;

export const ScrollableContainer = styled.div`
  padding: 24px;
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`;

export interface RoiCalculatorModalProps {
  account: string;
  pid?: number;
  earningTokenPrice: number;
  apr?: number;
  apy?: number;
  displayApr?: string;
  linkLabel: string;
  linkHref: string;
  stakingTokenBalance: BigNumber;
  stakingTokenDecimals: number;
  stakingTokenSymbol: string;
  stakingTokenPrice: number;
  earningTokenSymbol?: string;
  multiplier?: string;
  autoCompoundFrequency?: number;
  performanceFee?: number;
  isFarm?: boolean;
  initialState?: any;
  initialValue?: string;
  strategy?: any;
  header?: React.ReactNode;
  rewardCakePerSecond?: boolean;
  onBack?: () => void;
  onDismiss?: () => void;
  bCakeCalculatorSlot?: (stakingTokenBalance: string) => React.ReactNode;
  isLocked?: boolean;
  stableSwapAddress?: string;
  stableLpFee?: number;
  farmCakePerSecond?: string;
  totalMultipliers?: string;
}

const StyledBalanceInput = styled(BalanceInput)`
  border-radius: 10px;
  background: #101124;
  padding: 10px 20px 10px 15px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  text-transform: uppercase;
  height: 30px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
`;

const RoiCalculatorModal: React.FC<React.PropsWithChildren<RoiCalculatorModalProps>> = ({
  account,
  earningTokenPrice,
  apr,
  apy,
  displayApr,
  linkLabel,
  linkHref,
  stakingTokenBalance,
  stakingTokenSymbol,
  stakingTokenPrice,
  multiplier,
  initialValue,
  earningTokenSymbol = "CAKE",
  autoCompoundFrequency = 0,
  performanceFee = 0,
  isFarm = false,
  initialState,
  strategy,
  header,
  children,
  stakingTokenDecimals,
  rewardCakePerSecond,
  onBack,
  onDismiss,
  bCakeCalculatorSlot,
  isLocked = false,
  stableSwapAddress,
  stableLpFee,
  farmCakePerSecond,
  totalMultipliers,
}) => {
  const { t } = useTranslation();
  const balanceInputRef = useRef<HTMLInputElement | null>(null);

  const {
    state,
    setPrincipalFromUSDValue,
    setPrincipalFromTokenValue,
    setStakingDuration,
    toggleCompounding,
    toggleEditingCurrency,
    setCompoundingFrequency,
    setCalculatorMode,
    setTargetRoi,
    dispatch,
  } = useRoiCalculatorReducer({ stakingTokenPrice, earningTokenPrice, autoCompoundFrequency }, initialState);

  const { compounding, activeCompoundingIndex, stakingDuration, editingCurrency } = state.controls;
  const { principalAsUSD, principalAsToken } = state.data;

  // Auto-focus input on opening modal
  useEffect(() => {
    if (balanceInputRef.current) {
      balanceInputRef.current.focus();
    }
  }, []);

  // If user comes to calculator from staking modal - initialize with whatever they put in there
  useEffect(() => {
    if (initialValue) {
      setPrincipalFromTokenValue(initialValue);
    }
  }, [initialValue, setPrincipalFromTokenValue]);

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    isFarm
      ? t("“My Balance” here includes both LP Tokens in your wallet, and LP Tokens already staked in this farm.")
      : t(
          "“My Balance” here includes both %assetSymbol% in your wallet, and %assetSymbol% already staked in this pool.",
          { assetSymbol: stakingTokenSymbol }
        ),
    { placement: "top-end", tooltipOffset: [20, 10] }
  );

  const onBalanceFocus = () => {
    setCalculatorMode(CalculatorMode.ROI_BASED_ON_PRINCIPAL);
  };
  const editingUnit = editingCurrency === EditingCurrency.TOKEN ? stakingTokenSymbol : "USD";
  const editingValue = editingCurrency === EditingCurrency.TOKEN ? principalAsToken : principalAsUSD;
  const conversionUnit = editingCurrency === EditingCurrency.TOKEN ? "USD" : stakingTokenSymbol;
  const conversionValue = editingCurrency === EditingCurrency.TOKEN ? principalAsUSD : principalAsToken;
  const onUserInput = editingCurrency === EditingCurrency.TOKEN ? setPrincipalFromTokenValue : setPrincipalFromUSDValue;

  const DURATION = useMemo(() => [t("1D"), t("7D"), t("30D"), t("1Y"), t("5Y")], [t]);

  const isDisableMyBalance = useMemo(() => {
    return (
      !Number.isFinite(stakingTokenPrice) || !stakingTokenBalance.isFinite() || stakingTokenBalance.lte(0) || !account
    );
  }, [account, stakingTokenBalance, stakingTokenPrice]);

  return (
    <StyledModal
      title={t("ROI Calculator")}
      onDismiss={onBack || onDismiss}
      onBack={onBack}
      headerBackground="gradientCardHeader"
    >
      <ScrollableContainer>
        {strategy ? (
          strategy(state, dispatch)
        ) : (
          <DefaultCompoundStrategy
            state={state}
            apr={apy ?? apr}
            dispatch={dispatch}
            earningTokenPrice={earningTokenPrice}
            performanceFee={performanceFee}
            stakingTokenPrice={stakingTokenPrice}
          />
        )}
        {header}
        <Flex flexDirection="column" mb="8px">
          <Text color="#4e09f8" bold fontSize="12px" textTransform="uppercase">
            {t("%asset% staked", { asset: stakingTokenSymbol })}
          </Text>
          <StyledBalanceInput
            inputProps={{ scale: "sm" }}
            currencyValue={`${conversionValue} ${conversionUnit}`}
            innerRef={balanceInputRef}
            placeholder="0.00"
            value={editingValue}
            unit={editingUnit}
            decimals={stakingTokenDecimals}
            onUserInput={onUserInput}
            switchEditingUnits={toggleEditingCurrency}
            onFocus={onBalanceFocus}
          />
          <Flex justifyContent="space-between" mt="8px" style={{ gap: "10px" }}>
            <StyledButton
              scale="xs"
              p="4px 16px"
              width="68px"
              variant="tertiary"
              onClick={() => setPrincipalFromUSDValue("100")}
            >
              $100
            </StyledButton>
            <StyledButton
              scale="xs"
              p="4px 16px"
              width="68px"
              variant="tertiary"
              onClick={() => setPrincipalFromUSDValue("1000")}
            >
              $1000
            </StyledButton>
            <StyledButton
              scale="xs"
              p="4px 16px"
              width="128px"
              variant="tertiary"
              style={{ textTransform: "uppercase" }}
              disabled={isDisableMyBalance}
              onClick={() =>
                setPrincipalFromUSDValue(
                  getBalanceNumber(stakingTokenBalance.times(stakingTokenPrice), stakingTokenDecimals).toString()
                )
              }
            >
              {t("My Balance")}
            </StyledButton>
            <span ref={targetRef}>
              <HelpIcon width="16px" height="16px" color="textSubtle" />
            </span>
            {tooltipVisible && tooltip}
          </Flex>
          {children || (
            <>
              <Text mt="24px" color="#4e09f8" bold fontSize="12px" textTransform="uppercase">
                {t("Staked for")}
              </Text>
              <FullWidthButtonMenu activeIndex={stakingDuration} onItemClick={setStakingDuration} scale="sm">
                {DURATION.map((duration) => (
                  <StyledTimeButtonMenuItem key={duration} variant="tertiary">
                    {duration}
                  </StyledTimeButtonMenuItem>
                ))}
              </FullWidthButtonMenu>
            </>
          )}
          {bCakeCalculatorSlot && bCakeCalculatorSlot(principalAsToken)}
          {autoCompoundFrequency === 0 && (
            <>
              <Text mt="24px" color="#4e09f8" bold fontSize="12px" textTransform="uppercase">
                {t("Compounding every")}
              </Text>
              <Flex alignItems="center">
                <Flex flex="1">
                  <Checkbox scale="sm" checked={compounding} onChange={toggleCompounding} />
                </Flex>
                <Flex flex="6">
                  <FullWidthButtonMenu
                    scale="sm"
                    disabled={!compounding}
                    activeIndex={activeCompoundingIndex}
                    onItemClick={setCompoundingFrequency}
                  >
                    <StyledTimeButtonMenuItem>{t("1D")}</StyledTimeButtonMenuItem>
                    <StyledTimeButtonMenuItem>{t("7D")}</StyledTimeButtonMenuItem>
                    <StyledTimeButtonMenuItem>{t("14D")}</StyledTimeButtonMenuItem>
                    <StyledTimeButtonMenuItem>{t("30D")}</StyledTimeButtonMenuItem>
                  </FullWidthButtonMenu>
                </Flex>
              </Flex>
            </>
          )}
        </Flex>
        <AnimatedArrow calculatorState={state} />
        <Flex>
          <RoiCard
            calculatorState={state}
            earningTokenSymbol={earningTokenSymbol}
            setTargetRoi={setTargetRoi}
            setCalculatorMode={setCalculatorMode}
          />
        </Flex>
      </ScrollableContainer>
      <RoiCalculatorFooter
        isFarm={isFarm}
        apr={apr}
        apy={apy}
        displayApr={displayApr}
        autoCompoundFrequency={autoCompoundFrequency}
        multiplier={multiplier}
        linkLabel={linkLabel}
        linkHref={linkHref}
        performanceFee={performanceFee}
        rewardCakePerSecond={rewardCakePerSecond}
        isLocked={isLocked}
        stableSwapAddress={stableSwapAddress}
        stableLpFee={stableLpFee}
        farmCakePerSecond={farmCakePerSecond}
        totalMultipliers={totalMultipliers}
      />
    </StyledModal>
  );
};

export default RoiCalculatorModal;
