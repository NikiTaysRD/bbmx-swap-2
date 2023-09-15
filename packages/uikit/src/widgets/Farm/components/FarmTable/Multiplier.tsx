import styled from "styled-components";
import { HelpIcon } from "../../../../components/Svg";
import { Skeleton } from "../../../../components/Skeleton";
import { useTooltip } from "../../../../hooks/useTooltip";
import { FarmTableMultiplierProps } from "../../types";
import { FarmMultiplierInfo } from "../FarmMultiplierInfo";
import { baseDisplay } from "../../../../../../../apps/web/src/pages/_app";

const ReferenceElement = styled.div`
  display: inline-block;
`;

const MultiplierWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: 36px;
  text-align: right;
  margin-right: 4px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }

  font-size: 16px;
  line-height: 160%;
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Multiplier: React.FunctionComponent<React.PropsWithChildren<FarmTableMultiplierProps>> = ({
  multiplier,
  farmCakePerSecond,
  totalMultipliers,
}) => {
  const displayMultiplier = multiplier ? multiplier.toLowerCase() : <Skeleton width={30} />;

  const tooltipContent = FarmMultiplierInfo({
    farmCakePerSecond: farmCakePerSecond ?? "-",
    totalMultipliers: totalMultipliers ?? "-",
  });
  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, {
    placement: "top-end",
    tooltipOffset: [20, 10],
  });

  return (
    <Container>
      <MultiplierWrapper className={baseDisplay.className}>{displayMultiplier}</MultiplierWrapper>
      {/* <ReferenceElement ref={targetRef}> */}
      {/*  <HelpIcon color="textSubtle" /> */}
      {/* </ReferenceElement> */}
      {/* {tooltipVisible && tooltip} */}
    </Container>
  );
};

export default Multiplier;
