import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import MenuIcon from "@mui/icons-material/Menu";
import { blue } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLayout, toggleSideMenu } from "./layoutSlice";
import SideMenu from "./SideMenu";

type LayoutProps = {
  children?: React.ReactChild | React.ReactChild[];
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const data = useAppSelector(selectLayout);
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ borderRadius: 0 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#28a", color: "white" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => dispatch(toggleSideMenu())}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Room Dashboard
          </Typography>
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            AN
          </Avatar>
        </Toolbar>
      </AppBar>
      {children}
      <Drawer
        anchor="left"
        open={data.sideMenuOpen}
        onClick={() => dispatch(toggleSideMenu())}
        onClose={() => dispatch(toggleSideMenu())}
        sx={{ width: "320px" }}
      >
        <Box sx={{ width: "356px" }}>
          <SideMenu />
        </Box>
      </Drawer>
    </Card>
  );
};

export default Layout;
