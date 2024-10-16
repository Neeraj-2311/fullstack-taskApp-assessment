import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, styled, Typography } from '@mui/material'
import { CreateTask } from './CreateTask';
import { Task } from './Task';
import './TaskApp.css'

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

function TaskApp() {

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [createTaskOpen, setCreateTaskOpen] = useState(false);
    const [updateTask, setUpdateTask] = useState(undefined);

    const handleCreateTask = (e) => {
        e.preventDefault();
        setCreateTaskOpen(prev => !prev);
    }

    const getTasks = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${'http://localhost:5000'}/tasks/`);
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

    return (
        <Box p={{ xs: 1, sm: 2, md: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography fontSize={'2rem'} fontWeight={600} color='white'>
                    My Tasks
                </Typography>
                <GlassButton size='small' variant='contained' onClick={handleCreateTask}>
                    Create task
                </GlassButton>
            </Box>
            <Grid container spacing={2}>
                {tasks.map(task => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
                        <Task task={task} updateTasks={getTasks} handleUpdateTask={handleUpdateTask}/>
                    </Grid>
                ))}
            </Grid>
            <CreateTask
                open={createTaskOpen}
                handleToggleModal={handleCreateTask}
                updateTasks={getTasks}
                task={updateTask}
            />
        </Box>
    );
}

export default TaskApp