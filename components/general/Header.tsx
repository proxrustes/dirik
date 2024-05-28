"use client"
import { Link, Stack, Typography } from "@mui/material";

export function Header() {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{
            width: "100%", height: 34, mb:1, pt:2
        }}>
            <Link variant="h4" sx={{ fontWeight: 600 }} href="/">Dirik</Link>
            <Typography sx={{ fontWeight: 100 }}>UKR</Typography>
        </Stack>
    )
}