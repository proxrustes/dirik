"use client"

import { CafeLocation } from "@/definitions/types/Location";
import { Stack, Box, Breadcrumbs, Typography } from "@mui/material";
import { useState } from "react";
import { LocationOverviewBox } from "../general/LocationOverview";
import EmployeesTable from "../tables/EmployeesTable";

export function LocationsSection(){
    const locations: CafeLocation[] = [{ id: 0, name: "Glek", adress: "Dierhagener str. 81", priceForHour: 4, priceMinimal: 10 },
    { id: 1, name: "Kuku", adress: "Greweveg 2", priceForHour: 5, priceMinimal: 20 }]
    const [currentLocation, setLocation] = useState(locations[0])
    
    const handleLocationClick = (location: CafeLocation) => {
        setLocation(location);
    };

    return(
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
                        <EmployeesTable />
                        
                    </Stack>
                        <LocationOverviewBox location={currentLocation} />
                </Stack>
            </Stack>
    )
}