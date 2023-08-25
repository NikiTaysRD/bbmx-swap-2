import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { Flex } from "../Box";
import { Container, Input, ListItem, StyledFooter, TextH, TextP, Button, SocialIcon } from "./styles";

import { FooterProps } from "./types";
import Logo from "../../widgets/Menu/components/Logo";
import { FlexGap } from "../Layouts";
import { useMatchBreakpoints } from "../../contexts";
import { baseDisplay, baseMono } from "../../../../../apps/web/src/pages/_app";

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({ ...props }) => {
  const { isMobile } = useMatchBreakpoints();
  const { isTablet } = useMatchBreakpoints();
  // console.log("haha");

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
          <Flex width="106px">
            <Logo href="/" />
          </Flex>

          <FlexGap alignItems="center" flexDirection={isMobile ? "column" : "row"} gap="30px">
            <Flex mr={isMobile ? "0" : "30px"} className={baseDisplay.className}>
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
          <Flex
            flexDirection="column"
            width={isTablet || isMobile ? "100%" : "42%"}
            alignItems={isMobile ? "center" : undefined}
          >
            <TextH className={baseMono.className}>KEEP UP WITH THE LATEST FROM BBMX</TextH>
            <TextP className={baseDisplay.className}>Subscribe to our Mirror blog.</TextP>

            <Flex mb="20px" width="100%">
              <Flex width="70%">
                <Input placeholder="Enter your email" className={baseDisplay.className} />
              </Flex>

              <Flex justifyContent="space-between" alignItems="center" width="30%">
                <Button className={baseMono.className}>Subscribe</Button>
              </Flex>
            </Flex>

            <TextP className={baseDisplay.className}>© 2023 BBMX</TextP>
          </Flex>
        </Flex>
      </Container>
    </StyledFooter>
  );
};

export default MenuItem;
