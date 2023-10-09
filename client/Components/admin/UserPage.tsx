
'use client'
import { useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import {
    Box,
    Divider,
    Typography,
    Stack,
    MenuItem,
    Avatar,
    Popover,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    TablePagination,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import React from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Iconify from '../iconify';
import UserListHead from './UserListHead';
import UserListToolbar from './UserListToolbar';
import axios from '../../Axios/Admin/axios'
import * as XLSX from 'xlsx';
import toast, { Toaster } from 'react-hot-toast';


const TABLE_HEAD = [
    { id: 'name', label: 'FullName', alignRight: false },
    { id: 'email,', label: 'Email', alignRight: false },
    { id: 'Phone', label: 'Phone', alignRight: false },
    { id: 'Subject', label: 'Subject', alignRight: false },
    { id: 'Test taking date', label: 'Test taking date', alignRight: false },
    { id: 'Full marks', label: 'Full marks', alignRight: false },
    { id: 'Mark obtained', label: 'Mark obtained', alignRight: false },
    { id: 'Overall percentage', label: 'Overall percentage', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },

];



interface Userdata {
    student_id: string;
    student_fullname: string;
    student_email: string;
    student_phone: string;
    subject: string;
    test_taking_date: Date;
    full_marks: Number;
    marks_obtained: Number;
    overall_percentage: String;
}






function descendingComparator(a: Userdata, b: Userdata, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: 'asc' | 'desc', orderBy: string) {
    return order === 'desc'
        ? (a: Userdata, b: Userdata) => descendingComparator(a, b, orderBy)
        : (a: Userdata, b: Userdata) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: Userdata[] | null | undefined, comparator: (a: Userdata, b: Userdata) => number, query: string) {
    if (!array) {
        return [];
    }

    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    if (query) {
        return array.filter((Userdata: { student_fullname: string; }) => Userdata.student_fullname.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }

    return stabilizedThis.map((el) => el[0]);
}



export default function UserPage() {
    const [open, setOpen] = useState<HTMLElement | null>(null);

    const [page, setPage] = useState<number>(0);

    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const [selected, setSelected] = useState<string[]>([]);

    const [orderBy, setOrderBy] = useState<string>('name');

    const [filterName, setFilterName] = useState<string>('');

    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [excelData, setExcelData] = useState<any[]>([]);

    const [Userdata, setuserdata] = useState<any>(null);


    const [Singleuserdata, setsingleUserData] = useState<any>(null);

    const [isModalOpen1, setIsModalOpen1] = useState(false);


    useEffect(() => {
        axios.get('/userdata').then((response) => {
            console.log(response.data.userdata);

            setuserdata(response.data.userdata)


        }).catch((response) => {
            console.error(response.message);



        })

    }, [])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

                console.log(excelData);
                


                setExcelData(excelData);


            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeModal1 = () => {
        setIsModalOpen1(false);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Userdata.length) : 0;

    const filteredUsers = applySortFilter(Userdata, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;




    const handleSubmit = () => {
        if (selectedFile) {
            closeModal()
            const body = {

                files: excelData,


            };

            axios.post("/adduserdata", body).then((response) => {
                if (response.data.status == true) {
                   
                    toast.success('Successfully subnited userdata')

                } else {
                    toast.success('Successfully subnited userdata')

                }


            }).catch((response) => {
                console.error(response.message);



            })

        } else {
           
            toast.error("No file selected.")
        }
    };

    const handleGenerateScoreCard = () => {
        axios.post("/gneratecard").then((response) => {
            if (response.data.status == true) {
                toast('Good Job! Score cards generated and emails sent successfully', {
                    icon: '👏',
                  });
                

            } else {
                toast.error("No score cards generated or no students to email.")


            }


        })

    };

    const handleViewButtonClick = (email: string) => {
        axios.get(`/scorecard?email=${email}`).then((response) => {

            setsingleUserData(response.data.userdata[0]);
            setIsModalOpen1(true)



        })

    };











    return (


        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        User
                    </Typography>
                    <Stack spacing={1}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={openModal}>
                            Add User Data
                        </Button>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleGenerateScoreCard}>
                            Generate Score Card
                        </Button>

                    </Stack>


                </Stack>

                <Card>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
                    {/* <Scrollbar> */}
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={Userdata ? Userdata.length : 0}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: { student_id: any; student_fullname: any; student_email: any; student_phone: any; subject: any; test_taking_date: any; full_marks: any; marks_obtained: any; overall_percentage: any; }) => {
                                        const { student_id, student_fullname, student_email, student_phone, subject, test_taking_date, full_marks, marks_obtained, overall_percentage } = row;
                                        const selectedUser = selected.indexOf(student_fullname) !== -1;

                                        return (
                                            <TableRow hover key={student_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                                <TableCell padding="checkbox">

                                                </TableCell>

                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar alt={student_fullname} src={Avatar} />
                                                        <Typography variant="subtitle2" noWrap>
                                                            {student_fullname}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">{student_email}</TableCell>

                                                <TableCell align="left">{student_phone}</TableCell>

                                                <TableCell align="left">{subject}</TableCell>

                                                <TableCell align="left">{test_taking_date}</TableCell>

                                                <TableCell align="left">{full_marks}</TableCell>

                                                <TableCell align="left">{marks_obtained}</TableCell>

                                                <TableCell align="left">{overall_percentage} </TableCell>

                                                <TableCell align="left">
                                                    {overall_percentage > 60 ? (
                                                        <>

                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                size="small"
                                                                onClick={() => handleViewButtonClick(student_email)}
                                                            >
                                                                View
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <Typography >
                                                       
                                                        </Typography>

                                                    )}
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" paragraph>
                                                        Not found
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        No results found for &nbsp;
                                                        <strong>&quot;{filterName}&quot;</strong>.
                                                        <br /> Try checking for typos or using complete words.
                                                    </Typography>
                                                </Paper>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    {/* </Scrollbar> */}

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={Userdata ? Userdata.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>



            {/*---------------------- modal-starts---------------------- */}
            <Dialog open={isModalOpen} onClose={closeModal}>

                <DialogTitle>Select an Excel File</DialogTitle>
                <DialogContent>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button type='submit' variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogActions>


            </Dialog>


            {/*---------------------- modal-e---------------------- */}


            <Dialog open={isModalOpen1} onClose={closeModal1}>
                <DialogTitle>Score Card</DialogTitle>
                <DialogContent>
                    {Singleuserdata ? (
                        <>
                            <Paper
                                id="report-card"
                                elevation={3}
                                className="text-black p-4 rounded-lg flex flex-col justify-between items-center"
                                style={{ width: '500px', padding: 5 }}
                            >
                                <Typography variant="h5" component="h1" align="center">

                                </Typography>
                                <Typography variant="subtitle1" align="center">

                                </Typography>
                                <div className="text-black">
                                    <div className="mt-5">
                                        {/* Student Information */}
                                        <Typography variant="subtitle2" className="font-bold">
                                            Student ID: {Singleuserdata.student_card_id}
                                        </Typography>
                                        <Typography variant="h6" className="font-bold my-2">
                                            Name: {Singleuserdata.student_fullname}
                                        </Typography>
                                        <Typography variant="subtitle2" className="font-bold">
                                            Email: {Singleuserdata.student_email}
                                        </Typography>
                                    </div>
                                    <div className="mt-5">
                                        {/* Test Information */}
                                        <Typography variant="subtitle2" className="font-bold">
                                            ID: {Singleuserdata.student_id}
                                        </Typography>
                                        <Typography variant="subtitle2" className="font-bold">
                                            Subject: {Singleuserdata.subject}
                                        </Typography>
                                        <Typography variant="subtitle2" className="font-bold">
                                            Test Taking Date: {Singleuserdata.test_taking_date}
                                        </Typography>
                                        <Typography variant="subtitle2" className="font-bold">
                                            Full Marks: {Singleuserdata.full_marks}
                                        </Typography>
                                        <Typography variant="subtitle2" className="font-bold">
                                            Mark Obtained: {Singleuserdata.marks_obtained}
                                        </Typography>
                                        <Typography variant="subtitle2" className="font-bold">
                                            Overall Percentage: {Singleuserdata.overall_percentage}
                                        </Typography>
                                    </div>
                                </div>
                                <Typography align="center" className="mt-4"></Typography>
                            </Paper>
                        </>
                    ) : (
                        <Typography>No data available for this user.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal1}>Close</Button>
                </DialogActions>
            </Dialog>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />

        </>
    );
}
