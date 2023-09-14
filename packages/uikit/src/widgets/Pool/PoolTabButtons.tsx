import { useRouter } from "next/router";
import styled from "styled-components";
import { useTranslation } from "@pancakeswap/localization";
import { ButtonMenu, ButtonMenuItem, Toggle, Text, NotificationDot, NextLinkFromReactRouter } from "../../components";
import { ToggleView, ViewMode } from "../../components/ToggleView";
import StyledToggle, { Handle } from "../../components/Toggle/StyledToggle";

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }

  ${StyledToggle} {
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${Handle} {
    background-color: #4e09f8;
  }
`;

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  // ${({ theme }) => theme.mediaQueries.sm} {
  //   margin-left: 16px;
  // }
`;

interface PoolTableButtonsPropsType {
  stakedOnly: boolean;
  setStakedOnly: (s: boolean) => void;
  viewMode: ViewMode;
  setViewMode: (s: ViewMode) => void;
  hasStakeInFinishedPools: boolean;
  hideViewMode?: boolean;
}

const PoolButtonMenu = styled(ButtonMenu)`
  background-color: #1b1c30;
  border-radius: 6px;
`;

const PoolButtonMenuItem = styled(ButtonMenuItem)`
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

const PoolTabButtons = ({
  stakedOnly,
  setStakedOnly,
  hasStakeInFinishedPools,
  viewMode,
  setViewMode,
  hideViewMode = false,
}: PoolTableButtonsPropsType) => {
  const router = useRouter();

  const { t } = useTranslation();

  const isExact = router.pathname === "/pools" || router.pathname === "/_mp/pools";

  const viewModeToggle = hideViewMode ? null : (
    <ToggleView idPrefix="clickPool" viewMode={viewMode} onToggle={setViewMode} />
  );

  const liveOrFinishedSwitch = (
    <Wrapper>
      <PoolButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="subtle">
        <PoolButtonMenuItem forwardedAs={NextLinkFromReactRouter} to="/pools" replace>
          {t("Live")}
        </PoolButtonMenuItem>

        <PoolButtonMenuItem
          id="finished-pools-button"
          forwardedAs={NextLinkFromReactRouter}
          to="/pools/history"
          replace
        >
          {t("Finished")}
        </PoolButtonMenuItem>
      </PoolButtonMenu>
    </Wrapper>
  );

  const stakedOnlySwitch = (
    <ToggleWrapper>
      <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
      <Text> {t("Staked only")}</Text>
    </ToggleWrapper>
  );

  return (
    <ViewControls>
      {/* {viewModeToggle} */}
      {liveOrFinishedSwitch}
      {stakedOnlySwitch}
    </ViewControls>
  );
};

export default PoolTabButtons;
