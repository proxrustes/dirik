import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Stack, TablePagination, Tooltip } from '@mui/material';
import AlbumIcon from '@mui/icons-material/Album';
import CloseIcon from '@mui/icons-material/Close';
import { Visit } from '@/definitions/types/Visit';

const visits: Visit[] = [
  { id: 0, shiftId: 0, isPriceFixed: true, price: 200, resultPrice: 300, cash: 100, terminal: 200, totemName: 'Visit 1', clientsAmount: 5, startAt: '10:00 AM', endAt: '11:00 AM' },
  { id: 1, shiftId: 0, isPriceFixed: true, price: 200, resultPrice: 300, cash: 100, terminal: 200, totemName: 'Visit 2', clientsAmount: 8, startAt: '12:00 PM', endAt: '01:00 PM' },
  { id: 2, shiftId: 0, isPriceFixed: true, price: 200, resultPrice: 300, cash: 100, terminal: 200, totemName: 'Visit 3', clientsAmount: 3, startAt: '02:00 PM' },
  { id: 3, shiftId: 0, isPriceFixed: true, price: 200, resultPrice: 300, cash: 100, terminal: 200, totemName: 'Visit 1', clientsAmount: 5, startAt: '10:00 AM' },
  { id: 4, shiftId: 0, isPriceFixed: true, price: 200, resultPrice: 300, cash: 100, terminal: 200, totemName: 'Visit 2', clientsAmount: 8, startAt: '12:00 PM', endAt: '01:00 PM' },
  { id: 5, shiftId: 0, isPriceFixed: true, price: 200, resultPrice: 300, cash: 100, terminal: 200, totemName: 'Visit 3', clientsAmount: 3, startAt: '02:00 PM', endAt: '03:00 PM' },
  { id: 6, shiftId: 0, isPriceFixed: true, price: 200, resultPrice: 300, cash: 100, terminal: 200, totemName: 'Visit 1', clientsAmount: 5, startAt: '10:00 AM', endAt: '11:00 AM' },
  { id: 7, shiftId: 0, isPriceFixed: true, price: 200, resultPrice: 300, cash: 100, terminal: 200, totemName: 'Visit 2', clientsAmount: 8, startAt: '12:00 PM' },
  { id: 8, shiftId: 0, isPriceFixed: true, price: 200, resultPrice: 300, cash: 100, terminal: 200, totemName: 'Visit 3', clientsAmount: 3, startAt: '02:00 PM', endAt: '03:00 PM' },
];

export default function VisitsTable(props: { locationId: number }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  return (
    <TableContainer sx={{ minWidth: 620, width: "100%", mt: 2 }}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Visit title</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Clients Amount</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Start Time</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>End Time</TableCell>
            <TableCell align='center'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visits
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((visit, index) => (
              <TableRow key={`${visit.totemName}-${index}`} sx={{ height: "52px" }}>
                <TableCell component="th" scope="row" sx={{ pl: visit.endAt ? "17px" : 0 }}>
                  <Stack direction="row" gap={0.5}>
                    {visit.endAt ? '' : <AlbumIcon sx={{ fontSize: "16px", color: "secondary.main" }} />}
                    {visit.totemName}
                  </Stack>
                </TableCell>
                <TableCell align='center'>{visit.clientsAmount}</TableCell>
                <TableCell align='center'>{visit.startAt}</TableCell>
                <TableCell align='center'>{visit.endAt ?? <Button variant='outlined' sx={{ fontSize: "10px", padding: "2px 5px" }}>close</Button>}</TableCell>
                {visit.endAt ? <TableCell align='center' />
                  : <TableCell align='center'>
                    <Tooltip title="Edit visit">
                      <IconButton>
                        <EditIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton>
                        <CloseIcon sx={{ fontSize: "20px", color: "error.main" }} />
                      </IconButton>
                    </Tooltip>

                  </TableCell>
                }
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={visits.length}
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