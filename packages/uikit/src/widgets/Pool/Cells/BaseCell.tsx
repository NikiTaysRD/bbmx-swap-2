import styled from "styled-components";
import { Flex, Text } from "../../../components";

export const BaseCell = styled(Flex)`
  color: black;
  padding: 24px 10px;
  flex-direction: column;
  justify-content: flex-start;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 24px 8px;
  }
`;

export const CellContent = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
  max-height: 40px;
  min-width: 40px;
  ${Text} {
    line-height: 1;
  }
  gap: 5px;
`;
