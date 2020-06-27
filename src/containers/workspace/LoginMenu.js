import React, { Fragment, useContext, useState } from 'react';
import { Button, MenuItem, Popover, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@material-ui/core';
import { AuthContext } from '../../contexts/Auth';
import { FormattedMessage } from 'react-intl';
import { AppStateContext } from '../../contexts/AppState';
import { signOut } from '../../services/Auth';

const LoginMenu = () => {
    const { user, deauthenticate } = useContext(AuthContext);
    const { setStatus } = useContext(AppStateContext);

    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const [ logOutDialog, showLogOutDialot ] = useState(false);

    const handleMenuOpen = e => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = e => {
        e.preventDefault();
        signOut()
        .then(() => {
            setStatus('loading');
            deauthenticate();
        })
        .catch(err => {
            console.log('Error signing-out');
            console.log(err);
            setStatus('loading');
            deauthenticate();
        })
    }

    const handleLogOutDialogClose = () => {
        showLogOutDialot(false);
    }

    const handleLogOutDialogOpen = () => {
        showLogOutDialot(true);
    }

    const open = Boolean(anchorEl)
    const id = open ? 'primary-locale-menu' : undefined;

    return (
        <Fragment>
            <Button 
                color="inherit" 
                onClick={handleMenuOpen}
            >
                {`${user.firstName} ${user.lastName}`}
            </Button>
            <Popover
                id={id}
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem 
                    button
                    onClick={handleLogOutDialogOpen}
                >
                    <FormattedMessage id='Sign-Out'/>
                </MenuItem>
            </Popover>
            <Dialog
                open={logOutDialog}
                onClose={handleLogOutDialogClose}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-content"
            >
                <DialogTitle id="logout-dialog-title"><FormattedMessage id='Exit'/></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-content">
                        <FormattedMessage id='Are your sure you want to exit from CRM?'/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogOut} color="primary">
                        <FormattedMessage id='Yes'/>
                    </Button>
                    <Button onClick={handleLogOutDialogClose} color="primary">
                        <FormattedMessage id='No'/>
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default LoginMenu