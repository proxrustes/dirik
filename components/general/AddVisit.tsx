"use client"

import { Button, Dialog, DialogTitle, ListItem, ListItemButton } from "@mui/material";
import { useState } from "react";

export function AddVisitPopup() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Button variant="contained" sx={{ fontWeight: 600 }} color="primary" onClick={handleClickOpen}>Add Visit</Button>

            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Set backup account</DialogTitle>

            </Dialog>
        </>

    );
}