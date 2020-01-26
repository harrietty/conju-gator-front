import React from "react";
import PropTypes from "prop-types";
import { omit } from "lodash";
import Button from "@material-ui/core/Button";
import * as colors from "../style/colors";

export default function CustomButton(props) {
  return (
    <Button
      {...omit(props, ["color", "backgroundColor"])}
      style={{
        backgroundColor: props.backgroundColor
          ? colors[props.backgroundColor]
          : "",
        color: props.color ? colors[props.color] : ""
      }}
    />
  );
}

CustomButton.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string
};
