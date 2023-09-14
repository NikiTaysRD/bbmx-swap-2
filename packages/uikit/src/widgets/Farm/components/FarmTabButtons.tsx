import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTranslation } from "@pancakeswap/localization";
import { NextLinkFromReactRouter } from "../../../components/NextLink";
import { NotificationDot } from "../../../components/NotificationDot";
import { ButtonMenu, ButtonMenuItem, ButtonMenuItemProps } from "../../../components/ButtonMenu";
import { Text } from "../../../components/Text";
import { Flex } from "../../../components/Box";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  // ${({ theme }) => theme.mediaQueries.sm} {
  //   margin-left: 16px;
  // }
`;

interface FarmTabButtonsProps {
  hasStakeInFinishedFarms: boolean;
}

const FarmButtonMenu = styled(ButtonMenu)`
  background-color: #1b1c30;
  border-radius: 6px;
`;

const FarmButtonMenuItem = styled(ButtonMenuItem)`
  ${(e) => {
    if (e.isActive) {
      return ` 
      border-radius: 6px;
      background-color: #4E09F8;
      color: #FFFFFF;
      &:hover:not(:disabled):not(:active) {
        opacity: 1 !important; 
        background-color: #4E09F8;
      } 
      `;
    }

    return ``;
  }}
`;

export const FarmTabButtons: React.FC<React.PropsWithChildren<FarmTabButtonsProps>> = ({ hasStakeInFinishedFarms }) => {
  const router = useRouter();
  const { t } = useTranslation();

  let activeIndex;
  switch (router.pathname) {
    case "/farms":
      activeIndex = 0;
      break;
    case "/farms/history":
      activeIndex = 1;
      break;
    case "/_mp/farms/history":
      activeIndex = 1;
      break;
    case "/farms/archived":
      activeIndex = 2;
      break;
    default:
      activeIndex = 0;
      break;
  }

  return (
    <Wrapper>
      <Flex width="max-content" flexDirection="row">
        <FarmButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
          <FarmButtonMenuItem forwardedAs={NextLinkFromReactRouter} to="/farms">
            {t("Live")}
          </FarmButtonMenuItem>
          <FarmButtonMenuItem forwardedAs={NextLinkFromReactRouter} to="/farms/history" id="finished-farms-button">
            {t("Finished")}
          </FarmButtonMenuItem>
        </FarmButtonMenu>
      </Flex>
    </Wrapper>
  );
};
