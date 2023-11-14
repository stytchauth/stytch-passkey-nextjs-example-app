import {useStytch, useStytchUser} from "@stytch/nextjs";
import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link} from "@mui/material";
import {resetUserState} from "@/lib/utils";

function ResetUserStateButton() {
    const stytch = useStytch();
    const { user } = useStytchUser();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        resetUserState(user, stytch);
        setOpen(false);
    }

    return (
        <>
            <Button variant="contained" color="error" onClick={handleClickOpen}>Reset User State</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete this user"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" >
                        This functionality exists for testing purposes and would most likely not exist in production. <br/><br/>
                        When a user deletes their passkey locally (i.e. in browser, extension, or system settings),
                        or in case of a lost passkey, the user will be unable to take
                        <Link href="https://stytch.com/docs/sdks/javascript-sdk/resources/mfa">MFA required actions </Link>
                        such as creating new passkeys or deleting old ones. <br/><br/>
                        This `&rdquo;`Reset User State`&rdquo;` functionality exists in lieu of of the support processes that would likely exist in production.
                        This would involve the user providing proof of ownership of the account and then the passkey could be deleted off the account by the support member.<br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ResetUserStateButton;
