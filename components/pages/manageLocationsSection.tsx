"use client"

import { useEffect, useState } from "react";
import { Stack, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText, Button, SelectChangeEvent, Snackbar, Alert } from "@mui/material";
import Link from "next/link";

interface CafeLocation {
    id: number;
    name: string;
}

interface TokenUser {
    id: number;
    fullName: string;
    locationId: number;
}

export function ManageLocationsSection() {
    const [locations, setLocations] = useState<CafeLocation[]>([]);
    const [employees, setEmployees] = useState<TokenUser[]>([]);
    const [firstLocation, setFirstLocation] = useState<number>(0);
    const [secondLocation, setSecondLocation] = useState<number>(0);
    const [employeeList, setEmployeeList] = useState<TokenUser[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locationsResponse = await fetch('https://164.90.168.113/locations');
                if (!locationsResponse.ok) throw new Error('Failed to fetch locations');
                const locationsData = await locationsResponse.json();
                setLocations(locationsData);

                const employeesResponse = await fetch('https://164.90.168.113/employees');
                if (!employeesResponse.ok) throw new Error('Failed to fetch employees');
                const employeesData = await employeesResponse.json();
                setEmployees(employeesData);

                setFirstLocation(locationsData[0]?.id || 0);
                setSecondLocation(locationsData[1]?.id || locationsData[0]?.id || 0);
                setEmployeeList(employeesData);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const handleFirstLocationChange = (event: SelectChangeEvent<number>) => {
        setFirstLocation(Number(event.target.value));
    };

    const handleSecondLocationChange = (event: SelectChangeEvent<number>) => {
        setSecondLocation(Number(event.target.value));
    };

    const shiftEmployee = async (employeeId: number) => {
        const updatedLocationId = employeeList.find(emp => emp.id === employeeId)?.locationId === firstLocation ? secondLocation : firstLocation;

        try {
            const response = await fetch(`https://164.90.168.113/employees/${employeeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ locationId: updatedLocationId })
            });

            if (!response.ok) throw new Error('Failed to update employee');

            const updatedEmployee = await response.json();
            setEmployeeList(currentEmployees =>
                currentEmployees.map(employee =>
                    employee.id === employeeId ? updatedEmployee : employee
                )
            );
        } catch (error: any) {
            setError(error.message);
        }
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
                        {employeeList.filter(emp => emp.locationId === firstLocation).map(employee => (
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
                        {employeeList.filter(emp => emp.locationId === secondLocation).map(employee => (
                            <ListItem key={employee.id}>
                                <ListItemText primary={employee.fullName} />
                                <Button variant="contained" color="primary" onClick={() => shiftEmployee(employee.id)}>←</Button>
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </Stack>

            {error && (
                <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </Stack>
    )
}
