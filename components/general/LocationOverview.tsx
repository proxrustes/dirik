import { Button, Stack, Typography } from "@mui/material";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { ReactNode } from "react";
import { CafeLocation } from "@/definitions/types/Location";

export function ShiftStatsIcon(props: { icon: ReactNode, title: string, display: string | number }) {
    return (
        <Stack width={100} alignItems="center">
            {props.icon}
            <Typography sx={{ fontSize: 10, color: "primary.main" }}>{props.title}</Typography>
            <Typography sx={{ fontWeight: 600 }}>{props.display}</Typography>
        </Stack>
    )
}
export function LocationOverviewBox(props: { location: CafeLocation }) {
    return (
        <Stack gap={4} sx={{ p: "22px", height: "fit-content", borderRadius: 5, borderWidth: 1.5, borderStyle: "solid", borderColor: "primary.dark" }}>
            <Stack alignItems="center"> <Typography sx={{ fontWeight: 800, fontSize: 20 }}>Location Overview</Typography>
                <Typography>{props.location.adress}</Typography>
            </Stack>

            <Stack gap={2}>
                <Stack direction="row" gap={2}>
                    <ShiftStatsIcon icon={<AttachMoneyOutlinedIcon sx={{ fontSize: 60, color: "primary.main" }} />} title="PER HOUR" display={`${props.location.priceForHour} $`} />
                    <ShiftStatsIcon icon={<PaymentsOutlinedIcon sx={{ fontSize: 60, color: "primary.main" }} />} title="MINIMUM PRICE" display={`${props.location.priceMinimal} $`} />
                </Stack>

            </Stack>

            <Stack gap={2}>
            <Button variant="contained" sx={{ fontWeight: 800 }} href="/register">add employee</Button>
                <Button variant="contained" sx={{ fontWeight: 800 }} href="locations/manage">manage locations</Button>
            </Stack>



        </Stack>
    )
}