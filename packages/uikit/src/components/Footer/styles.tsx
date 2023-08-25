import styled from "styled-components";
import { darkColors } from "../../theme";
import { Box, Flex } from "../Box";
import SocialLinks from "./Components/SocialLinks";

export const StyledList = styled.ul`
  list-style: none;
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0;
  }
`;

export const StyledListItem = styled.li`
  font-size: 16px;
  margin-bottom: 8px;
  text-transform: capitalize;

  &:first-child {
    color: ${darkColors.secondary};
    font-weight: 600;
    text-transform: uppercase;
  }
`;

export const StyledIconMobileContainer = styled(Box)`
  margin-bottom: 24px;
`;

export const StyledToolsContainer = styled(Flex)`
  border-color: ${darkColors.cardBorder};
  border-top-width: 1px;
  border-style: solid;
  padding: 24px 0;
  padding-bottom: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    border-top-width: 0;
    border-bottom-width: 0;
    padding: 0 0;
    margin-bottom: 0;
  }
`;

export const StyledSocialLinks = styled(SocialLinks)`
  border-bottom: 1px solid ${darkColors.cardBorder};
`;

export const StyledText = styled.span`
  color: ${darkColors.text};
`;

export const StyledFooter = styled.section`
  //background: ${darkColors.backgroundAlt};
  background-color: #1b1c30;
`;

export const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 30px;
  padding-bottom: 30px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 12px;
    padding-right: 12px;
  }
`;

export const ListItem = styled.li`
  list-style-type: none;
  margin: 0 10px;
  cursor: pointer;
  transition: 0.3s all;

  &:hover {
    color: #4e09f8;
  }
`;

export const TextH = styled.h3`
  font-size: 16px;
  text-transform: uppercase;
  font-family: "Base Mono", sans-serif;

  margin-bottom: 15px;
`;

export const TextP = styled.p`
  font-size: 12px;
  line-height: 1.5;
  color: #a0a3c4;
  margin-bottom: 25px;
`;

export const Input = styled.input`
  width: 100%;
  line-height: 44px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 6px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-family: "Base Display", sans-serif;
  outline: none;
`;

export const Button = styled.button`
  width: 100%;
  height: 36px;
  padding: 0 20px;
  font-size: 12px;
  outline: none;
  cursor: pointer;
  box-shadow: none;
  border-radius: 6px;
  background: #4e09f8;
  color: white;
  text-transform: uppercase;
  border: none;

  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  &:hover,
  &:focus {
    opacity: 0.9;
  }
`;

export const SocialIcon = styled.div`
  cursor: pointer;
  color: white;
  transition: 0.3s all;
  font-size: 24px;

  &:hover {
    color: #4e09f8;
  }
`;
