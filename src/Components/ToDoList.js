import React, { useState } from "react";
import { Box, Button, Typography, CardContent, TextField, Grid, Autocomplete, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
let taskArray = [
    {
        title: 'Morning Walk',
        description: 'This Task Must Be Completed As Soon As Possible',
        priority: 'High',
        status: 'In Progress'
    },
    {
        title: 'Cleaning',
        description: 'This Task Is Importand And Should Be Done',
        priority: 'Medium',
        status: 'Ready For Test'
    },
    {
        title: 'Shopping',
        description: 'Create a List',
        priority: 'Low',
        status: 'Done'
    },
]

const levels = ['High', 'Medium', 'Low']
const status = ['In Progress', 'in Development', 'Ready For Test', 'Done'];

export const ToDoList = () => {
    // const [taskList, setTaskList] = useState(taskArray);
    const [openTask, setOpenTask] = useState(false);
    const [formData, setFormData] = useState({});
    const [dragIndex, setDragIndex] = useState(null);

    const handlePickedTask = (index) => {
        setDragIndex(index);
    };
    const handleTaskputted = (index) => {
        if (index === dragIndex) return;

        const newList = [...taskArray];
        const task1 = newList[dragIndex];
        newList.splice(dragIndex, 1);
        newList.splice(index, 0, task1);

        setDragIndex(index);
        taskArray = newList;
        // setTaskList(newList);
        // taskArray = taskList;
        console.log("new list : " + taskArray[taskArray.length - 1].title + " - " + taskArray[taskArray.length - 1].priority + " - " + taskArray[taskArray.length - 1].description)
    };
    const openAddTask = () => setOpenTask((prev) => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log('target : ' + e.target.value);
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            console.log("data : " + formData.title);
            taskArray.push(formData);
            // setTaskList(taskArray);
            console.log("task added.")
            console.log('list : ' + taskArray[taskArray.length - 1].title + " - " + taskArray[taskArray.length - 1].priority + " - " + taskArray[taskArray.length - 1].description);
            setOpenTask(false);
        } catch (error) {
            console.log("something went wrong..." + error);
        }
    }
    return (
        // ---------------- Add Task ------------------

        // <Box component="section">
        //     {openTask ? (
        //         <Box
        //             component="form"
        //             onSubmit={handleSubmit}
        //             sx={{ display: 'flex', m: 1, mt: '50px', width: '100%', justifyContent: 'center' }}
        //             noValidate
        //             autoComplete="off"
        //         >
        //             <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        //                 <Grid size={{ xs: 6, sm: 6, md: 6 }}>
        //                     <TextField required name="title" onChange={handleChange} label="Title" sx={{ width: '100%' }}
        //                     />
        //                 </Grid>
        //                 <Grid size={4}>
        //                     <Autocomplete required
        //                         disablePortal
        //                         options={levels}
        //                         getOptionLabel={(option) => option}
        //                         value={levels.find((t) => t === formData.priority) || null}
        //                         // onChange={handleChange}
        //                         onChange={(event, level) => {
        //                             handleChange({
        //                                 target: {
        //                                     name: 'priority',
        //                                     value: level ? level : ''
        //                                 }
        //                             })
        //                         }}
        //                         // sx={{ width: 300 }}
        //                         // onChange={handleChange}
        //                         renderInput={(params) =>
        //                             <TextField {...params} label="Priority Level" />}
        //                     />
        //                 </Grid>
        //                 <Grid size={{ xs: 6, sm: 6, md: 6}}>
        //                     <TextField sx={{ width: '100%' }}
        //                         required
        //                         name='description'
        //                         onChange={handleChange}
        //                         id="outlined-multiline-static"
        //                         label="Description"
        //                         multiline
        //                     />
        //                 </Grid>
        //                 <Grid size={4}>
        //                     <Autocomplete required
        //                         disablePortal
        //                         options={status}
        //                         getOptionLabel={(option) => option}
        //                         value={status.find((t) => t === formData.status) || null}
        //                         // onChange={handleChange}
        //                         onChange={(event, state) => {
        //                             handleChange({
        //                                 target: {
        //                                     name: 'status',
        //                                     value: state ? state : ''
        //                                 }
        //                             })
        //                         }}
        //                         // sx={{ width: 300 }}
        //                         // onChange={handleChange}
        //                         renderInput={(params) =>
        //                             <TextField {...params} label="Priority Level" />}
        //                     />
        //                 </Grid>
        //                 <Button type='submit' variant="contained" sx={{ px: 6 }} >Add</Button>
        //             </Grid>
        //         </Box>
        //     ) : (
        //         <div align='right' dispaly='flex' >
        //             <Button variant="contained" sx={{ m: 4, mb: 1 }} onClick={() => openAddTask()}>Add Task</Button>
        //         </div>
        //     )}

        //     {/* ------------------   Task List   ---------------------- */}

        //     <TableContainer component={Paper}>
        //         {taskArray.map((task, index) => {
        //             let borderColor = 'black';
        //             let textColor = 'black';

        //             if (task.priority === 'High') {
        //                 borderColor = 'red';
        //                 textColor = 'red';
        //             } else if (task.priority === 'Medium') {
        //                 borderColor = 'orange';
        //                 textColor = 'orange';
        //             } else if (task.priority === 'Low') {
        //                 borderColor = 'green';
        //                 textColor = 'green';
        //             }
        //             return (
        //                 <div
        //                     key={task.id} draggable
        //                     onDragStart={() => handlePickedTask(index)}
        //                     onDragEnter={() => handleTaskputted(index)}
        //                 // onDragOver={(e) => e.preventDefault()}
        //                 >
        //                     <CardContent
        //                         sx={{
        //                             display: 'flex',
        //                             border: `1px solid ${borderColor}`,
        //                             borderRadius: '8px', padding: '5px 5px 5px 25px', m: 4,
        //                         }}>
        //                         <div>
        //                             <ClearAllIcon sx={{ marginRight: '20px', mt: 3, height: '35px', width: '35px' }} />
        //                         </div>
        //                         <div>
        //                             <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 0, fontFamily: 'Times Roman' }}>
        //                                 {task.title}
        //                             </Typography>
        //                             <Typography component="div" sx={{ fontSize: 14 }}>
        //                                 {task.description}
        //                             </Typography>
        //                             <Typography variant='h6' sx={{ color: textColor }}>
        //                                 {task.priority}
        //                             </Typography>
        //                             <Typography  sx={{ color: '#51b8c5', fontWeight:'600' }}>
        //                                 {task.status}
        //                             </Typography>
        //                         </div>
        //                     </CardContent>
        //                 </div>
        //             );
        //         })}
        //     </TableContainer>
        // </Box >

        //----------------------------------------------------------------------------------------

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
                                // onChange={handleChange}
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

            {/* <TableContainer component={Paper}> */}
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight:'800', width:'400px'}} align='center'>In Progress</TableCell>
                            <TableCell sx={{fontWeight:'800', width:'400px'}} align='center'>In Development</TableCell>
                            <TableCell sx={{fontWeight:'800', width:'400px'}} align='center'>Ready For Test</TableCell>
                            <TableCell sx={{fontWeight:'800', width:'400px'}} align='center'>Done</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskArray.map((task, index) => {
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
                                        onDragStart={() => handlePickedTask(index)}
                                        onDragEnter={() => handleTaskputted(index)}
                                    >
                                        <CardContent
                                            sx={{
                                                display: 'flex', width:'400px',
                                                border: `1px solid ${borderColor}`,
                                                borderRadius: '8px', padding: '10px', m: 4,
                                            }}>
                                            <div>
                                                <ShuffleIcon sx={{ marginRight: '20px', mt: 5, height: '35px', width: '35px',color:'#1b1a1aa1' }} />
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
                                        </CardContent>
                                    </div>
                                </TableRow>
                            );

                        })}

                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    )
}