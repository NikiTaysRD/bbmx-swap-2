import React, { useState } from "react";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEllipsis, faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Flex from "../../components/Box/Flex";
import favicon from "../../../../../apps/web/public/images/favicon.png";
import Logo from "./components/Logo";
import FlexGap from "../../components/Layouts/FlexGap";
import { baseDisplay, baseMono } from "../../../../../apps/web/src/pages/_app";
import {
  Base,
  BaseWrap,
  Burger,
  BurgerItem,
  BurgerMenu,
  BurgerNavList,
  Dropdown,
  DropdownLink,
  Item,
  Price,
  StyledNav,
  Text,
} from "./styles";
import bOnly from "../../../../../apps/web/public/favicon.ico";
import base from "../../../../../apps/web/public/images/base.png";
import AngleDown from "../../../../../apps/web/public/images/home/angle-down.svg";
import { Button } from "../../components/Footer/styles";
import { useMatchBreakpoints } from "../../contexts";

export const Header: React.FC = () => {
  const { isMobile } = useMatchBreakpoints();
  const { isDesktop } = useMatchBreakpoints();
  const [openDropdown, setOpenDropdown] = useState<string>("");
  const [openBurger, setOpenBurger] = useState<boolean>(false);

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdown(openDropdown === dropdownId ? "" : dropdownId);
  };

  return (
    <>
      <StyledNav>
        <Flex>
          <Flex width="84px">{isMobile ? <Image alt="" src={favicon} width={24} /> : <Logo href="/" />}</Flex>

          {isDesktop && (
            <FlexGap gap="16px" className={baseDisplay.className} alignItems="center" ml="25px">
              <Item>
                <Link href="/">Home</Link>
              </Item>
              <Item>
                <Link href="/swap">Trade</Link>
              </Item>
              <Item>
                <Link href="/liquidity">Liquidity</Link>
              </Item>
              <Item>
                <Link href="/farming">Farming</Link>
              </Item>
              <Item>
                <Link href="/garming">Governance</Link>
              </Item>
            </FlexGap>
          )}
        </Flex>

        <FlexGap
          flexDirection="row"
          alignItems="center"
          height="100%"
          gap={isMobile ? "10px" : "30px"}
          className={baseMono.className}
          style={{ fontSize: "12px" }}
        >
          {!isMobile && (
            <Flex alignItems="center">
              <Image src={bOnly.src} alt="" width={35} height={35} />
              <Price>$0.0046</Price>
            </Flex>
          )}

          <BaseWrap>
            <Base onClick={() => toggleDropdown("baseDropdown")}>
              <Image src={base.src} alt="" width={18} height={18} />
              {!isMobile && <Base>Base</Base>}
              <Image src={AngleDown} alt="" width={8} height={8.8} />
            </Base>
            {/* {openDropdown === "baseDropdown" && ( */}
            {/*   <Dropdown open={openDropdown === "baseDropdown"}> */}
            {/*     <DropdownLink>Linea</DropdownLink> */}
            {/*     <DropdownLink>Polygon</DropdownLink> */}
            {/*   </Dropdown> */}
            {/* )} */}
          </BaseWrap>

          <Flex>
            <Button className={baseMono.className}>{isMobile ? "CONNECT" : "CONNECT WALLET"}</Button>
          </Flex>

          <Flex onClick={() => toggleDropdown("burgerDropdown")} style={{ position: "relative", cursor: "pointer" }}>
            <Burger style={{ fontWeight: "700" }}>
              <FontAwesomeIcon icon={faEllipsis} />
            </Burger>
            {openDropdown === "burgerDropdown" && (
              <Dropdown style={{ left: "-110px", width: "180px" }} open={openDropdown === "burgerDropdown"}>
                <DropdownLink>
                  <Link
                    href="https://twitter.com/bbmxexchange"
                    target="_blank"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FontAwesomeIcon icon={faTwitter} style={{ marginRight: "10px", fontSize: "18px" }} />
                    <Text>Twitter</Text>
                  </Link>
                </DropdownLink>

                <DropdownLink>
                  <Link
                    href="https://t.me/BBMXExchange"
                    target="_blank"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: "10px", fontSize: "18px" }} />
                    <Text>Telegram</Text>
                  </Link>
                </DropdownLink>

                <DropdownLink>
                  <Link
                    href="mailto:business@bbmx.exchange"
                    target="_blank"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "10px", fontSize: "18px" }} />
                    <Text>Email Us</Text>
                  </Link>
                </DropdownLink>
              </Dropdown>
            )}
          </Flex>
          {!isDesktop && (
            <BurgerMenu onClick={() => setOpenBurger(!openBurger)}>
              <FontAwesomeIcon icon={faBars} style={{ fontSize: "18px" }} />
            </BurgerMenu>
          )}
        </FlexGap>
      </StyledNav>

      {openBurger && (
        <BurgerNavList>
          <FlexGap className={baseMono.className} alignItems="left" flexDirection="column" style={{ fontSize: "18px" }}>
            <BurgerItem>Home</BurgerItem>
            <BurgerItem>Trade</BurgerItem>
            <BurgerItem>Liquidity</BurgerItem>
            <BurgerItem>Farming</BurgerItem>
            <BurgerItem>Governance</BurgerItem>
          </FlexGap>
        </BurgerNavList>
      )}
    </>
  );
};
