import styled from "styled-components";

import { ButtonProps, IconButton } from "../../components/Button";
import { ArrowDownIcon, ArrowUpDownIcon } from "../../components/Svg";
import { CurrencyInputPanel } from "./CurrencyInputPanel";
import { CurrencyInputHeader, CurrencyInputHeaderSubTitle, CurrencyInputHeaderTitle } from "./CurrencyInputHeader";
import { SwapPage as Page } from "./Page";
import { SwapFooter as Footer } from "./Footer";
import { SwapInfo as Info, SwapInfoLabel as InfoLabel } from "./SwapInfo";
import { TradePrice } from "./TradePrice";

const SwitchIconButton = styled(IconButton)`
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  border-radius: 6px;
  height: 44px;
  width: 44px;

  background: #1b1c30;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const SwitchButton = (props: ButtonProps) => (
  <SwitchIconButton variant="light" scale="sm" {...props}>
    <ArrowDownIcon className="icon-down" color="primary" />
    {/* <ArrowUpDownIcon className="icon-up-down" color="primary" /> */}
  </SwitchIconButton>
);

export {
  SwitchButton,
  CurrencyInputHeaderTitle,
  CurrencyInputHeaderSubTitle,
  CurrencyInputHeader,
  CurrencyInputPanel,
  Page,
  Footer,
  Info,
  InfoLabel,
  TradePrice,
};
