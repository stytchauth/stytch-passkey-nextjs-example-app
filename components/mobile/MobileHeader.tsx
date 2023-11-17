import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  ListItemIcon,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ResetUserStateButton from "@/components/mobile/ResetUserStateButton";

type Props = {
  logout?: () => void;
};

function MobileHeader(props: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      padding={2}
      height="60px"
      alignItems="center"
    >
      <Image src="/logo.png" alt="Vector art" width="120" height="34" />
      <Box>
        <IconButton aria-label="delete">
          <MenuIcon onClick={() => setDrawerOpen(true)} />
        </IconButton>
      </Box>
      {props.logout && (
        <Drawer
          anchor="top"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <List>
            <ListItem key={1} disablePadding onClick={props.logout}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      )}
    </Box>
  );
}

export default MobileHeader;
