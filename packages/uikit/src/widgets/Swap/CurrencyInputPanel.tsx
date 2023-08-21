import { AtomBox } from "@pancakeswap/ui";
import styled from "styled-components";
import { inputContainerVariants } from "./SwapWidget.css";

import { NumericalInput, NumericalInputProps } from "./NumericalInput";
import { Text } from "../../components";

type ZapStyle = "noZap" | "zap";

interface CurrencyInputPanelProps extends Omit<NumericalInputProps, "onBlur"> {
  onInputBlur?: () => void;
  id: string;
  zapStyle?: ZapStyle;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  showBridgeWarning?: boolean;
  backgroundColor?: string;
}

const InputStyle = styled(AtomBox)<{ backgroundColor?: string }>`
  background-color: ${({ theme, backgroundColor }) => backgroundColor ?? theme.colors.input};
  border: ${({ backgroundColor }) => backgroundColor === "transparent" && "1px solid white"};
`;

export function CurrencyInputPanel({
  value,
  onUserInput,
  onInputBlur,
  zapStyle,
  top,
  bottom,
  id,
  disabled,
  error,
  loading,
  showBridgeWarning,
  backgroundColor,
}: CurrencyInputPanelProps) {
  return (
    <AtomBox position="relative" id={id} display="grid" gap="4px">
      <AtomBox display="flex" flexDirection="column" flexWrap="nowrap" position="relative" zIndex="1">
        <InputStyle
          as="label"
          className={inputContainerVariants({
            hasZapStyle: !!zapStyle,
            showBridgeWarning: !!showBridgeWarning,
            error: Boolean(error),
          })}
          backgroundColor={backgroundColor}
        >
          <AtomBox
            display="flex"
            flexDirection="row"
            flexWrap="nowrap"
            color="text"
            fontSize="12px"
            lineHeight="16px"
            px="16px"
            pt="12px"
          >
            <AtomBox display="flex" alignItems="center" justifyContent="space-between">
              {top}
            </AtomBox>
            <NumericalInput
              error={Boolean(error)}
              disabled={disabled}
              loading={loading}
              className="token-amount-input"
              value={value}
              onBlur={onInputBlur}
              onUserInput={(val) => {
                onUserInput(val);
              }}
            />
          </AtomBox>
          {bottom}
        </InputStyle>

        {error ? (
          <Text pb="8px" fontSize="12px" color="red">
            {error}
          </Text>
        ) : null}

        {disabled && (
          <AtomBox role="presentation" position="absolute" inset="0px" backgroundColor="backgroundAlt" opacity="0.6" />
        )}
      </AtomBox>
    </AtomBox>
  );
}
