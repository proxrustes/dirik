import { Stack } from "@mui/material";
import { UserBox } from "@/components/general/UserBox";
import { ShiftsSection } from "@/components/pages/shiftsSection";
import { getUserFromJWT } from "@/lib/jwtUtils";

export default function Shifts() {
    const user = getUserFromJWT()
    return (
        <Stack direction="row" gap={4}>
            <UserBox user={user} pageType="shifts" />
            <ShiftsSection />
        </Stack>

    )

}