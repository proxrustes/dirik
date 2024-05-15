"use client"
import { Employee } from "@/definitions/types/Employee";
import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';

type Page = "currentShift" | "cashbox" | "shifts" | "visits" | "locations"
const user: Employee ={
  id: 0,
  fullName: "Ivan Boiko",
  position: "Admin",
  phone: "string",
  email: "string",
  homeAdress: "string",
  location_id: 1,
  location: "dirik",
  salaryFixed: 1300,
  salarayPercent: 15,
  availableSalary: 2400,
  passportNumber: "123",
  INN: "1234"
  
}
export function UserBox(props: { pageType: Page}) {
    return (
        <Stack gap={1} sx={{ width: 260, mt: 3, p: "22px", height: "fit-content", borderRadius: 5, borderWidth: 1.5, borderStyle: "solid", borderColor: "primary.dark" }}>
            <Stack alignItems="center" direction="row" gap={1}>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                    <FaceIcon />
                </Avatar>
                <Stack>
                    <Typography sx={{ fontWeight: 800 }}>{user.fullName}</Typography>
                    <Typography sx={{ fontWeight: 800, color: "primary.light", lineHeight: 1 }}>{user.position}</Typography>
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