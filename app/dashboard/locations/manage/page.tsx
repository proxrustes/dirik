"use client"
import { Link , FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Location } from "../../../../definitions/types/Location"
import React, { useState } from 'react';
import { EmployeeBasic } from "@/definitions/types/Employee";

export default function Locations() {
    const locations: Location[] = [
        { id: 0, name: "Glek", adress: "Dierhagener str. 81", priceForHour: 4, priceMinimal: 10 },
        { id: 1, name: "Kuku", adress: "Greweveg 2", priceForHour: 5, priceMinimal: 20 }
    ];

    const employees: EmployeeBasic[] = [
        { id: 0, fullName: "Alice", location_id: 0 },
        { id: 1, fullName: "Bob", location_id: 0 },
        { id: 2, fullName: "Charlie", location_id: 1 },
        { id: 3, fullName: "Diana", location_id: 1 }
    ];

    const [firstLocation, setFirstLocation] = useState<number>(locations[0].id);
    const [secondLocation, setSecondLocation] = useState<number>(locations[0].id);

    const [employeeList, setEmployeeList] = useState<EmployeeBasic[]>(employees);

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

    if (locations.length > 0) {
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
        );
    } else {
        return (<Typography>Loading</Typography>);
    }
}