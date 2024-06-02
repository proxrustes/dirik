"use client"

import { Stack, Box, Breadcrumbs, Typography, FormControlLabel, Switch } from "@mui/material"
import { ShiftOverviewBox } from "../general/ShiftOverview"
import CurrentShiftTable from "../tables/ShiftTable"
import { CafeLocation } from "../../definitions/types/Location"
import { useState } from "react"
import { Shift } from "@/definitions/types/Shift"
import { useEffect } from "react"

export function CurrentShiftSection() {

    const [currentLocation, setLocation] = useState<CafeLocation>();
    const [financeView, setFinanceView] = useState(false)
    const [currentShift, setShift] = useState<Shift>();

    useEffect(() => {
        const fetchShift = async () => {
            try {
                const response = await fetch('http://164.90.168.113/shifts', {
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
        <Stack sx={{ width: "100%", mt: 3 }} gap={4} direction="row" justifyContent="space-between">
            <Stack sx={{
                borderWidth: 1.5, borderStyle: "solid", borderColor: "primary.dark",
                minHeight: 300, borderRadius: 5, p: "22px", width: "100%"

            }}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 800, fontSize: 20 }}>Current shift</Typography>

                    <FormControlLabel
                        control={<Switch color="primary" checked={financeView} onChange={() => setFinanceView(!financeView)} />}
                        label="Finance view"
                    />

                </Stack>
                {
                    currentShift && <CurrentShiftTable financeView={financeView} shift={currentShift} />
                }
            </Stack>
            <ShiftOverviewBox shift={currentShift} />
        </Stack>
    )
}