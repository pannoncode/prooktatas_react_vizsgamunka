import React, { Fragment, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Box } from "@mui/system";
import { Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ElevationScroll = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const sxStyles = {
  header: {
    backgroundColor: "#2f3d7e",
  },
  tabs: {
    margin: "auto",
  },
  tab: {
    color: "white",
  },
  divBox: {
    marginBottom: "4em",
  },
};

const Header = () => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (
      window.location.pathname === "/createMachineNumber" &&
      value !== 2
    ) {
      setValue(2);
    } else if (
      window.location.pathname === "/createCenterlineType" &&
      value !== 2
    ) {
      setValue(2);
    } else if (
      window.location.pathname === "/createCenterlineList" &&
      value !== 2
    ) {
      setValue(2);
    } else if (window.location.pathname === "/cllists" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/cldifferent" && value !== 3) {
      setValue(3);
    }
  }, [value]);

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar position="fixed" sx={sxStyles.header}>
          <Toolbar disableGutters>
            <Tabs
              sx={sxStyles.tabs}
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="primary"
            >
              <Tab
                key="home"
                sx={sxStyles.tab}
                component={Link}
                to="/"
                label="Kezdőoldal"
              />
              <Tab
                key="cllists"
                sx={sxStyles.tab}
                component={Link}
                to="/cllists"
                label="Centerline listák"
              />
              <Tab
                aria-owns={anchorEl ? "simple menu" : undefined}
                aria-haspopup={anchorEl ? "true" : undefined}
                key="cldatas"
                sx={sxStyles.tab}
                label="Centerline adatok"
                onClick={handleMenuClick}
              />
              <Tab
                key="cldifferent"
                sx={sxStyles.tab}
                component={Link}
                to="/cldifferent"
                label="Centerline eltérések"
              />
            </Tabs>
            <Menu
              id="simple menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{ onMouseLeave: handleMenuClose }}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  setValue(2);
                }}
                component={Link}
                to="createMachineNumber"
              >
                Gépszám létrehozása
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  setValue(2);
                }}
                component={Link}
                to="createCenterlineType"
              >
                Centerline típus létrehozása
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  setValue(2);
                }}
                component={Link}
                to="createCenterlineList"
              >
                Centerline lista létrehozása
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Box component="div" sx={sxStyles.divBox} />
    </Fragment>
  );
};

export default Header;
