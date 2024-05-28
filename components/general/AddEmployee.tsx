"use client"

import { Employee } from "@/definitions/types/Employee";
import { CafeLocation } from "@/definitions/types/Location";
import { Button, Dialog, DialogTitle, TextField, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

// Fetch locations from API
const fetchLocations = async () => {
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
    const res = await response.json();
    return res as CafeLocation[];
};

export function AddEmployeePopup() {
    const [open, setOpen] = useState(false);
    const [locations, setLocations] = useState<CafeLocation[]>([]);
    const [location, setLocation] = useState<CafeLocation | null>(null);
    const [employeeDetails, setEmployeeDetails] = useState({
        fullName: '',
        position: '',
        phone: '',
        email: '',
        homeAdress: '',
        locationId: 0,
        salaryFixed: '',
        salarayPercent: '',
        availableSalary: '',
        passportNumber: '',
        INN: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locations = await fetchLocations();
                setLocations(locations);
                setLocation(locations[0]);
            } catch (error) {
                console.error('Fetching locations failed:', error);
            }
        };
        fetchData();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployeeDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedLocation = locations.find(loc => loc.id === parseInt(e.target.value));
        setLocation(selectedLocation || null);
        setEmployeeDetails(prevDetails => ({
            ...prevDetails,
            locationId: selectedLocation ? selectedLocation.id : 0
        }));
    };

    const handleSubmit = async () => {
        const employeeData = {
            ...employeeDetails,
            salaryFixed: parseFloat(employeeDetails.salaryFixed),
            salarayPercent: parseFloat(employeeDetails.salarayPercent),
            availableSalary: parseFloat(employeeDetails.availableSalary)
        };

        try {
            const response = await fetch('http://localhost:3000/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(employeeData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            handleClose();
        } catch (error) {
            console.error('Submitting employee failed:', error);
        }
    };

    return (
        <>
            <Button variant="contained" sx={{ fontWeight: 600 }} color="primary" onClick={handleClickOpen}>Add Employee</Button>

            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Add Employee</DialogTitle>
                <div style={{ padding: 20 }}>
                    <TextField
                        label="Full Name"
                        name="fullName"
                        value={employeeDetails.fullName}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Position"
                        name="position"
                        value={employeeDetails.position}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={employeeDetails.phone}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={employeeDetails.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Home Address"
                        name="homeAdress"
                        value={employeeDetails.homeAdress}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        select
                        label="Location"
                        value={location?.id || ''}
                        onChange={handleSelectChange}
                        fullWidth
                        margin="normal"
                    >
                        {locations.map((loc) => (
                            <MenuItem key={loc.id} value={loc.id}>
                                {loc.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Fixed Salary"
                        name="salaryFixed"
                        value={employeeDetails.salaryFixed}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Salary Percent"
                        name="salarayPercent"
                        value={employeeDetails.salarayPercent}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Available Salary"
                        name="availableSalary"
                        value={employeeDetails.availableSalary}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Passport Number"
                        name="passportNumber"
                        value={employeeDetails.passportNumber}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="INN"
                        name="INN"
                        value={employeeDetails.INN}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                        Submit
                    </Button>
                </div>
            </Dialog>
        </>
    );
}
