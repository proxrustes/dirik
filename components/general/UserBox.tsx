"use client"

import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import { TokenUser } from "@/definitions/types/Token";

type Page = "currentShift" | "cashbox" | "shifts" | "visits" | "locations"

export function UserBox(props: { user: TokenUser, pageType: Page}) {


    return (
        <Stack gap={1} sx={{ width: 260, mt: 3, p: "22px", height: "fit-content", borderRadius: 5, borderWidth: 1.5, borderStyle: "solid", borderColor: "primary.dark" }}>
            <Stack alignItems="center" direction="row" gap={1}>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                    <FaceIcon />
                </Avatar>
                <Stack>
                    <Typography sx={{ fontWeight: 800 }}>{props.user.fullName}</Typography>
                    <Typography sx={{ fontWeight: 800, color: "primary.light", lineHeight: 1 }}>{props.user.position}</Typography>
                </Stack>
            </Stack>

            <Divider sx={{ my: 1 }} />
            <Button variant="contained" disabled sx={{ fontWeight: 600 }} href="/dashboard">DASHBOARD</Button>
            <Button variant={props.pageType == "currentShift" ? "outlined" : "contained"} sx={{ fontWeight: 600 }} href="/dashboard/current-shift">CURRENT SHIFT</Button>
            <Divider sx={{ my: 1 }} />
            <Button variant={props.pageType == "shifts" ? "outlined" : "contained"} sx={{ fontWeight: 600 }} href="/dashboard/shifts">SHIFTS</Button>
            <Button variant={props.pageType == "visits" ? "outlined" : "contained"} sx={{ fontWeight: 600 }} href="/dashboard/visits">VISITS</Button>
            <Button variant={props.pageType == "locations" ? "outlined" : "contained"} sx={{ fontWeight: 600 }} href="/dashboard/locations">LOCATIONS</Button>
            <Button disabled variant={props.pageType == "cashbox" ? "outlined" : "contained"} sx={{ fontWeight: 600 }} href="/dashboard/cashbox">CASH BOX</Button>
        </Stack>
    );
}