"use client"

import { CafeLocation } from "@/definitions/types/Location";
import { Stack, Box, Breadcrumbs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LocationOverviewBox } from "../general/LocationOverview";
import EmployeesTable from "../tables/EmployeesTable";

export function LocationsSection() {
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
    if (currentLocation === undefined) {
        return (<Typography>loading</Typography>)
    }
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
                    minHeight: 300, p: "22px", height: "fit-content", width: "100%"

                }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontWeight: 800, fontSize: 20 }}>Employees overview</Typography>

                    </Stack>
                    <EmployeesTable locationId={currentLocation.id}/>

                </Stack>
                <LocationOverviewBox location={currentLocation} />
            </Stack>
        </Stack>
    )
}