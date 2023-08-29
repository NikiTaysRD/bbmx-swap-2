import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange } from "@fortawesome/free-solid-svg-icons";

import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return <FontAwesomeIcon icon={faExchange} style={{ color: "#ffffff", height: "17px", width: "17px" }} />;
};

export default Icon;
