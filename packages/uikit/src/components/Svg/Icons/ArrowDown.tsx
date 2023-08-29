import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange } from "@fortawesome/free-solid-svg-icons";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return <FontAwesomeIcon icon={faExchange} style={{ color: "#ffffff", height: "17px", width: "17px" }} />;
};

export default Icon;
