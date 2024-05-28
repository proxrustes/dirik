import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination } from '@mui/material';
import { Shift } from '@/definitions/types/Shift';
import { useEffect, useState } from 'react';

export default function ShiftsTable(props: { locationId: number }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [shifts, setShifts] = useState<Shift[]>([])

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:3000/shifts', {
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
        const data: Shift[] = res;
        setShifts(data)
      } catch { }


    };

    fetchLocations();
  }, []);

  return (
    <TableContainer sx={{ minWidth: 620, width: "100%", mt: 2 }}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Shift ID</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Location</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Start Date</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Available Cash</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Total Cash</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Total Money</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shifts
            .filter(shift => shift.locationId === props.locationId)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((shift, index) => (
              <TableRow key={shift.id} sx={{ height: "52px" }}>
                <TableCell component="th" scope="row">
                  {shift.id}
                </TableCell>
                <TableCell align='center'>{shift.location}</TableCell>
                <TableCell align='center'>{shift.startDate}</TableCell>
                <TableCell align='center'>{shift.availableCash}</TableCell>
                <TableCell align='center'>{shift.totalCash}</TableCell>
                <TableCell align='center'>{shift.totalMoney}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={shifts.filter(shift => shift.locationId === props.locationId).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </TableContainer>
  );
}
