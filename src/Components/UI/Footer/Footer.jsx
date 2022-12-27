import React, { Fragment, useState } from "react";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Typography } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const [value, setValue] = useState(0);

  return (
    <Fragment>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          right: 0,
        }}
      >
        <BottomNavigation
          showLabels
          sx={{ backgroundColor: "#2f3d7e", color: "white" }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Typography variant="overline" sx={{ m: "auto" }}>
            Prooktatás Vizsgamunka
          </Typography>
          <Typography variant="caption" sx={{ m: "auto" }}>
            &copy; Created by Tóth György \m/ 2022
          </Typography>
          <BottomNavigationAction
            href="https://www.facebook.com/somniumhorrendum/"
            target="_blank"
            label="Facebook"
            icon={<FacebookIcon color="secondary" />}
          />
          <BottomNavigationAction
            href="https://www.instagram.com/somniumhorrendum/"
            target="_blank"
            label="Instagram"
            icon={<InstagramIcon color="secondary" />}
          />
          <BottomNavigationAction
            href="https://www.linkedin.com/in/györgy-tóth-6096b2176"
            target="_blank"
            label="LinkedIn"
            icon={<LinkedInIcon color="secondary" />}
          />
          <BottomNavigationAction
            href="https://github.com/pannoncode"
            target="_blank"
            label="GitHub"
            icon={<GitHubIcon color="secondary" />}
          />
        </BottomNavigation>
      </Box>
    </Fragment>
  );
};

export default Footer;
