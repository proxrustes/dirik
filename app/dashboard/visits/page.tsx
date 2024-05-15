"use client"
import { Box, Breadcrumbs, FormControlLabel, Link, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import { Location } from "../../../definitions/types/Location"
import BasicTable from "@/components/tables/ShiftTable";
import { ShiftOverviewBox } from "@/components/general/ShiftOverview";
import { Shift } from "@/definitions/types/Shift";
import VisitsTable from "@/components/tables/AllVisitsTable";

const mockShift: Shift = {
    id: 1, creatorId: 0,
    locationId: 0, location: "Johanisstr. 34", startDate: "29.09.2024",
    availableCash: 110,
    totalCash: 4550,
    totalMoney: 9000
}

export default function Visits() {
    const locations: Location[] = [{ id: 0, name: "Glek", adress: "Dierhagener str. 81", priceForHour: 4, priceMinimal: 20 },
    { id: 1, name: "Kuku", adress: "Greweveg 2", priceForHour: 4, priceMinimal: 20 }]
    const [currentLocation, setLocation] = useState(locations[0])
    const [financeView, setFinanceView] = useState(false)
    const handleLocationClick = (location: Location) => {
        setLocation(location);
    };

    if (locations.length > 0) {
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
                        borderWidth: 1, border: "1px solid black", borderRadius: 5,
                        minHeight: 300, p: "22px", width: "100%"

                    }}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography sx={{ fontWeight: 800, fontSize: 20 }}>Visits</Typography>
                        </Stack>
                        <VisitsTable locationId={currentLocation.id} />
                    </Stack>
                    <ShiftOverviewBox shift={mockShift} />
                </Stack>
            </Stack>
        )
    }
    return (<Typography>Loading</Typography>);

}