import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import TablePagination from '@mui/material/TablePagination';
import { Visit } from '@/definitions/types/Visit';
import AlbumIcon from '@mui/icons-material/Album';
import { useEffect, useState } from 'react';
import { Shift } from '@/definitions/types/Shift';
import { format } from 'date-fns'

export default function CurrentShiftTable(props: { financeView: Boolean, shift: Shift }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [visits, setVisits] = useState<Visit[]>([])

  async function handleClose(visit: Visit) {
    console.log("Close button clicked");
    const date = new Date().toISOString()
    const response = await fetch(`http://164.90.168.113/visits/calculate-price`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "shiftId": visit.shiftId,
        "startAt": visit.startAt,
        "endAt": date
      })
    });
    const res = await response.json();
    console.log(res.price);
    const response1 = await fetch(`http://164.90.168.113/visits/${visit.id}/close`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        resultPrice: res.price,
        cash: res.price,
        terminal: 0,
        endAt: date
      })
    });
    console.log(await response1.json());
  }

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch('http://164.90.168.113/visits', {
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
        const data: Visit[] = res;
        console.log(data, props.shift?.id)
        const visits = data.filter(visit => visit.shiftId === props.shift?.id);
        setVisits(visits)
      } catch { }


    };

    fetchVisits();
  }, []);

  const renderStandardView = () => (
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
                <TableCell align='center'>{format(new Date(visit.startAt), "MMMM do h:mm:ss")}</TableCell>
                <TableCell align='center'>{visit.endAt ? format(new Date(visit.endAt), "MMMM do h:mm:ss") : <Button onClick={()=>handleClose(visit) } variant='outlined' sx={{ fontSize: "10px", padding: "2px 5px" }}>close</Button>}</TableCell>
                {visit.endAt ? <TableCell align='center' />
                  : <TableCell align='center'>
                    <Tooltip title="Delete">
                      <IconButton disabled>
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

  const renderFinanceView = () => (
    <TableContainer sx={{ minWidth: 620, width: "100%", mt: 2 }}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Visit title</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Price</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Result Price</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Cash</TableCell>
            <TableCell align='center' sx={{ fontWeight: 600 }}>Terminal</TableCell>
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
                <TableCell align='center'>{visit.price} $</TableCell>
                <TableCell align='center'>{visit.resultPrice.toFixed(2)} $</TableCell>
                <TableCell align='center'>{visit.cash.toFixed(2)} $</TableCell>
                <TableCell align='center'>{visit.terminal.toFixed(2)} $</TableCell>
                <TableCell align='center'>
                    <Tooltip title="Delete">
                      <IconButton>
                        <CloseIcon sx={{ fontSize: "20px", color: "error.main" }} />
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

  return props.financeView ? renderFinanceView() : renderStandardView();
}