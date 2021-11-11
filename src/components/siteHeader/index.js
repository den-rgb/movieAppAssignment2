import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withRouter } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Avatar } from "@material-ui/core";
import LoginIcon from "@material-ui/icons/Person"

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
  notVisible:{
    visibility:"hidden",
  },
  isVisible:{
    visibility:"visible",
  }
}));


const SiteHeader = ( { history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const activeuser = localStorage.getItem("userName");
  const activeuser2=localStorage.getItem("userName2");
  
  

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Your WatchList", path: "/movies/watchList" },
    {label: "Trending" , path:"/movies/trending"},
  ];

  
   

  const handleLogOut=()=>{
    localStorage.setItem("userName","");
    
    handleMenuSelect('/');
  }

  if(activeuser==="undefined"||activeuser==="null"||activeuser===null){
    localStorage.setItem("userName","");
  }

  const checkTrue=()=>{
     if(activeuser===""||activeuser===null){
      handleMenuSelect('/login');
      
     }else if(activeuser==="undefined"||activeuser==="null"){
      handleMenuSelect('/login');
      
     }else{
       console.log(activeuser);
     }

  };

  const handleMenuSelect = (pageURL) => {
    history.push(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
                    <IconButton
                      
                      onClick={() => checkTrue()}
                    >
                      <LoginIcon color="primary" fontSize="large"/>
                      Welcome {activeuser}
                    </IconButton>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
                    <Button
                      className={activeuser!=""?classes.isVisible : classes.notVisible}
                      onClick={()=>handleLogOut()}
                    >
                      LogOut
                    </Button>
                  
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default withRouter(SiteHeader);