"use client"
import { EmployeeBasic } from "@/definitions/types/Employee";
import { sign } from "@/lib/jwtUtils";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useReducer } from "react";
import { cookies } from "next/headers"
import { useRouter } from "next/router";

enum FormActionType {
    SET_EMAIL = 'SET_EMAIL',
    SET_PASSWORD = 'SET_PASSWORD'
}
interface FormAction {
    type: FormActionType;
    payload: string | number;
}
interface FormState {
    email: string;
    password: string;
}
function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case FormActionType.SET_EMAIL:
            return { ...state, email: action.payload as string };
        case FormActionType.SET_PASSWORD:
            return { ...state, password: action.payload as string };
        default:
            return state;
    }
}

export default function Login() {
    const initialState: FormState = {
        email: '',
        password: ''
    };
    const [state, dispatch] = useReducer(formReducer, initialState);
    const router = useRouter();

    async function login() {
        const KEY = process.env.JWT_KEY
        const token = state.password?.toString()
        if (!KEY || token === undefined) {
            return { error: true }
        }
        const db_user: EmployeeBasic = { id: 0, fullName: "Maria", location_id: 0 };
        if (db_user) {
            const jwt = await sign(
                {
                    id: db_user.id,
                    fullName: db_user.fullName,
                    location_id: db_user.location_id
                },
                KEY
            )
            cookies().set("currentUser", jwt)
            router.push('/dashboard')
            return { error: false }
        }
    }
    return (
        <>
            <Stack direction="row" gap={20} justifyContent="center" sx={{ mt: "20vh", color: "white" }}>
                <Stack gap={2} sx={{ width: 270 }} justifyContent="center">
                    <Typography variant="h3" sx={{ fontWeight: 600, color: "primary.dark" }}>
                        Welcome to
                        <span style={{ color: "#9CA3DB" }}> Dirik!</span>
                    </Typography>

                    <Typography sx={{ fontWeight: 600, color: "primary.dark" }}>Sign in to access the dashboard</Typography>
                </Stack>
                <Stack gap={1} justifyContent="center">
                    <TextField size="small" value={state.email} onChange={e => dispatch({ type: FormActionType.SET_EMAIL, payload: e.target.value })} id="email-input" label="Email" variant="outlined" ></TextField>
                    <TextField size="small" value={state.password} onChange={e => dispatch({ type: FormActionType.SET_PASSWORD, payload: e.target.value })} id="password-input" label="Password" variant="outlined"></TextField>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={login}>LOGIN</Button>
                </Stack></Stack>

        </>
    );
}
