import { Stack } from "@mui/material";
import { UserBox } from "@/components/general/UserBox";
import { VisitsSection } from "@/components/pages/visits";
import { getUserFromJWT } from "@/lib/jwtUtils";


export default function Visits() {
    const user = getUserFromJWT()
    return (
        <Stack direction="row" gap={4}>
            <UserBox user={user} pageType="visits" />
            <VisitsSection />
        </Stack>

    )

}