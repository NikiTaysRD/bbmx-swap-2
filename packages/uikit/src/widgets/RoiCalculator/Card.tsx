import styled from "styled-components";

import { Box } from "../../components";

export const Card = styled(Box)<{
  width?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
}>`
  width: ${({ width }) => width ?? "100%"};
  padding: ${({ padding }) => padding ?? "1.25rem"};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius ?? "16px"};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LightGreyCard = styled(Card)`
  padding: 3px 7px;
  border-radius: 6px;
  background: #101124;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;
