"use client"

import { CafeLocation } from "@/definitions/types/Location";
import { TokenUser } from "@/definitions/types/Token";
import { Stack, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText, Button, SelectChangeEvent } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export function ManageLocationsSection() {
    const locations: CafeLocation[] = [
        { id: 0, name: "Glek", adress: "Dierhagener str. 81", priceForHour: 4, priceMinimal: 10 },
        { id: 1, name: "Kuku", adress: "Greweveg 2", priceForHour: 5, priceMinimal: 20 }
    ];

    const employees: TokenUser[] = [
        { id: 0, fullName: "Alice", position: "admin", location_id: 0 },
        { id: 1, fullName: "Bob", position: "janitor", location_id: 0 },
        { id: 2, fullName: "Charlie", position: "cook", location_id: 1 },
        { id: 3, fullName: "Diana", position: "admin", location_id: 1 }
    ];

    const [firstLocation, setFirstLocation] = useState<number>(locations[0].id);
    const [secondLocation, setSecondLocation] = useState<number>(locations[1].id ?? locations[0].id);

    const [employeeList, setEmployeeList] = useState<TokenUser[]>(employees);

    const handleFirstLocationChange = (event: SelectChangeEvent<number>) => {
        setFirstLocation(Number(event.target.value));
    };

    const handleSecondLocationChange = (event: SelectChangeEvent<number>) => {
        setSecondLocation(Number(event.target.value));
    };

    const shiftEmployee = (employeeId: number) => {
        setEmployeeList(currentEmployees => currentEmployees.map(employee => {
            if (employee.id === employeeId) {
                return {
                    ...employee,
                    location_id: employee.location_id === firstLocation ? secondLocation : firstLocation
                };
            }
            return employee;
        }));
    };

    return (
        <Stack sx={{ width: "100%" }}>
            <Link href="/dashboard/locations">← go back</Link>

            <Stack direction="row" sx={{
                borderWidth: 1, border: "1px solid black", borderRadius: 5,
                minHeight: 300, p: "22px", height: "fit-content", width: "100%"
            }}>
                <Stack sx={{ width: "50%" }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="first-location-label">Location 1</InputLabel>
                        <Select
                            labelId="first-location-label"
                            id="first-location-select"
                            value={firstLocation}
                            label="Location 1"
                            onChange={handleFirstLocationChange}
                        >
                            {locations.map((location) =>
                                <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <List>
                        {employeeList.filter(emp => emp.location_id === firstLocation).map(employee => (
                            <ListItem key={employee.id}>
                                <ListItemText primary={employee.fullName} />
                                <Button variant="contained" color="primary" onClick={() => shiftEmployee(employee.id)}>→</Button>
                            </ListItem>
                        ))}
                    </List>
                </Stack>
                <Stack sx={{ width: "50%" }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="second-location-label">Location 2</InputLabel>
                        <Select
                            labelId="second-location-label"
                            id="second-location-select"
                            value={secondLocation}
                            label="Location 2"
                            onChange={handleSecondLocationChange}
                        >
                            {locations.map((location) =>
                                <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <List>
                        {employeeList.filter(emp => emp.location_id === secondLocation).map(employee => (
                            <ListItem key={employee.id}>
                                <ListItemText primary={employee.fullName} />
                                <Button variant="contained" color="primary" onClick={() => shiftEmployee(employee.id)}>←</Button>
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </Stack>
        </Stack>
    )
}