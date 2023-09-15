import { useTranslation } from "@pancakeswap/localization";
import { Currency, CurrencyAmount } from "@pancakeswap/sdk";
import { memo, useCallback } from "react";
import styled from "styled-components";

import {
  BalanceInput,
  Text,
  Flex,
  Button,
  Box,
  QuestionHelper,
  RowBetween,
  CurrencyLogo,
  Card,
  CardBody,
} from "../../components";

type Props = UsdAmountInputProps & TokenAmountsDisplayProps;

export const DepositAmountInput = memo(function DepositAmountInput({
  value,
  max,
  onChange,
  amountA,
  amountB,
  currencyA,
  currencyB,
  maxLabel,
}: Props) {
  return (
    <>
      <Box mb="1em">
        <DepositUsdAmountInput value={value} max={max} onChange={onChange} maxLabel={maxLabel} />
      </Box>
      <TokenAmountsDisplay amountA={amountA} amountB={amountB} currencyA={currencyA} currencyB={currencyB} />
    </>
  );
});

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

interface UsdAmountInputProps {
  value?: string;
  max?: string;
  onChange?: (val: string) => void;
  maxLabel?: string;
}

export const DepositUsdAmountInput = memo(function DepositUsdAmountInput({
  value = "",
  max = "",
  onChange = () => {
    // default
  },
  maxLabel,
}: UsdAmountInputProps) {
  const { t } = useTranslation();

  const onMax = useCallback(() => onChange(max), [max, onChange]);

  return (
    <>
      <Box mb="0.5em" width="100%">
        <StyledBalanceInput value={value} onUserInput={onChange} unit={<Text color="textSubtle">{t("USD")}</Text>} />
      </Box>
      <Flex style={{ gap: "5px" }}>
        <Flex flex="3" mr="0.25em">
          <StyledButton variant={value === "100" ? "primary" : "tertiary"} scale="xs" onClick={() => onChange("100")}>
            $100
          </StyledButton>
        </Flex>
        <Flex flex="3" mr="0.25em">
          <StyledButton variant={value === "1000" ? "primary" : "tertiary"} scale="xs" onClick={() => onChange("1000")}>
            $1,000
          </StyledButton>
        </Flex>
        <Flex flex="4">
          <StyledButton variant={value === max ? "primary" : "tertiary"} scale="xs" mr="0.25em" onClick={onMax}>
            {maxLabel || t("Max")}
          </StyledButton>
        </Flex>
        <Flex>
          <QuestionHelper
            text={t("Automatically fill in the maximum token amount according to your balance and position settings.")}
            placement="top"
          />
        </Flex>
      </Flex>
    </>
  );
});

interface TokenAmountsDisplayProps {
  currencyA?: Currency;
  currencyB?: Currency;
  amountA?: CurrencyAmount<Currency>;
  amountB?: CurrencyAmount<Currency>;
}

const TokenDisplayRow = memo(function TokenDisplayRow({
  amount,
  currency,
}: {
  amount?: CurrencyAmount<Currency>;
  currency?: Currency;
}) {
  if (!currency) {
    return null;
  }

  return (
    <RowBetween>
      <Flex>
        <CurrencyLogo currency={currency} />
        <Text color="textSubtle" ml="0.25em">
          {currency.symbol}
        </Text>
      </Flex>
      <Text>{amount?.toExact() || "0"}</Text>
    </RowBetween>
  );
});

const TokensDisplay = styled.div`
  padding: 20px 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 25px;
`;

export const TokenAmountsDisplay = memo(function TokenAmountsDisplay({
  amountA,
  amountB,
  currencyA,
  currencyB,
}: TokenAmountsDisplayProps) {
  if (!currencyA && !currencyB) {
    return null;
  }

  return (
    <TokensDisplay>
      <Box mb="0.5em">
        <TokenDisplayRow amount={amountA} currency={currencyA} />
      </Box>
      <TokenDisplayRow amount={amountB} currency={currencyB} />
    </TokensDisplay>
  );
});
