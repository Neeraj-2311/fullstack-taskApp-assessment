import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export const CreateTask = ({ open, handleToggleModal, updateTasks, task }) => {

    const [isSaving, setIsSaving] = useState(false);
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');

    const clearValues = () => {
        setTitle("");
        setDescription("");
    }

    const handleCancel = (e) => {
        handleToggleModal(e);
        clearValues();
    }

    const handleCreateOrUpdateTask = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const method = task ? 'PUT' : 'POST';
            const url = task ? `http://localhost:5000/tasks/${task._id}` : 'http://localhost:5000/tasks';
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });
            if (res.ok) {
                await res.json();
                updateTasks();
                handleToggleModal();
                clearValues();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
                }
            }}
        >
            <DialogTitle sx={{ color: 'white' }}>Create or Update Task</DialogTitle>
            <DialogContent>
                <form onSubmit={handleCreateOrUpdateTask}>
                    <TextField
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        label="Task Name"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        InputLabelProps={{
                            style: { color: 'white' }
                        }}
                        InputProps={{
                            style: { color: 'white' }
                        }}
                    />
                    <TextField
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        label="Task Description"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        InputLabelProps={{
                            style: { color: 'white' }
                        }}
                        InputProps={{
                            style: { color: 'white' }
                        }}
                    />
                    <div style={{ display: 'flex', marginTop: 20, justifyContent: 'space-between' }}>
                        <Button color="error" onClick={handleCancel} sx={{
                            marginRight: 1,
                            backgroundColor: 'rgba(244, 67, 54, 0.6)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(244, 67, 54, 0.8)'
                            }
                        }}>
                            Cancel
                        </Button>
                        <Button type="submit" sx={{
                            color: 'white',
                            backgroundColor: 'rgba(33, 150, 243, 0.6)',
                            '&:hover': {
                                backgroundColor: 'rgba(33, 150, 243, 0.8)'
                            }
                        }} disabled={isSaving}>
                            {isSaving ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
