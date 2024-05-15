import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TablePagination, Tooltip } from '@mui/material';
import { Employee } from '@/definitions/types/Employee';


const employees: Employee[] = [
  { id: 0, fullName: 'John Doe', location_id: 0, phone:"", homeAdress:"", email:"", position: 'Software Engineer', location: 'New York', salaryFixed: 80000, salarayPercent: 5, availableSalary: 76000, passportNumber: "123", INN: "" },
  { id: 1, fullName: 'Jane Smith', location_id: 0, phone:"", homeAdress:"", email:"", position: 'Product Manager', location: 'San Francisco', salaryFixed: 100000, salarayPercent: 7, availableSalary: 93000, passportNumber: "123", INN: "" },
  { id: 2, fullName: 'Alice Johnson', location_id: 0, phone:"", homeAdress:"", email:"", position: 'Marketing Specialist', location: 'Los Angeles', salaryFixed: 60000, salarayPercent: 3, availableSalary: 58000, passportNumber: "123", INN: "" },
  { id: 3, fullName: 'Bob Brown', location_id: 0, phone:"", homeAdress:"", email:"", position: 'Data Analyst', location: 'Chicago', salaryFixed: 75000, salarayPercent: 6, availableSalary: 70500, passportNumber: "123", INN: "" },
  { id: 4, fullName: 'Emily Davis', location_id: 0, phone:"", homeAdress:"", email:"", position: 'UI Designer', location: 'Seattle', salaryFixed: 90000, salarayPercent: 8, availableSalary: 82800, passportNumber: "123", INN: "" },
];

export default function EmployeesTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer sx={{ minWidth: 620, width: "100%", mt: 2 }}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Full Name</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Position</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Location</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Salary</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>%</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Available Salary</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee, index) => (
            <TableRow key={`${employee.fullName}-${index}`}>
              <TableCell component="th" scope="row">
                {employee.fullName}
              </TableCell>
              <TableCell align='center'>{employee.position}</TableCell>
              <TableCell align='center'>{employee.location}</TableCell>
              <TableCell align='center'>{employee.salaryFixed.toLocaleString()}</TableCell>
              <TableCell align='center'>{employee.salarayPercent}</TableCell>
              <TableCell align='center'>{employee.availableSalary.toLocaleString()}</TableCell>
              <TableCell align='center'>
              <Tooltip title="Edit">
                      <IconButton>
                        <EditIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
