import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    List,
    TextField,
    Typography
} from "@mui/material";
import PropTypes from 'prop-types';
import {TodoAPI} from "../API/TodoAPI.js";
import {useEffect, useState, useRef} from "react";
import {TaskAPI} from "../API/TaskAPI.js";
import Task from "./Task.jsx";

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

function Todo({id, title, onDelete}) {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [isTodoTitleEditing, setIsTodoTitleEditing] = useState(false);
    const [editTodoTitle, setEditTodoTitle] = useState(title);
    const titleInputRef = useRef(null);

    const fetchTasks = async () => {
        try {
            const data = await TaskAPI.getAll(id);
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        if (isTodoTitleEditing && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isTodoTitleEditing]);

    const handleTodoDelete = async () => {
        try {
            const deleteTaskPromises = tasks.map(task => TaskAPI.delete(id, task.id));
            await Promise.all(deleteTaskPromises);
            await TodoAPI.delete(id);
            onDelete();
        } catch (error) {
            console.error("Failed to delete the todo list:", error);
        }
    };

    const handleTaskDelete = async (taskId) => {
        await TaskAPI.delete(id, taskId)
        await fetchTasks();
    }

    const handleNewTaskChange = (event) => {
        setNewTaskTitle(event.target.value);
    };

    const handleCreateTask = async () => {
        if (newTaskTitle.trim() === "") {
            alert("Please enter a valid task title.");
            return;
        }
        try {
            await TaskAPI.create(id, newTaskTitle);
            setNewTaskTitle("");
            await fetchTasks();
        } catch (error) {
            alert(error.response.data["title_validation-error"]);
        }
    };

    const handleTodoTitleChange = (event) => {
        setEditTodoTitle(event.target.value);
    };

    const handleTodoTitleSave = async () => {
        if (editTodoTitle.trim() === "") {
            alert("Todo list title cannot be empty.");
            return;
        }
        try {
            if (editTodoTitle !== title) {
                await TodoAPI.update(id, editTodoTitle);
            }
            setIsTodoTitleEditing(false);
        } catch (error) {
            alert(error.response.data["title_validation-error"]);
        }
    };

    const handleEditKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleTodoTitleSave();
        }
    };

    const handleBlur = () => {
        handleTodoTitleSave();
    };

    return (
        <Card
        >
            <CardContent sx={{flexGrow: 1, overflow: 'hidden'}}>
                {
                    isTodoTitleEditing ? (
                        <TextField
                            variant="outlined"
                            size="small"
                            value={editTodoTitle}
                            onChange={handleTodoTitleChange}
                            onKeyDown={handleEditKeyDown}
                            onBlur={handleBlur}
                            inputRef={titleInputRef}
                            sx={{width: '100%'}}
                        />
                    ) : (
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                fontSize: 18,
                                overflow: 'hidden',
                                alignItems: 'center',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical',
                                cursor: 'pointer',
                        }}
                            onDoubleClick={() => setIsTodoTitleEditing(true)}
                        >
                            {editTodoTitle}
                        </Typography>
                    )
                }
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        marginTop: 2,
                        marginBottom: 2,
                    }}
                >
                    <TextField
                        label="New Task"
                        variant="outlined"
                        size="small"
                        value={newTaskTitle}
                        onChange={handleNewTaskChange}
                        sx={{flexGrow: 1}}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleCreateTask}
                    >
                        Add
                    </Button>
                </Box>
                <Box sx={{height: '200px', overflowY: 'auto', padding: '15px'}}>
                    <List>
                        {tasks.map((task) => (
                            <Task
                                key={task.id}
                                todoId={id}
                                task={task}
                                onTaskUpdated={fetchTasks}
                                onTaskDeleted={handleTaskDelete}
                            />
                        ))}
                    </List>
                </Box>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    color="error"
                    onClick={handleTodoDelete}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export {Todo};
