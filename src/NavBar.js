import React from "react";
import { Link } from "react-router-dom";
import { Toolbar } from "@material-ui/core";
import styled from "styled-components";
import { useAuth0 } from "./Auth0Provider";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Profile from "./Profile";

const ConjuToolbar = styled(Toolbar)`
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  justify-content: flex-end;
  background-color: slategray;
  justify-content: space-between;
`;

const ToolbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const StyledNavLink = styled.div`
  a:link,
  a:visited,
  a:active {
    color: ghostwhite;
    font-size: 1.8rem;
    font-weight: 200;
    text-decoration: none;
  }
  a:hover {
    color: #000;
  }
  text-align: center;
`;

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <ToolbarContainer>
      <AppBar>
        <ConjuToolbar>
          <Typography variant="h6" noWrap>
            <StyledNavLink>
              <Link to="/">conju-gator 🐊</Link>
            </StyledNavLink>
          </Typography>

          {!isAuthenticated && (
            <Button size="small" onClick={() => loginWithRedirect({})}>
              Log in
            </Button>
          )}

          {isAuthenticated && <Profile />}
        </ConjuToolbar>
      </AppBar>
    </ToolbarContainer>
  );
};

export default NavBar;
