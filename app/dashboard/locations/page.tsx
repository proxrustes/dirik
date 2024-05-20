
import { Stack } from "@mui/material";
import { UserBox } from "@/components/general/UserBox";
import { LocationsSection } from "@/components/pages/locationsSection";
import { getUserFromJWT } from "@/lib/jwtUtils";

export default function Locations() {
    const user = getUserFromJWT()
    return (
        <Stack direction="row" gap={4}>
            <UserBox user={user} pageType="locations" />
            <LocationsSection />
        </Stack>

    )
}