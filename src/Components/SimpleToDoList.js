import React, { useState, useEffect } from "react";
import { Box, Button, Typography, CardContent, TextField, Grid, Autocomplete, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Modal } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditSquareIcon from '@mui/icons-material/EditSquare';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    borderRadius: '8px',
    boxShadow: 24,
    p: 2,
};

const levels = ['High', 'Medium', 'Low']
const status = ['In Progress', 'in Development', 'Ready For Test', 'Done'];

export const SimpleToDoList = () => {
    // const [taskList, setTaskList] = useState(taskArray);
    const [openTask, setOpenTask] = useState(false);
    const [formData, setFormData] = useState({});
    const [dragIndex, setDragIndex] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [msg, setMsg] = useState('');
    const [id, setId] = useState('');
    const [taskList, setTaskList] = useState(() => {
        const storedTasks = localStorage.getItem('taskList');
        return storedTasks ? JSON.parse(storedTasks) : '';
    });

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }, [taskList]);

    const handlePickedTask = (id) => {
        setDragIndex(id);
    };

    const handleDropToStatus = (newStatus) => {
        if (dragIndex === null) return;

        const updatedArray = taskList.map(task =>
            task.id === dragIndex ? { ...task, status: newStatus } : task
        );

        setTaskList(updatedArray);
        setDragIndex(null);
    };

    const openAddTask = () => setOpenTask((prev) => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            console.log("data : " + formData.title);
            const newTask = {
                ...formData,
                id: Date.now()
            };
            setTaskList(prev => [...prev, newTask]);
            // setTaskList(taskArray);
            console.log("task added.")
            console.log('list : ' + taskList[taskList.length - 1].title + " - " + taskList[taskList.length - 1].priority + " - " + taskList[taskList.length - 1].description);
            setOpenTask(false);
        } catch (error) {
            console.log("something went wrong..." + error);
        }
    }

    const editTask = (id) => {
        // e.preventDefault();
        setId(id);
        setOpenModal2(true);
        try {
        } catch (error) {
            console.log('error');
        }
    }

    const deleteTask = (id) => {
        console.log('deleteing the task : ' + id);
        setMsg('Are you sure want ot delete this task');
        setId(id);
        setOpenModal(true);
    }
    const confirmDelete = (ans) => {
        if (ans) {
            const newList = taskList.filter((task) => task.id !== id);
            setTaskList(newList);
            setId('');
            setOpenModal(false);
        }
    }

    return (
        <Box component="section">
            {openTask ? (
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', m: 1, mt: '50px', width: '100%', justifyContent: 'center' }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                            <TextField required name="title" onChange={handleChange} label="Title" sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid size={4}>
                            <Autocomplete required
                                disablePortal
                                options={levels}
                                getOptionLabel={(option) => option}
                                value={levels.find((t) => t === formData.priority) || null}
                                onChange={(event, level) => {
                                    handleChange({
                                        target: {
                                            name: 'priority',
                                            value: level ? level : ''
                                        }
                                    })
                                }}
                                renderInput={(params) =>
                                    <TextField {...params} label="Priority Level" />}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                            <TextField sx={{ width: '100%' }}
                                required
                                name='description'
                                onChange={handleChange}
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                            />
                        </Grid>
                        <Grid size={4}>
                            <Autocomplete required
                                disablePortal
                                options={status}
                                getOptionLabel={(option) => option}
                                value={status.find((t) => t === formData.status) || null}
                                onChange={(event, state) => {
                                    handleChange({
                                        target: {
                                            name: 'status',
                                            value: state ? state : ''
                                        }
                                    })
                                }}
                                renderInput={(params) =>
                                    <TextField {...params} label="Priority Level" />}
                            />
                        </Grid>
                        <Button type='submit' variant="contained" sx={{ px: 6 }} >Add</Button>
                    </Grid>
                </Box>
            ) : (
                <div align='right' dispaly='flex' >
                    <Button variant="contained" sx={{ m: 4, mb: 1 }} onClick={() => openAddTask()}>Add Task</Button>
                </div>
            )}

            {/* ------------------   Task List   ---------------------- */}
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: '800', width: '400px' }} align='center'>In Progress</TableCell>
                            <TableCell sx={{ fontWeight: '800', width: '400px' }} align='center'>In Development</TableCell>
                            <TableCell sx={{ fontWeight: '800', width: '400px' }} align='center'>Ready For Test</TableCell>
                            <TableCell sx={{ fontWeight: '800', width: '400px' }} align='center'>Done</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow align='center'>
                            {status.map((column) => (
                                <TableCell key={column} sx={{ verticalAlign: 'top' }} onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => handleDropToStatus(column)}>
                                    {!taskList ? ('No Task Assigned till yet')
                                        : (taskList.filter((task) => task.status === column).map((task, index) => {
                                            let borderColor = 'black';
                                            let textColor = 'black';
                                            if (task.priority === 'High') {
                                                borderColor = 'red';
                                                textColor = 'red';
                                            } else if (task.priority === 'Medium') {
                                                borderColor = 'orange';
                                                textColor = 'orange';
                                            } else if (task.priority === 'Low') {
                                                borderColor = 'green';
                                                textColor = 'green';
                                            }
                                            return (
                                                <TableRow
                                                    key={task.id}
                                                    sx={{ border: 0 }}
                                                >
                                                    <div
                                                        key={task.id} draggable
                                                        onDragStart={() => handlePickedTask(task.id)}
                                                    >
                                                        <CardContent
                                                            sx={{
                                                                display: 'flex', width: '280px',
                                                                border: `1px solid ${borderColor}`,
                                                                borderRadius: '8px', padding: '10px', m: 1,
                                                            }}>
                                                            <div>
                                                                <ShuffleIcon sx={{ marginRight: '20px', mt: 5, height: '35px', width: '35px', color: '#1b1a1aa1' }} />
                                                            </div>
                                                            <div>
                                                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 0, fontFamily: 'Times Roman' }}>
                                                                    {task.title}
                                                                </Typography>
                                                                <Typography component="div" sx={{ fontSize: 14 }}>
                                                                    {task.description}
                                                                </Typography>
                                                                <Typography variant='h6' sx={{ color: textColor }}>
                                                                    {task.priority}
                                                                </Typography>
                                                                <Typography sx={{ color: '#51b8c5', fontWeight: '600' }}>
                                                                    {task.status}
                                                                </Typography>
                                                            </div>
                                                            <div align='right' dispaly='flex' >
                                                                <Button variant="outlined" sx={{ border: 'none', color: '#5c626cf5' }} onClick={() => editTask(task.id)}><EditSquareIcon /></Button>
                                                                <Button variant="outlined" sx={{ border: 'none', color: '#5c626cf5' }} onClick={() => deleteTask(task.id)}><DeleteRoundedIcon />
                                                                </Button>
                                                            </div>
                                                        </CardContent>
                                                    </div>
                                                </TableRow>
                                            );
                                        })
                                        )
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* ---------------- Delete Task Confirmation --------------------- */}
            <Modal
                open={openModal}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" align='center' variant='h6' sx={{ fontWeight: '700' }}>
                        Delete The Task
                    </Typography>
                    <Typography id="modal-modal-description" align='center'>
                        {msg}
                    </Typography>
                    <div align='center' dispaly='flex' >
                        <Button variant="contained" sx={{ mt: 2 }} onClick={() => confirmDelete(true)}>Delete</Button>
                        <Button variant="contained" sx={{ mt: 2, ml: 3 }} onClick={() => setOpenModal(false)}>Cancel</Button>
                    </div>
                </Box>
            </Modal>

            {/* ------------------ Edit task Form ----------------- */}
            <Modal
                open={openModal2}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ m: 1, width: '100%', justifyContent: 'center' }}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography id="modal-modal-description" align='center' variant='h6' sx={{ fontWeight: '700', mb: 2, textDecoration: 'underline' }}>
                            Update
                        </Typography>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                                <TextField required name="title" onChange={handleChange} label="Title" sx={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid size={5}>
                                <Autocomplete required
                                    disablePortal
                                    options={levels}
                                    getOptionLabel={(option) => option}
                                    value={levels.find((t) => t === formData.priority) || null}
                                    onChange={(event, level) => {
                                        handleChange({
                                            target: {
                                                name: 'priority',
                                                value: level ? level : ''
                                            }
                                        })
                                    }}
                                    renderInput={(params) =>
                                        <TextField {...params} label="Priority Level" />}
                                />
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                                <TextField sx={{ width: '100%' }}
                                    required
                                    name='description'
                                    onChange={handleChange}
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                />
                            </Grid>
                            <Grid size={5}>
                                <Autocomplete required
                                    disablePortal
                                    options={status}
                                    getOptionLabel={(option) => option}
                                    value={status.find((t) => t === formData.status) || null}
                                    onChange={(event, state) => {
                                        handleChange({
                                            target: {
                                                name: 'status',
                                                value: state ? state : ''
                                            }
                                        })
                                    }}
                                    renderInput={(params) =>
                                        <TextField {...params} label="Priority Level" />}
                                />
                            </Grid>
                        </Grid>
                        <div align='center' dispaly='flex' >
                            <Button variant="contained" sx={{ mt: 2 }}>Update</Button>
                            <Button variant="contained" sx={{ mt: 2, ml: 3 }} onClick={() => setOpenModal2(false)}>Cancel</Button>
                        </div>

                    </Box>
                </Box>
            </Modal>
        </Box >
    )
}