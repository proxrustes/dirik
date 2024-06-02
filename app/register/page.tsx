"use client"
import { Button, MenuItem, Stack, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { redirect } from "next/dist/server/api-utils";
import { useReducer, useState, useEffect } from "react";

enum FormActionType {
    SET_NAME = 'SET_NAME',
    SET_EMAIL = 'SET_EMAIL',
    SET_PASSWORD = 'SET_PASSWORD',
    SET_CONFIRM_PASSWORD = 'SET_CONFIRM_PASSWORD',
    SET_LOCATION = 'SET_LOCATION',
    SET_SALARY_FIXED = 'SET_SALARY_FIXED',
    SET_SALARY_PERCENT = 'SET_SALARY_PERCENT'
}

interface FormAction {
    type: FormActionType;
    payload: string | number;
}

interface FormState {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    location: string;
    salaryFixed: number;
    salarayPercent: number;
}

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case FormActionType.SET_NAME:
            return { ...state, fullName: action.payload as string };
        case FormActionType.SET_EMAIL:
            return { ...state, email: action.payload as string };
        case FormActionType.SET_PASSWORD:
            return { ...state, password: action.payload as string };
        case FormActionType.SET_CONFIRM_PASSWORD:
            return { ...state, confirmPassword: action.payload as string };
        case FormActionType.SET_LOCATION:
            return { ...state, location: action.payload as string };
        case FormActionType.SET_SALARY_FIXED:
            return { ...state, salaryFixed: Number(action.payload) };
        case FormActionType.SET_SALARY_PERCENT:
            return { ...state, salarayPercent: Number(action.payload) };
        default:
            return state;
    }
}

const fetchLocations = async () => {
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
    const res = await response.json();
    return res;
};

export default function Register() {
    const initialState: FormState = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        location: '',
        salaryFixed: 0,
        salarayPercent: 0
    };

    const [state, dispatch] = useReducer(formReducer, initialState);
    const [locations, setLocations] = useState<{ value: string; label: string }[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locations = await fetchLocations();
                setLocations(locations.map((loc: any) => ({ value: loc.id.toString(), label: loc.name })));
            } catch (error: any) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    async function register() {
        // Fill missing fields with fake data
        const employeeData = {
            fullName: state.fullName || 'John Doe',
            email: state.email || 'john.doe@example.com',
            password: state.password || 'password123',
            confirmPassword: state.confirmPassword || 'password123',
            locationId: parseInt(state.location) || (locations[0]?.value ? parseInt(locations[0].value) : 0),
            salaryFixed: state.salaryFixed || 4000,
            salarayPercent: state.salarayPercent || 5,
            phone: '1234567890',
            homeAdress: '123 Fake Street',
            availableSalary: 0,
            passportNumber: 'A1234567',
            INN: '1234567890',
            position: 'Employee'
        };

        try {
            const response = await fetch('http://164.90.168.113/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(employeeData)
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.error || `HTTP error! status: ${response.status}`);
            }

        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <>
            <Stack direction="row" gap={20} justifyContent="center" sx={{ mt: "20vh" }}>
                <Stack gap={2} sx={{ width: 200 }} justifyContent="center">
                    <Typography variant="h3" sx={{ fontWeight: 600, color: "primary.dark" }}>
                        Welcome to
                        <span style={{ color: "#9CA3DB" }}> Dirik!</span>
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>You can register a new employee here</Typography>
                </Stack>
                <Stack gap={2} justifyContent="center">
                    <TextField size="small" id="name-input" label="Full name" variant="outlined" value={state.fullName} onChange={e => dispatch({ type: FormActionType.SET_NAME, payload: e.target.value })} />
                    <Stack direction="row" gap={2}>
                        <Stack gap={2}>
                            <TextField size="small" id="email-input" label="Email" variant="outlined" value={state.email} onChange={e => dispatch({ type: FormActionType.SET_EMAIL, payload: e.target.value })} />
                            <TextField size="small" id="password-input" label="Password" variant="outlined" value={state.password} onChange={e => dispatch({ type: FormActionType.SET_PASSWORD, payload: e.target.value })} />
                            <TextField size="small" error={state.password !== state.confirmPassword} id="confirm-password-input" label="Confirm password" variant="outlined" value={state.confirmPassword} onChange={e => dispatch({ type: FormActionType.SET_CONFIRM_PASSWORD, payload: e.target.value })} />
                        </Stack>
                        <Stack gap={2}>
                            <TextField
                                size="small"
                                id="location-input"
                                select
                                label="Location"
                                value={state.location}
                                onChange={e => dispatch({ type: FormActionType.SET_LOCATION, payload: e.target.value })}
                                variant="outlined"
                            >
                                {locations.map(option => (
                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </TextField>
                            <TextField size="small" id="salary-fixed-input" label="Salary fixed" type="number" value={state.salaryFixed} onChange={e => dispatch({ type: FormActionType.SET_SALARY_FIXED, payload: e.target.value })} variant="outlined" />
                            <TextField size="small" id="salary-percent-input" label="Salary percent" type="number" value={state.salarayPercent} onChange={e => dispatch({ type: FormActionType.SET_SALARY_PERCENT, payload: e.target.value })} variant="outlined" />
                        </Stack>
                    </Stack>
                    <Button variant="contained" sx={{ mt: 1 }} onClick={register}>REGISTER NEW EMPLOYEE</Button>
                </Stack>
            </Stack>

            {error && (
                <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </>
    );
}
