import { useIsMounted } from "@pancakeswap/hooks";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Flex } from "../Box";
import { Container, Input, List, ListItem, StyledFooter, StyledToolsContainer, TextH, TextP } from "./styles";

import { Button } from "../Button";
import LangSelector from "../LangSelector/LangSelector";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { FooterProps } from "./types";
import { SkeletonV2 } from "../Skeleton";
import Logo from "../../widgets/Menu/components/Logo";

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  ...props
}) => {
  const isMounted = useIsMounted();
  return (
    <StyledFooter data-theme="dark" p={["40px 16px", null, "56px 40px 32px 40px"]} position="relative" {...props}>
      <Container>
        <Flex justifyContent="space-between" alignItems="center" mb="45px">
          <Logo href="/" />
          <List>
            <ListItem>BBMXSwap</ListItem>
            <ListItem>Docs</ListItem>
            <ListItem>Contact Us</ListItem>

            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faPaperPlane} />
            <FontAwesomeIcon icon={faEnvelope} />
          </List>
        </Flex>

        <Flex>
          <Flex flexDirection="column" width="42%">
            <TextH>KEEP UP WITH THE LATEST FROM BBMX</TextH>
            <TextP>Subscribe to our Mirror blog.</TextP>

            <Flex mb="20px">
              <Input placeholder="Enter your email" />
              <Button>Subscribe</Button>
            </Flex>

            <TextP>© 2023 BBMX</TextP>
          </Flex>
        </Flex>
      </Container>
      <Flex flexDirection="column" width={["100%", null, "1200px;"]}>
        <StyledToolsContainer
          data-theme="dark"
          order={[1, null, 3]}
          flexDirection={["column", null, "row"]}
          justifyContent="space-between"
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
      </Flex>
    </StyledFooter>
  );
};

export default MenuItem;
