"use client"

import { login } from "@/lib/login";
import { Stack, FormControl, TextField, Button, Box } from "@mui/material";
import { useReducer } from "react";
import { useFormState } from "react-dom";
enum FormActionType {
    SET_EMAIL = 'SET_EMAIL',
    SET_PASSWORD = 'SET_PASSWORD'
}
interface FormAction {
    type: FormActionType;
    payload: string | number;
}
export interface FormState {
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
export function LoginBox() {
    const initialState: FormState = {
        email: '',
        password: ''
    };
    const [form, dispatch] = useReducer(formReducer, initialState);
    const [state, formAction] = useFormState(login, { error: false })
    return (
        <Box component="form" action={formAction} noValidate sx={{ mt: 5 }}>
            <Stack gap={1} justifyContent="center" >
                <FormControl size="small" sx={{ width: { xl: 400, md: 350 } }}>

                    <TextField size="small" name="email" value={form.email} onChange={e => dispatch({ type: FormActionType.SET_EMAIL, payload: e.target.value })} id="email-input" label="Email" variant="outlined" ></TextField>
                    <TextField size="small"  name="password"value={form.password} onChange={e => dispatch({ type: FormActionType.SET_PASSWORD, payload: e.target.value })} id="password-input" label="Password" variant="outlined"></TextField>
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>LOGIN</Button>
                </FormControl>
            </Stack></Box>
    )

}