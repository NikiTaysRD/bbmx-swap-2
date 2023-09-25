import styled from "styled-components";

import { ButtonMenu } from "../../components";

export const FullWidthButtonMenu = styled(ButtonMenu)<{ disabled?: boolean }>`
  width: 100%;
  border-radius: 6px;
  background: #101124;
  border: none;

  & > button {
    width: 100%;
  }

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
