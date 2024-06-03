import { Shift } from "@/definitions/types/Shift";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import { ReactNode } from "react";
import { AddVisitPopup } from "./AddVisit";
import { format } from "date-fns";

async function handleClose(shiftId: number) {
    const response = await fetch(`http://164.90.168.113/shifts/${shiftId}/close`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
    });
}

export function ShiftStatsIcon(props: { icon: ReactNode, title: string, display: string | number }) {
    return (
        <Stack width={100} alignItems="center">
            {props.icon}
            <Typography sx={{ fontSize: 10, color: "primary.main" }}>{props.title}</Typography>
            <Typography sx={{ fontWeight: 600 }}>{props.display}</Typography>
        </Stack>
    );
}
export function ShiftOverviewBox(props: { shift: Shift | undefined }) {
    if (props.shift === undefined) {
        return <CircularProgress />
    }
    return (
        <Stack gap={4} sx={{ p: "22px", height: "fit-content", borderRadius: 5, borderWidth: 1.5, borderStyle: "solid", borderColor: "primary.dark" }}>
            <Stack alignItems="center"> <Typography sx={{ fontWeight: 800, fontSize: 20 }}>Shift Overview</Typography>
                <Typography>{props.shift.location}</Typography>
            </Stack>

            <Stack gap={2}>
                <Stack direction="row" gap={2}>
                    <ShiftStatsIcon icon={<CalendarMonthOutlinedIcon sx={{ fontSize: 60, color: "primary.main" }} />} title="START DATE" display={format(new Date(props.shift.startDate), "MMM do")} />
                    <ShiftStatsIcon icon={<PaymentsOutlinedIcon sx={{ fontSize: 60, color: "primary.main" }} />} title="AVAILABLE CASH" display={`${props.shift.availableCash} $`} />
                </Stack>
                <Stack direction="row" gap={2}>
                    <ShiftStatsIcon icon={<AttachMoneyOutlinedIcon sx={{ fontSize: 60, color: "primary.main" }} />} title="TOTAL CASH" display={`${props.shift.totalCash} $`} />
                    <ShiftStatsIcon icon={<AccountBalanceWalletOutlinedIcon sx={{ fontSize: 60, color: "primary.main" }} />} title="TOTAL MONEY" display={`${props.shift.totalMoney} $`} />
                </Stack>
            </Stack>

            <Stack gap={2}>
                <AddVisitPopup />
                <Button color="primary" sx={{ fontWeight: 600 }} onClick={() => handleClose(props?.shift?.id ?? 1)}>Close Shift</Button>
            </Stack>



        </Stack>
    )
}