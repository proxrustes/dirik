"use client"

import { Stack, Box, Breadcrumbs, Typography } from "@mui/material";
import { useState } from "react";
import ShiftsTable from "../tables/AllShiftsTable";
import { CafeLocation } from "@/definitions/types/Location";

export function ShiftsSection() {
    const locations: CafeLocation[] = [{ id: 0, name: "Glek", adress: "Dierhagener str. 81", priceForHour: 4, priceMinimal: 20 },
    { id: 1, name: "Kuku", adress: "Greweveg 2", priceForHour: 4, priceMinimal: 20 }]
    const [currentLocation, setLocation] = useState(locations[0])

    const handleLocationClick = (location: CafeLocation) => {
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
            <Stack sx={{
                borderWidth: 1.5, borderStyle: "solid", borderColor: "primary.dark",
                minHeight: 300, borderRadius: 5, p: "22px", width: "100%"

            }}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 800, fontSize: 20 }}>Shifts</Typography>
                </Stack>
                <ShiftsTable locationId={0} />
            </Stack>
        </Stack>
    )
}