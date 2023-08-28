import { PropsWithChildren } from "react";
import Text from "./Text";
import { TextProps } from "./types";
import { baseDisplay } from "../../../../../apps/web/src/pages/_app";

export const PreTitle = (props: PropsWithChildren<TextProps>) => (
  <Text color="secondary" fontSize="12px" bold textTransform="uppercase" {...props} className={baseDisplay.className} />
);
