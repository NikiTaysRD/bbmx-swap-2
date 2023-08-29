import { useIsMounted } from "@pancakeswap/hooks";
import { AtomBox } from "@pancakeswap/ui/components/AtomBox";
import throttle from "lodash/throttle";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE } from "./config";
import { MenuContext } from "./context";
import { NavProps } from "./types";
import { BodyWrapper, FixedContainer, Inner, TopBannerContainer, Wrapper, Text } from "./styles";
import { Header } from "./Header";
import { useMatchBreakpoints } from "../../contexts";

const Menu: React.FC<React.PropsWithChildren<NavProps>> = ({ linkComponent = "a", banner, subLinks, children }) => {
  const isMounted = useIsMounted();
  const { isMobile } = useMatchBreakpoints();
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.pageYOffset);

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = isMounted && banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;

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

  const providerValue = useMemo(() => ({ linkComponent }), [linkComponent]);
  const { pathname } = useRouter();

  return (
    <MenuContext.Provider value={providerValue}>
      <AtomBox
        asChild
        minHeight={{
          xs: "auto",
          md: "auto",
        }}
      >
        {pathname !== "/" ? (
          <Wrapper>
            <FixedContainer showMenu={showMenu} height={totalTopMenuHeight}>
              {banner && isMounted && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>}
              <Header />
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
    </MenuContext.Provider>
  );
};

export default Menu;
