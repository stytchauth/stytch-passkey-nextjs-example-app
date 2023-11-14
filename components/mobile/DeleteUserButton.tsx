import {useStytch, useStytchUser} from "@stytch/nextjs";
import React from "react";
import {Button} from "@mui/material";
import {deleteCurrentUser} from "@/lib/utils";

function DeleteUserButton() {
    // This exists for testing purposes. This allows for a user to delete their account in the case the user loses access to their passkey,
    // and they want to take MFA required actions. What this would likely look like in production is the user reaching out to support and
    // having an admin delete their lost factors.
    const stytch = useStytch();
    const { user } = useStytchUser();

    return (
        <>
            <Button variant="contained" color="error" onClick={() => deleteCurrentUser(user, stytch)}>Delete User</Button>
        </>
    );
}

export default DeleteUserButton;
