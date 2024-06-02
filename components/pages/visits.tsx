"use client"

import { Stack, Box, Breadcrumbs, Typography } from "@mui/material";
import { ShiftOverviewBox } from "../general/ShiftOverview";
import VisitsTable from "../tables/AllVisitsTable";
import { useState } from "react";
import { CafeLocation } from "@/definitions/types/Location";
import { Shift } from "@/definitions/types/Shift";
import { useEffect } from "react";


export function VisitsSection() {
    const [locations, setLocations] = useState<CafeLocation[]>([]);
    const [currentShift, setShift] = useState<Shift>();

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('http://164.90.168.113/locations', {
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


        };


        fetchLocations();
        fetchShift();
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
            <Stack sx={{ width: "100%" }} gap={4} direction="row" justifyContent="space-between">
                <Stack sx={{
                    borderWidth: 1, border: "1px solid black", borderRadius: 5,
                    minHeight: 300, p: "22px", width: "100%"

                }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontWeight: 800, fontSize: 20 }}>Visits</Typography>
                    </Stack>
                    <VisitsTable locationId={currentLocation?.id ?? 0} />
                </Stack>
                <ShiftOverviewBox shift={currentShift} />
            </Stack>
        </Stack>
    )
}