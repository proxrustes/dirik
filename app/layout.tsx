import { Header } from "@/components/general/Header";
import React from 'react';
import { theme } from "@/styles/theme";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DIRIK"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <title>Dirik</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="xl" style={{ backgroundColor: "#fff" }}>
            <Header />
            {children}</Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
