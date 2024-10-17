import {useState, useEffect, useRef} from "react";
import {
    Checkbox,
    IconButton,
    ListItem,
    TextField,
    Box, Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import {TaskAPI} from "../API/TaskAPI.js";

Task.propTypes = {
    todoId: PropTypes.number.isRequired,
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        isDone: PropTypes.bool.isRequired
    }).isRequired,
    onTaskUpdated: PropTypes.func.isRequired,
    onTaskDeleted: PropTypes.func.isRequired
};

function Task({todoId, task, onTaskUpdated, onTaskDeleted}) {
    const [isTaskTitleEditing, setIsTaskTitleEditing] = useState(false);
    const [editTaskTitle, setEditTaskTitle] = useState(task.title);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isTaskTitleEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isTaskTitleEditing]);

    const handleTaskStatusChange = async () => {
        try {
            await TaskAPI.update(todoId, task.id, null, !task.isDone);
            onTaskUpdated();
        } catch (error) {
            console.error("Failed to update the task status:", error);
        }
    };

    const handleEditTaskChange = (event) => {
        setEditTaskTitle(event.target.value);
    };

    const handleTaskTitleSave = async () => {
        if (editTaskTitle.trim() === "") {
            alert("Task title cannot be empty.");
            return;
        }
        try {
            if (editTaskTitle !== task.title) {
                await TaskAPI.update(todoId, task.id, editTaskTitle, null);
            }
            setIsTaskTitleEditing(false);
            onTaskUpdated();
        } catch (error) {
            alert(error.response.data["title_validation-error"]);
            console.error("Failed to update the task title:", error);

        }
    };

    const handleEditKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleTaskTitleSave();
        }
    };

    const handleBlur = () => {
        handleTaskTitleSave();
    };

    return (
        <ListItem
            key={task.id}
            disablePadding
            sx={{alignItems: 'center'}}
        >
            <Checkbox
                edge="start"
                checked={task.isDone}
                onChange={handleTaskStatusChange}
            />
            {
                isTaskTitleEditing ? (
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1}}>
                        <TextField
                            variant="outlined"
                            size="small"
                            value={editTaskTitle}
                            onChange={handleEditTaskChange}
                            onKeyDown={handleEditKeyDown}
                            onBlur={handleBlur}
                            inputRef={inputRef}
                            sx={{flexGrow: 1}}
                        />
                    </Box>
                ) : (
                    <Typography
                        onDoubleClick={() => setIsTaskTitleEditing(true)}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            cursor: 'pointer',
                            width: '100%',
                        }}
                    >
                        {task.title}
                    </Typography>
                )
            }
            <IconButton
                edge="end"
                onClick={() => onTaskDeleted(task.id)}
            >
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
}

export default Task;
