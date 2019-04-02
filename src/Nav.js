import React from "react";
import styled from "styled-components";

const StyledNav = styled.nav`
  font-family: "Overlock", cursive;
  font-size: 5rem;
  text-align: center;
`;

class Nav extends React.Component {
  render() {
    return <StyledNav>conju-gator 🐊</StyledNav>;
  }
}

export default Nav;
