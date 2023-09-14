import { useState, memo, ReactNode, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDelayedUnmount } from "@pancakeswap/hooks";
import { ExpandActionCell } from "../Cells/ExpandActionCell";
import useMatchBreakpoints from "../../../contexts/MatchBreakpoints/useMatchBreakpoints";
import { Flex } from "../../../components";

const StyledRow = styled.div`
  display: flex;
  cursor: pointer;
  background: #1b1c30;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

export const ExpandRow: React.FC<
  React.PropsWithChildren<{ children: ReactNode; panel: ReactNode; initialActivity?: boolean }>
> = memo(({ children, panel, initialActivity = false }) => {
  const hasSetInitialValue = useRef(false);
  const { isTablet, isDesktop } = useMatchBreakpoints();

  const [expanded, setExpanded] = useState(initialActivity);
  const shouldRenderActionPanel = useDelayedUnmount(expanded, 300);

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);
  useEffect(() => {
    if (initialActivity && hasSetInitialValue.current === false) {
      setExpanded(initialActivity);
      hasSetInitialValue.current = true;
    }
  }, [initialActivity]);

  return (
    <>
      <StyledRow role="row" onClick={toggleExpanded}>
        <Flex width="100%" flexDirection="column">
          <Flex flexDirection="row" alignItems="center">
            {children}
            <ExpandActionCell expanded={expanded} isFullLayout={isTablet || isDesktop} />
          </Flex>
          {shouldRenderActionPanel && panel}
        </Flex>
      </StyledRow>
    </>
  );
});
