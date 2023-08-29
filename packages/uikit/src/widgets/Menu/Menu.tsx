import { useIsMounted } from "@pancakeswap/hooks";
import { AtomBox } from "@pancakeswap/ui/components/AtomBox";
import throttle from "lodash/throttle";
import React, { useEffect, useRef, useState, useMemo } from "react";
import styled, { css, keyframes } from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import BottomNav from "../../components/BottomNav";
import { Box } from "../../components/Box";
import Flex from "../../components/Box/Flex";
import Footer from "../../components/Footer";
import { useMatchBreakpoints } from "../../contexts";
import Logo from "./components/Logo";
import { MENU_HEIGHT, MOBILE_MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE } from "./config";
import { MenuContext } from "./context";
import { NavProps } from "./types";
import FlexGap from "../../components/Layouts/FlexGap";
import { baseDisplay, baseMono } from "../../../../../apps/web/src/pages/_app";
import bOnly from "../../../../../apps/web/public/favicon.ico";
import AngleDown from "../../../../../apps/web/public/images/home/angle-down.svg";
import base from "../../../../../apps/web/public/images/base.png";
import { Button } from "../../components/Footer/styles";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: #101124;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  transform: translate3d(0, 0, 0);

  padding-left: 20px;
  padding-right: 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 60px;
    padding-right: 60px;
  }
`;

const FixedContainer = styled.div<{ showMenu: boolean; height: number }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100%;
  z-index: 20;
`;

const TopBannerContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  width: 100%;
`;

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
  max-width: 100vw;
`;

const Inner = styled.div`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
`;

const Item = styled.div`
  font-size: 10px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.3s all;

  &:hover {
    color: #4e09f8;
  }
`;

const Price = styled.span`
  font-size: 12px;
`;

const BaseWrap = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
`;

const Base = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  padding: 6px 10px;
`;

const slideDown = keyframes`
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

const Dropdown = styled.div<DropdownProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 0;
  border-radius: 6px;
  background: rgba(27, 28, 48, 0.8);
  backdrop-filter: blur(10px);
  left: 0;
  top: 37px;
  width: 120%;

  transform-origin: top;
  ${(props) =>
    props.open
      ? css`
          animation: ${slideDown} 0.2s ease forwards;
        `
      : "none"}
`;

const DropdownLink = styled.div`
  padding: 0 15px;
  font-size: 15px;
`;

const Burger = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 12px;
`;

const Menu: React.FC<React.PropsWithChildren<NavProps>> = ({
  linkComponent = "a",
  banner,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  cakePriceUsd,
  links,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  langs,
  buyCakeLabel,
  buyCakeLink,
  children,
  chainId,
}) => {
  const { isMobile } = useMatchBreakpoints();
  const isMounted = useIsMounted();
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.pageYOffset);

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = isMounted && banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;

  const [openDropdown, setOpenDropdown] = useState<string>("");

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdown(openDropdown === dropdownId ? "" : dropdownId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [totalTopMenuHeight]);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  const providerValue = useMemo(() => ({ linkComponent }), [linkComponent]);
  const { pathname } = useRouter();

  return (
    <MenuContext.Provider value={providerValue}>
      <AtomBox
        asChild
        minHeight={{
          xs: "auto",
          md: "100vh",
        }}
      >
        {pathname !== "/" ? (
          <Wrapper>
            <FixedContainer showMenu={showMenu} height={totalTopMenuHeight}>
              {banner && isMounted && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>}
              <StyledNav>
                <Flex>
                  <Flex width="84px">
                    <Logo href={homeLink?.href ?? "/"} />
                  </Flex>

                  <FlexGap gap="16px" className={baseDisplay.className} alignItems="center" ml="25px">
                    <Item>Home</Item>
                    <Item>Trade</Item>
                    <Item>Liquidity</Item>
                    <Item>Farming</Item>
                    <Item>Governance</Item>
                  </FlexGap>
                </Flex>

                <FlexGap
                  alignItems="center"
                  height="100%"
                  gap="30px"
                  className={baseMono.className}
                  style={{ fontSize: "12px" }}
                >
                  <Flex alignItems="center">
                    <Image src={bOnly.src} alt="" width={35} height={35} />
                    <Price>$0.0046</Price>
                  </Flex>

                  <BaseWrap>
                    <Base onClick={() => toggleDropdown("baseDropdown")}>
                      <Image src={base.src} alt="" width={18} height={18} />
                      <Base>Base</Base>
                      <Image src={AngleDown} alt="" width={8} height={8.8} />
                    </Base>
                    {openDropdown === "baseDropdown" && (
                      <Dropdown open={openDropdown === "baseDropdown"}>
                        <DropdownLink>Linea</DropdownLink>
                        <DropdownLink>Polygon</DropdownLink>
                      </Dropdown>
                    )}
                  </BaseWrap>

                  <Flex>
                    <Button className={baseMono.className}>CONNECT WALLET</Button>
                  </Flex>

                  <Flex
                    onClick={() => toggleDropdown("burgerDropdown")}
                    style={{ position: "relative", cursor: "pointer" }}
                  >
                    <Burger style={{ fontWeight: "700" }}>...</Burger>
                    {openDropdown === "burgerDropdown" && (
                      <Dropdown style={{ left: "-110px", width: "180px" }} open={openDropdown === "burgerDropdown"}>
                        <DropdownLink>Twitter</DropdownLink>
                        <DropdownLink>Telegram</DropdownLink>
                        <DropdownLink>Email Us</DropdownLink>
                      </Dropdown>
                    )}
                  </Flex>
                </FlexGap>
              </StyledNav>
            </FixedContainer>

            <BodyWrapper mt={`${totalTopMenuHeight + 1}px`}>
              <Inner>{children}</Inner>
            </BodyWrapper>
          </Wrapper>
        ) : (
          <Wrapper>
            <BodyWrapper mt={!subLinks ? `${totalTopMenuHeight + 1}px` : "0"}>
              <Inner>{children}</Inner>
            </BodyWrapper>
          </Wrapper>
        )}
      </AtomBox>
      <Footer
        chainId={chainId}
        items={footerLinks}
        isDark={isDark}
        toggleTheme={toggleTheme}
        langs={langs}
        setLang={setLang}
        currentLang={currentLang}
        cakePriceUsd={cakePriceUsd}
        buyCakeLabel={buyCakeLabel}
        buyCakeLink={buyCakeLink}
        mb={[`${MOBILE_MENU_HEIGHT}px`, null, "0px"]}
      />
      {pathname !== "/" && (
        <AtomBox display={{ xs: "block", md: "none" }}>
          <BottomNav items={links} activeItem={activeItem} activeSubItem={activeSubItem} />
        </AtomBox>
      )}
    </MenuContext.Provider>
  );
};

export default Menu;
