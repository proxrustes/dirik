import { UserBox } from "@/components/general/UserBox";
import { Employee } from "@/definitions/types/Employee";
import { Stack } from "@mui/material";

const mockUser: Employee ={
    id: 0,
    fullName: "Ivan Boiko",
    position: "Admin",
    phone: "string",
    email: "string",
    homeAdress: "string",
    location_id: 1,
    location: "dirik",
    salaryFixed: 1300,
    salarayPercent: 15,
    availableSalary: 2400,
    passportNumber: "123",
    INN: "1234"
    
}
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Stack direction="row" gap={4}>
            <UserBox user={mockUser}/>
            {children}
        </Stack>
    );
}
