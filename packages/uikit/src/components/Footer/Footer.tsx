import { useIsMounted } from "@pancakeswap/hooks";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import {useRouter} from "next/router";
import { Flex } from "../Box";
import {
  Container,
  Input,
  ListItem,
  StyledFooter,
  StyledToolsContainer,
  TextH,
  TextP,
  Button,
  SocialIcon,
} from "./styles";

import LangSelector from "../LangSelector/LangSelector";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { FooterProps } from "./types";
import { SkeletonV2 } from "../Skeleton";
import Logo from "../../widgets/Menu/components/Logo";
import { FlexGap } from "../Layouts";
import { useMatchBreakpoints } from "../../contexts";

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  ...props
}) => {
  const isMounted = useIsMounted();
  const { isMobile } = useMatchBreakpoints();
  const { isTablet } = useMatchBreakpoints();

  const { pathname } = useRouter()
  return (
    <StyledFooter data-theme="dark" p={["40px 16px", null, "56px 40px 32px 40px"]} position="relative" {...props}>
      <Container>
        <FlexGap
          justifyContent="space-between"
          alignItems="center"
          mb="45px"
          flexDirection={isMobile ? "column" : "row"}
          gap="30px"
        >
          <Logo href="/" />

          <FlexGap alignItems="center" flexDirection={isMobile ? "column" : "row"} gap="30px">
            <Flex mr={isMobile ? "0" : "30px"}>
              <div data-tooltip-id="BBMXSwap" data-tooltip-content="Coming Soon">
                <ListItem>BBMXSwap</ListItem>
                <Tooltip id="BBMXSwap" place="bottom" style={{ backgroundColor: "#000" }} />
              </div>

              <div data-tooltip-id="Docs" data-tooltip-content="Coming Soon">
                <ListItem>Docs</ListItem>
                <Tooltip id="Docs" place="bottom" style={{ backgroundColor: "#000" }} />
              </div>

              <ListItem>Contact Us</ListItem>
            </Flex>

            <FlexGap gap="30px">
              <SocialIcon>
                <Link href="https://twitter.com/bbmxexchange" target="_blank">
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
              </SocialIcon>

              <SocialIcon>
                <Link href="https://t.me/BBMXExchange" target="_blank">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </Link>
              </SocialIcon>

              <SocialIcon>
                <Link href="mailto:business@bbmx.exchange" target="_blank">
                  <FontAwesomeIcon icon={faEnvelope} />
                </Link>
              </SocialIcon>
            </FlexGap>
          </FlexGap>
        </FlexGap>

        <Flex>
          <Flex flexDirection="column" width={isTablet ? "100%" : "42%"} alignItems={isMobile ? "center" : undefined}>
            <TextH>KEEP UP WITH THE LATEST FROM BBMX</TextH>
            <TextP>Subscribe to our Mirror blog.</TextP>

            <Flex mb="20px" width="100%">
              <Flex width="100%">
                <Input placeholder="Enter your email" />
              </Flex>

              <Flex justifyContent="space-between" alignItems="center">
                <Button>Subscribe</Button>
              </Flex>
            </Flex>

            <TextP>© 2023 BBMX</TextP>
          </Flex>
        </Flex>

        <StyledToolsContainer
          data-theme="dark"
          order={[1, null, 3]}
          flexDirection={["column", null, "row"]}
          justifyContent="space-between"
          style={{marginBottom: `${pathname === "/" && "0"}`}}
        >
          <Flex order={[2, null, 1]} alignItems="center">
            <SkeletonV2 variant="round" width="56px" height="32px" isDataReady={isMounted}>
              <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
            </SkeletonV2>
            <LangSelector
              currentLang={currentLang}
              langs={langs}
              setLang={setLang}
              color="textSubtle"
              dropdownPosition="top-right"
            />
          </Flex>
        </StyledToolsContainer>
      </Container>
    </StyledFooter>
  );
};

export default MenuItem;
