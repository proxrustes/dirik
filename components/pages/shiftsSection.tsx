"use client"

import { Stack, Box, Breadcrumbs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ShiftsTable from "../tables/AllShiftsTable";
import { CafeLocation } from "@/definitions/types/Location";

export function ShiftsSection() {
    const [locations, setLocations] = useState<CafeLocation[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('http://localhost:3000/locations', {
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
                const data: CafeLocation[] = res;
                setLocations(data);
                setLocation(data[0])
            } catch { }


        };

        fetchLocations();
    }, []);
    
    const [currentLocation, setLocation] = useState<CafeLocation>();

    const handleLocationClick = (location: CafeLocation) => {
        setLocation(location);
    };
    return (
        <Stack sx={{ width: "100%" }}>
            <Box sx={{ height: "24px", pl: 2 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    {currentLocation && locations.map((location) =>
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
                <ShiftsTable locationId={currentLocation?.id ?? 0} />
            </Stack>
        </Stack>
    )
}