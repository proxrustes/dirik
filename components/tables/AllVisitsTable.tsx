import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton, Stack, TablePagination, Tooltip } from '@mui/material';
import AlbumIcon from '@mui/icons-material/Album';
import CloseIcon from '@mui/icons-material/Close';
import { Visit } from '@/definitions/types/Visit';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function VisitsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [visits, setVisits] = useState<Visit[]>([]);

  async function handleClose(visit: Visit) {
    console.log("Close button clicked");
    const response = await fetch(`https://164.90.168.113/visits/calculate-price`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "shiftId": visit.shiftId,
        "startAt": visit.startAt,
        "endAt": new Date().toISOString()
      })
    });
    const res = await response.json();
    console.log(res.price);
    const response1 = await fetch(`https://164.90.168.113/visits/${visit.id}/close`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        resultPrice: res.price,
        cash: res.price,
        terminal: 0
      })
    });
    console.log(await response1.json());
  }

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch('https://164.90.168.113/visits', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        const data: Visit[] = res;
        setVisits(data);
      } catch (error) {
        console.error('Error fetching visits:', error);
      }
    };

    fetchVisits();
  }, []);

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
                <TableCell align='center'>{format(new Date(visit.startAt), "MMMM do h:mm:ss")} </TableCell>
                <TableCell align='center'>{visit.endAt ? format(new Date(visit.endAt), "MMMM do h:mm:ss") : <Button onClick={() => handleClose(visit)} variant='outlined' sx={{ fontSize: "10px", padding: "2px 5px" }}>close</Button>}</TableCell>
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
