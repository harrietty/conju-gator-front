import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Btn = styled.button`
  height: ${props => (props.size === "small" ? "27px" : "37px")};
  min-width: ${props => (props.size === "small" ? "160px" : "200px")};
  color: ${props => (props.disabled ? "#908589" : "white")};
  background: ${props => (props.disabled ? "#CCC4C7" : "#664668")};
  font-size: ${props => (props.size === "small" ? "0.8rem" : "1.4rem")};
  border: 0;
  border-radius: 2px;
  margin: 5px;
  box-shadow: ${props => (props.disabled ? "none" : "3px 3px 1px lightgrey")};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  &:hover {
    transform: ${props => (props.disabled ? "none" : "translate(3px, 2px)")};
    box-shadow: 0px 1px 1px lightgrey;
  }
`;

class Button extends React.Component {
  render() {
    const { children, onClick, disabled, refCallback, size } = this.props;
    return (
      <Btn size={size} onClick={onClick} disabled={disabled} ref={refCallback}>
        {children}
      </Btn>
    );
  }
}

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  refCallback: PropTypes.func,
  size: PropTypes.string
};

export default Button;
