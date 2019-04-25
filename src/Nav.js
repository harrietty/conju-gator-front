import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled.div`
  a:link,
  a:visited,
  a:active {
    color: #303131;
    text-decoration: none;
    font-family: "Overlock", cursive;
    font-display: auto;
    font-size: 5rem;
  }
  a:hover {
    color: #000;
  }
  text-align: center;
`;

class Nav extends React.Component {
  render() {
    return (
      <StyledNavLink>
        <Link to="/">conju-gator 🐊</Link>
      </StyledNavLink>
    );
  }
}

export default Nav;
