import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      style={{ fill: "none", stroke: "white" }}
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </Svg>
  );
};

export default Icon;
