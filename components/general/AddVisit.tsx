"use client"

import { CafeLocation } from "@/definitions/types/Location";
import { Shift } from "@/definitions/types/Shift";
import { Button, Dialog, DialogTitle, ListItem, ListItemButton, TextField, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

export function AddVisitPopup() {
    const [open, setOpen] = useState(false);
    const [locations, setLocations] = useState<CafeLocation[]>([]);
    const [location, setLocation] = useState<CafeLocation | null>(null);
    const [visitDetails, setVisitDetails] = useState({
        shiftId: '',
        totemName: '',
        clientsAmount: '',
        price: '',
        isPriceFixed: false,
        startAt: ''
    });
    const [currentShift, setShift] = useState<Shift>();

    useEffect(() => {
        const fetchShift = async () => {
            try {
                const response = await fetch('https://164.90.168.113/shifts', {
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


        }
        fetchShift();
    }, []);
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('https://164.90.168.113/locations', {
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
                const data: CafeLocation[] = res;
                setLocations(data);
                setLocation(data[0]);
            } catch (error) {
                console.error('Fetching locations failed:', error);
            }
        };

        fetchLocations();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVisitDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedLocation = locations.find(loc => loc.id === parseInt(e.target.value));
        setLocation(selectedLocation || null);
    };

    const handleSubmit = async () => {
        if (currentShift !== undefined) {
            console.log(currentShift.id)
            const visitData = {
                ...visitDetails,
                shiftId: currentShift.id,
                clientsAmount: parseInt(visitDetails.clientsAmount),
                price: parseFloat(visitDetails.price),
                startAt: new Date(visitDetails.startAt).toISOString(),
                locationId: location?.id
            };
            try {
                const response = await fetch('https://164.90.168.113/visits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify(visitData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                handleClose();
            } catch (error) {
                console.error('Submitting visit failed:', error);
            }
        }



    };

    return (
        <>
            <Button variant="contained" sx={{ fontWeight: 600 }} color="primary" onClick={handleClickOpen}>Add Visit</Button>

            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Add Visit</DialogTitle>
                <div style={{ padding: 20 }}>
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
                        label="Totem Name"
                        name="totemName"
                        value={visitDetails.totemName}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Clients Amount"
                        name="clientsAmount"
                        value={visitDetails.clientsAmount}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={visitDetails.price}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Start At"
                        name="startAt"
                        type="datetime-local"
                        value={visitDetails.startAt}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                        Submit
                    </Button>
                </div>
            </Dialog>
        </>
    );
}
