"use client"
import { Employee } from "@/definitions/types/Employee";
import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';

type Page = "currentShift" | "cashbox" | "shifts" | "visits" | "locations"

function getPageTypeFromURL(): Page {
    const pathname = window.location.pathname; 
  
    if (pathname.includes('/dashboard/current-shift')) {
      return "currentShift";
    } else if (pathname.includes('/dashboard/cashbox')) {
      return "cashbox";
    } else if (pathname.includes('/dashboard/shifts')) {
      return "shifts";
    } else if (pathname.includes('/dashboard/visits')) {
      return "visits";
    } else if (pathname.includes('/dashboard/locations')) {
      return "locations";
    }
    return "currentShift"; 
  }

export function UserBox(props: { user: Employee}) {
    const pageType = getPageTypeFromURL();
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
            <Button variant={pageType == "currentShift" ? "outlined" : "contained"} sx={{ fontWeight: 600 }} href="/dashboard/current-shift">CURRENT SHIFT</Button>
            <Divider sx={{ my: 1 }} />
            <Button variant={pageType == "shifts" ? "outlined" : "contained"} sx={{ fontWeight: 600 }} href="/dashboard/shifts">SHIFTS</Button>
            <Button variant={pageType == "visits" ? "outlined" : "contained"} sx={{ fontWeight: 600 }} href="/dashboard/visits">VISITS</Button>
            <Button variant={pageType == "locations" ? "outlined" : "contained"} sx={{ fontWeight: 600 }} href="/dashboard/locations">LOCATIONS</Button>
            <Button disabled variant={pageType == "cashbox" ? "outlined" : "contained"} sx={{ fontWeight: 600 }} href="/dashboard/cashbox">CASH BOX</Button>
        </Stack>
    );
}