"use client"

import { Stack, Box, Breadcrumbs, Typography, FormControlLabel, Switch } from "@mui/material"
import { ShiftOverviewBox } from "../general/ShiftOverview"
import CurrentShiftTable from "../tables/ShiftTable"
import { Location } from "../../definitions/types/Location"
import { useState } from "react"
import { Shift } from "@/definitions/types/Shift"
const mockShift: Shift = {
    id: 1, locationId: 0, creatorId: 0, location: "Johanisstr. 34", startDate: "29/09/2024",
    availableCash: 110,
    totalCash: 4550,
    totalMoney: 9000
}

export function CurrentShiftSection() {
    const locations: Location[] = [{ id: 0, name: "Glek", adress: "Dierhagener str. 81", priceForHour: 4, priceMinimal: 20 },
    { id: 1, name: "Kuku", adress: "Greweveg 2", priceForHour: 4, priceMinimal: 20 }]
    const [currentLocation, setLocation] = useState(locations[0])
    const [financeView, setFinanceView] = useState(false)

    const handleLocationClick = (location: Location) => {
        setLocation(location);
    };
    return (
        <Stack sx={{ width: "100%" }}>
            <Box sx={{ height: "24px", pl: 2 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    {locations.map((location) =>
                        <Typography
                            key={location.id}
                            sx={{ fontWeight: location.id === currentLocation.id ? 800 : 400, cursor: 'pointer' }}
                            onClick={() => handleLocationClick(location)}
                        >
                            {location.name}
                        </Typography>
                    )}
                </Breadcrumbs>
            </Box>
            <Stack sx={{ width: "100%" }} gap={4} direction="row" justifyContent="space-between">
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
        </Stack>
    )
}