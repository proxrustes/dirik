import { Stack,} from "@mui/material";
import { UserBox } from "@/components/general/UserBox";
import { ManageLocationsSection } from "@/components/pages/manageLocationsSection";
import { getUserFromJWT } from "@/lib/jwtUtils";

export default function Locations() {
    const user = getUserFromJWT()
    return (
        <Stack direction="row" gap={4}>
            <UserBox user={user} pageType="locations" />
            <ManageLocationsSection />
        </Stack>

    );

}