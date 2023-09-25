import styled from "styled-components";
import { ButtonMenuItem } from "../../components";

export const StyledTimeButtonMenuItem = styled(ButtonMenuItem)`
  border-radius: 6px;
  ${(e): string => {
    if (e.isActive) {
      return `
      background-color: #4E09F8;
      &:hover:not(:disabled):not(:active) {
        opacity: 1 !important; 
        background-color: #4E09F8;
      }  
      `;
    }
    return ``;
  }}
`;
