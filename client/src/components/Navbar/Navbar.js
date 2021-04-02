import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Typography, Toolbar, ThemeProvider } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux';
import { useWindowResize } from 'react-resize-tracker';
import decode from 'jwt-decode';

import useStyles from './styles';

const Navbar = ({ setCurrentId, user, setUser }) => {
    const [currentWidth, currentHeight] = useWindowResize();
    const classes= useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
      };
    
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    //used to reset id once the user click on the title to exit edit screen without having edited
    //IMPORTANT!! each way to get back from "edit jobOffer" must have resetCurrentId function or equivalent
    //otherwise the currentId will persist and the user will not be able to modify other jobOffers
    //(execpt if he presses Clear button under submit or Submit button)
    const resetCurrentId = () => {
        setCurrentId(null);
    }

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            //se scade il token(dopo 1h) faccio il logout
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose} component={Link} to="/profile" >Profile</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/postJobOffer" >Post Job Offer</MenuItem>
            <MenuItem onClick={handleMenuClose}>Chat</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                <MenuItem onClick={handleProfileMenuOpen}>
                        <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                            <MenuIcon className={classes.menuIcon}/>
                        </IconButton>
                    </MenuItem>

                    <Typography onClick={resetCurrentId} component={Link} to="/" variant="h6" className={classes.title}>
                        HelloGeek
                    </Typography>
                        {user ? (
                            <div className={classes.profile} justify="flex-end">
                                <Avatar flexGrow={1} className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                                {currentWidth > 600 && (<Typography className={classes.userName} variant="h6">{user.result.name}</Typography>)}
                                <Button color="inherit" className={classes.logout} onClick={logout}>Logout</Button>
                            </div>
                        ) : (
                            <Button color="inherit" component={Link} to="/auth" >Sign In</Button>
                        )}
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
};

export default Navbar;