import { Skeleton } from "../../../../components/Skeleton";
import { FarmTableEarnedProps } from "../../types";
import { Amount } from "../styles";
import { baseDisplay } from "../../../../../../../apps/web/src/pages/_app";

interface EarnedPropsWithLoading extends FarmTableEarnedProps {
  userDataReady: boolean;
}

const Earned: React.FunctionComponent<React.PropsWithChildren<EarnedPropsWithLoading>> = ({
  earnings,
  userDataReady,
}) => {
  const amount = earnings > 0 ? earnings : 0;

  if (userDataReady) {
    return (
      <Amount className={baseDisplay.className} amount={amount}>
        {amount?.toLocaleString("en-US", { maximumFractionDigits: 4 })}
      </Amount>
    );
  }
  return (
    <Amount amount={0} className={baseDisplay.className}>
      <Skeleton width={60} />
    </Amount>
  );
};

export default Earned;
