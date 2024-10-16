import React from 'react';
import { Typography, Card, styled, Checkbox, Tooltip, FormControlLabel, Box, Button } from '@mui/material';

const StyledCard = styled(Card)({
    maxWidth: 345,
    margin: 'auto',
    marginTop: '16px',
    padding: '16px',
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    }
});

export const Task = ({ task, updateTasks, handleUpdateTask }) => {

    const handleChangeStatus = async (event) => {
        const updatedStatus = event.target.checked;
        try {
            const response = await fetch(`http://localhost:5000/tasks/${task._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: updatedStatus })
            });
            if (response.ok) {
                updateTasks();
            } else {
                console.error('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log('Task deleted successfully');
            } else {
                console.error('Failed to delete the task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };


    return (
        <StyledCard onClick={handleUpdateTask}>
            <Box display="flex" alignItems="center">
                <Tooltip title="Mark completed">
                    <FormControlLabel
                        control={
                            <Checkbox
                                size='small'
                                checked={task?.completed}
                                onChange={handleChangeStatus}
                                sx={{
                                    color: 'white',
                                    '&.Mui-checked': {
                                        color: 'white'
                                    }
                                }}
                            />
                        }
                        label=""
                    />
                </Tooltip>
                <Typography variant="h5" component="h2" textTransform={'capitalize'} style={{ flexGrow: 1 }}>
                    {task?.title}
                </Typography>
                {task?.completed && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(task._id)}
                        sx={{
                            marginLeft: 2,
                            color: 'white',
                            backgroundColor: '#f44336',
                            '&:hover': {
                                backgroundColor: '#d32f2f',
                            }
                        }}
                    >
                        Delete
                    </Button>
                )}
            </Box>
            <Typography component="p" style={{ marginTop: '8px' }}>
                {task?.description}
            </Typography>
            {task?.completed && (
                <Typography style={{
                    marginTop: '8px',
                    color: 'lightgreen',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'rgba(76, 175, 80, 0.2)',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    Completed
                </Typography>
            )}
        </StyledCard>
    );
};