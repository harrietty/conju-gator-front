import styled from "styled-components";

const Input = styled.input`
  width: ${props => props.width || "100px"};
  height: 37px;
  font-size: 1rem;
  border: 1px solid #63b5b0;
  border-radius: 3px;
  font-weight: 300;
  background-color: ${props => (props.disabled ? "hsl(0,0%,95%)" : "default")};
  border-color: ${props => (props.disabled ? "hsl(0,0%,90%)" : "default")};
  color: ${props => (props.disabled ? "rgb(128, 128, 128)" : "default")};
`;

export default Input;
