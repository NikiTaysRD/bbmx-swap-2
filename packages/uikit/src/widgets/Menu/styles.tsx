import styled, { css, keyframes } from "styled-components";
import { MENU_HEIGHT } from "./config";
import { Box } from "../../components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  //height: ${MENU_HEIGHT}px;
  background-color: transparent;
  //border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  transform: translate3d(0, 0, 0);
  margin-bottom: 80px;
  max-width: 1200px;
  z-index: 2;

  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 60px;
    padding-right: 60px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 60px;
    padding-right: 60px;
  }
`;

export const FixedContainer = styled.div<{ showMenu: boolean; height: number }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100%;
  z-index: 20;
`;

export const TopBannerContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  width: 100%;
`;

export const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
  max-width: 100vw;
`;

export const Inner = styled.div`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
`;

export const Item = styled.div`
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.3s all;

  &:hover {
    color: #4e09f8;
  }

  // ${({ theme }) => theme.mediaQueries.md} {
  //   font-size: 10px;
  // }
`;

export const DotItem = styled(Item)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  p {
    width: 100%;
    height: 50%;
  }

  position: relative;
`;

export const DesktopHiddenItems = styled.div`
  position: absolute;
  background: rgba(27, 28, 48, 0.8);

  color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;

  gap: 10px;

  top: 100%;
  left: 30%;
  width: 300px;
  min-height: 200px;
`;

export const Price = styled.span`
  font-size: 12px;
`;

export const BaseWrap = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
`;

export const Base = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  padding: 8px 10px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 5px 10px;
  }
`;

export const slideDown = keyframes`
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
`;

interface DropdownProps {
  open: boolean;
}

export const Dropdown = styled.div<DropdownProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 12px;
  border-radius: 6px;
  background: rgba(27, 28, 48, 0.8);
  backdrop-filter: blur(10px);
  left: 0;
  top: 37px;
  width: auto;

  transform-origin: top;
  ${(props) =>
    props.open
      ? css`
          animation: ${slideDown} 0.2s ease forwards;
        `
      : "none"}

  ${({ theme }) => theme.mediaQueries.md} {
    width: 180px;
  }
`;

export const DropdownLink = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 15px;
  font-size: 15px;
  transition: 0.3s all;
  cursor: pointer;

  &:hover {
    background-color: rgba(78, 9, 248, 0.05);
  }
`;

export const Burger = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 10px;
`;

export const Text = styled.p`
  display: block;
`;

export const BurgerMenu = styled.div`
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 3px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 8px;
  }
`;

export const BurgerNavList = styled.div`
  height: 100vh;
  padding: 0 30px;
  width: 100%;
`;

export const BurgerItem = styled.div`
  padding: 15px;
`;
