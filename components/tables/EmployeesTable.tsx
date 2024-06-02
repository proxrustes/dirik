import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TablePagination, Tooltip, Typography } from '@mui/material';
import { Employee } from '@/definitions/types/Employee';
import { useEffect, useState } from 'react';


export default function EmployeesTable(props: { locationId: number }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
      const fetchLocations = async () => {
          try {
              const response = await fetch('http://164.90.168.113/employees', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      "Access-Control-Allow-Origin": "*"
                  },
              });
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const res = await response.json()
              const data: Employee[] = res;
              
              const employees = data.filter(employees => employees.locationId === props.locationId);
              console.log("data", data, employees)
              setEmployees(employees);
          } catch { }


      };

      fetchLocations();
  }, [props.locationId]);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
if (employees.length == 0){
  return(<Typography>error</Typography>)
}
  return (
    <TableContainer sx={{ minWidth: 620, width: "100%", mt: 2 }}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Full Name</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Position</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Salary</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>%</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Available Salary</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {employees && employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee, index) => (
            <TableRow key={`${employee.fullName}-${index}`}>
              <TableCell component="th" scope="row">
                {employee.fullName}
              </TableCell>
              <TableCell align='center'>{employee.position}</TableCell>
              <TableCell align='center'>{employee.salaryFixed}</TableCell>
              <TableCell align='center'>{employee.salarayPercent}</TableCell>
              <TableCell align='center'>{employee.availableSalary}</TableCell>
              <TableCell align='center'>
              <Tooltip title="Edit">
                      <IconButton disabled>
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
