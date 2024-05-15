"use client"
import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Location } from "../../../definitions/types/Location"
import ShiftsTable from "@/components/tables/AllShiftsTable";
import { Employee } from "@/definitions/types/Employee";
import { UserBox } from "@/components/general/UserBox";

const locations: Location[] = [{ id: 0, name: "Glek", adress: "Dierhagener str. 81", priceForHour: 4, priceMinimal: 20 },
{ id: 1, name: "Kuku", adress: "Greweveg 2", priceForHour: 4, priceMinimal: 20 }]

export default function Shifts() {
    const [currentLocation, setLocation] = useState(locations[0])
    
    const handleLocationClick = (location: Location) => {
        setLocation(location);
    };

    if (locations.length > 0) {
        return (
            <Stack direction="row" gap={4}>
            <UserBox pageType="shifts"/>
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
                            <Typography sx={{ fontWeight: 800, fontSize: 20}}>Shifts</Typography>
                        </Stack>
                        <ShiftsTable locationId={0}/>
                    </Stack>
            </Stack>
        </Stack>
           
        )
    }
    return (<Typography>Loading</Typography>);

}