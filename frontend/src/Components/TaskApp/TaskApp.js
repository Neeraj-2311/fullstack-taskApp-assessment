import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, styled, Menu, Typography, Divider, IconButton } from '@mui/material'
import { CreateTask } from './CreateTask';
import { Task } from './Task';
import ImageIcon from '@mui/icons-material/Image';

const GlassButton = styled(Button)({
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
    },
});

function TaskApp({changeBg, backgrounds, currentBg}) {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [createTaskOpen, setCreateTaskOpen] = useState(false);
    const [updateTask, setUpdateTask] = useState(undefined);
    const [bgMenuAnchor, setBgMenuAnchor] = useState(null);

    const handleOpenBgMenu = (event) => {
        setBgMenuAnchor(event.currentTarget);
    };

    const handleCloseBgMenu = () => {
        setBgMenuAnchor(null);
    };

    const handleBgImageChange = (imageUrl) => {
        changeBg(imageUrl);
        handleCloseBgMenu();
    };

    const handleCreateTask = (e) => {
        e.preventDefault();
        setCreateTaskOpen(prev => !prev);
    }

    const getTasks = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:5000/tasks/');
            if (res.ok) {
                const result = await res.json();
                setTasks(result);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleUpdateTask = (task) => {
        setUpdateTask(task);
        setCreateTaskOpen(true);
    }

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        if(!createTaskOpen) setUpdateTask(undefined);
    },[createTaskOpen]);

    const completedTasks = tasks.filter(task => task.completed);
    const incompleteTasks = tasks.filter(task => !task.completed);

    return (
        <Box p={{ xs: 1, sm: 2, md: 4 }} position="relative">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography fontSize={'2rem'} fontWeight={600} color='white'>
                    My Tasks
                </Typography>
                
                <Box display="flex" alignItems="center">
                    <GlassButton size='small' variant='contained' onClick={handleCreateTask}>
                        Create task
                    </GlassButton>
                    
                    <IconButton
                        aria-label="change background"
                        color="inherit"
                        onClick={handleOpenBgMenu}
                        sx={{ marginLeft: 2, color:'white' }}
                    >
                        <ImageIcon/>
                    </IconButton>

                    <Menu
                        anchorEl={bgMenuAnchor}
                        open={Boolean(bgMenuAnchor)}
                        onClose={handleCloseBgMenu}
                    >
                        <Box sx={{ padding: 1 }} display={'flex'} flexWrap={'wrap'} gap={2} justifyContent={'center'}>
                            {backgrounds.map((image, index) => (
                                <Grid item xs={4} key={index}>
                                    <Box
                                        onClick={() => handleBgImageChange(image)}
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            backgroundImage: `url(${image})`,
                                            backgroundSize: 'cover',
                                            border: currentBg === image ? '3px solid #1976d2' : '1px solid gray',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Box>
                    </Menu>
                </Box>
            </Box>

            {isLoading && (
                <Box
                    position="absolute"
                    width={'100dvw'}
                    height={'100dvh'}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    zIndex={1}
                >
                    <Typography fontSize="1.5rem" color="gray">
                        Getting tasks...
                    </Typography>
                </Box>
            )}

            <Box mb={4} minHeight={'40dvh'} maxHeight={'90vh'} sx={{overflowY:'auto'}}>
                <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h5" fontWeight={600} color='white' fontSize={'1rem'}>
                        Incomplete Tasks
                    </Typography>
                    <Divider sx={{ flexGrow: 1, ml: 2, backgroundColor: 'white' }} />
                </Box>
                <Grid container spacing={2}>
                    {incompleteTasks.map(task => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
                            <Task task={task} updateTasks={getTasks} handleUpdateTask={handleUpdateTask}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box >
                <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h5" fontWeight={600} color='white' fontSize={'1rem'}>
                        Completed Tasks
                    </Typography>
                    <Divider sx={{ flexGrow: 1, ml: 2, backgroundColor: 'white' }} />
                </Box>
                <Grid container spacing={2}>
                    {completedTasks.map(task => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
                            <Task task={task} updateTasks={getTasks} handleUpdateTask={handleUpdateTask}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <CreateTask
                open={createTaskOpen}
                handleToggleModal={handleCreateTask}
                updateTasks={getTasks}
                task={updateTask}
            />
        </Box>
    );
}

export default TaskApp;