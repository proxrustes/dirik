import { Stack } from "@mui/material";
import { UserBox } from "@/components/general/UserBox";
import { getUserFromJWT } from "@/lib/jwtUtils";
import { CurrentShiftSection } from "@/components/pages/currentShift";

export default function CurrentShift() {

    const user = getUserFromJWT()

    return (
        <Stack direction="row" gap={4}>
            <UserBox user={user} pageType="currentShift" />
            <CurrentShiftSection />
        </Stack>

    )

}