"use client"

import { Stack, Box, Breadcrumbs, Typography, FormControlLabel, Switch } from "@mui/material"
import { ShiftOverviewBox } from "../general/ShiftOverview"
import CurrentShiftTable from "../tables/ShiftTable"
import { CafeLocation } from "../../definitions/types/Location"
import { useState } from "react"
import { Shift } from "@/definitions/types/Shift"

const mockShift: Shift = {
    id: 1, locationId: 0, creatorId: 0, location: "Johanisstr. 34", startDate: "29/09/2024",
    availableCash: 110,
    totalCash: 4550,
    totalMoney: 9000
}

export function CurrentShiftSection() {
    const location: CafeLocation = { id: 0, name: "Glek", adress: "Dierhagener str. 81", priceForHour: 4, priceMinimal: 20 }
    const [currentLocation, setLocation] = useState(location)
    const [financeView, setFinanceView] = useState(false)


    return (
        <Stack sx={{ width: "100%", mt:3 }} gap={4} direction="row" justifyContent="space-between">
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
                <CurrentShiftTable financeView={financeView} locationId={currentLocation.id} />
            </Stack>
            <ShiftOverviewBox shift={mockShift} />
        </Stack>
    )
}