import styled from "styled-components";

import { ChevronDownIcon } from "../../../components";
import { BaseCell } from "./BaseCell";

interface ExpandActionCellProps {
  expanded: boolean;
  isFullLayout?: boolean;
}

const StyledCell = styled(BaseCell)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding-right: 12px;
  padding-left: 0;

  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 50px;
    margin-right: 30px;
    padding-right: 0;
  }

  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  margin-left: auto;
  border-radius: 12px;
  background: rgb(16, 17, 36);

  svg {
    height: 30px;
    width: 100%;
  }
`;

const ArrowIcon = styled((props) => <ChevronDownIcon {...props} />)`
  transform: ${({ toggled }) => (toggled ? "rotate(180deg)" : "rotate(0)")};
  height: 24px;
`;

export const ExpandActionCell: React.FC<React.PropsWithChildren<ExpandActionCellProps>> = ({ expanded }) => {
  return (
    <StyledCell role="cell">
      <ArrowIcon color="primary" toggled={expanded} />
    </StyledCell>
  );
};
