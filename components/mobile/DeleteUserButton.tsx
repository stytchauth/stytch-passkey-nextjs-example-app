import {useStytch, useStytchUser} from "@stytch/nextjs";
import React from "react";
import {Button} from "@mui/material";
import {deleteCurrentUser} from "@/lib/utils";

function DeleteUserButton() {
    const stytch = useStytch();
    const { user } = useStytchUser();

    return (
        <>
            <Button variant="contained" color="error" onClick={() => deleteCurrentUser(user, stytch)}>Delete User</Button>
        </>
    );
}

export default DeleteUserButton;
