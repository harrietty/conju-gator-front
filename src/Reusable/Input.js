import styled from "styled-components";

const Input = styled.input`
  width: ${props => props.width || "100px"};
  height: 37px;
  font-size: 1rem;
  border: 1px solid #63b5b0;
  border-radius: 3px;
`;

export default Input;
