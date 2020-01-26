import React from "react";
import { Toolbar } from "@material-ui/core";
import styled from "styled-components";
import { useAuth0 } from "./Auth0Provider";
import Button from "@material-ui/core/Button";
import Profile from "./Profile";

const ConjuToolbar = styled(Toolbar)`
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  justify-content: flex-end;
  background-color: slategray;
`;

const ToolbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <ToolbarContainer>
      <ConjuToolbar>
        {!isAuthenticated && (
          <Button size="small" onClick={() => loginWithRedirect({})}>
            Log in
          </Button>
        )}

        {isAuthenticated && <Profile />}
      </ConjuToolbar>
    </ToolbarContainer>
  );
};

export default NavBar;
