import { BIG_ZERO } from "@pancakeswap/utils/bigNumber";
import BigNumber from "bignumber.js";
import { useTranslation } from "@pancakeswap/localization";
import { createElement, FunctionComponent } from "react";
import { CellContent, BaseCell } from "./BaseCell";
import { useMatchBreakpoints } from "../../../contexts";
import { Text } from "../../../components/Text";
import { DeserializedPool } from "../types";
import { baseDisplay } from "../../../../../../apps/web/src/pages/_app";

interface AprCellProps<T> {
  pool: DeserializedPool<T>;
  aprComp: FunctionComponent<{
    pool: DeserializedPool<T>;
    stakedBalance: BigNumber;
    showIcon: boolean;
  }>;
}

export function AprCell<T>({ pool, aprComp }: AprCellProps<T>) {
  const { t } = useTranslation();
  const { isMobile } = useMatchBreakpoints();
  const { userData } = pool;
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO;

  return (
    <BaseCell role="cell" flex={["1 0 50px", "1 0 50px", "2 0 100px", "2 0 100px", "1 0 120px"]}>
      <CellContent>
        <Text
          color="#a0a3c4"
          textAlign="left"
          fontSize="13px"
          lineHeight="160%"
          letterSpacing="0.75px"
          className={baseDisplay.className}
        >
          {t("APR")}
        </Text>
        {createElement(aprComp, {
          pool,
          stakedBalance,
          showIcon: !isMobile,
        })}
      </CellContent>
    </BaseCell>
  );
}
