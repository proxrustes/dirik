"use client"

import { createTheme } from "@mui/material";

export const theme = createTheme({

    palette: {
        text: {
            primary: "#454B66"
        },
            mode: 'light',
        primary: {
            light: '#9CA3DB',
            main: '#677DB7',
            dark: '#454B66',
            contrastText: '#fff',
        },
        secondary: {
            light: '#DBE65B',
            main: '#DBE65B',
            dark: '#ba000d',
            contrastText: '#454B66',
        },
    },
});