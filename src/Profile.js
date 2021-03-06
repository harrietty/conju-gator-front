import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import configuration from "./configuration";

import { useAuth0 } from "./Auth0Provider";

const menuId = "primary-user-menu";

const Profile = () => {
  const { loading, user, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const closeAndLogout = () => {
    logout({
      returnTo: configuration[process.env.NODE_ENV].APP_ROOT
    });
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={closeAndLogout}>Sign out</MenuItem>
    </Menu>
  );

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <Avatar alt="Remy Sharp" src={user.picture} />
      </IconButton>
      {renderMenu}
    </Fragment>
  );
};

export default Profile;
