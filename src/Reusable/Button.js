import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Btn = styled.button`
  height: 37px;
  min-width: 200px;
  color: ${props => (props.disabled ? "#908589" : "white")};
  background: ${props => (props.disabled ? "#CCC4C7" : "palevioletred")};
  font-size: 1.4rem;
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

const Button = ({ children, onClick, disabled }) => (
  <Btn onClick={onClick} disabled={disabled}>
    {children}
  </Btn>
);

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;
