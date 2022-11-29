import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

import { Logo } from "./Logo";
import { Container } from "@mui/material";

export const AppShell: React.FC = ({ children }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" elevation={0}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Logo countryCode="PL" />
          </Toolbar>
        </AppBar>
      </Box>
      <Divider />
      <Container
        maxWidth="xl"
        sx={{
          mt: 10,
        }}
      >
        {children}
      </Container>
    </>
  );
};
