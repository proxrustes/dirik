import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import { LoginBox } from "@/components/LoginBox";


export default function Login() {

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
               <LoginBox/>
               </Stack>

        </>
    );
}
