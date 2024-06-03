"use client"

import { Stack, Box, Typography } from "@mui/material";
import { ShiftOverviewBox } from "../general/ShiftOverview";
import VisitsTable from "../tables/AllVisitsTable";
import { useState } from "react";
import { Shift } from "@/definitions/types/Shift";
import { useEffect } from "react";

export function VisitsSection() {
    const [currentShift, setShift] = useState<Shift>();

    useEffect(() => {
        const fetchShift = async () => {
            try {
                const response = await fetch('https://164.90.168.113/shifts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const res = await response.json()
                const data: Shift[] = res;
                const openShift = data.filter(shift => shift.endDate === null);
                setShift(openShift[0])
            } catch { }


        }
        fetchShift();
    }, []);

    return (
        <Stack sx={{ width: "100%" }}>
            <Box sx={{ height: "24px", pl: 2 }}>
            </Box>
            <Stack sx={{ width: "100%" }} gap={4} direction="row" justifyContent="space-between">
                <Stack sx={{
                    borderWidth: 1, border: "1px solid black", borderRadius: 5,
                    minHeight: 300, p: "22px", width: "100%"

                }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontWeight: 800, fontSize: 20 }}>Visits</Typography>
                    </Stack>
                    <VisitsTable/>
                </Stack>
                <ShiftOverviewBox shift={currentShift} />
            </Stack>
        </Stack>
    )
}