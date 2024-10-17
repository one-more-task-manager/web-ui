import {useState} from 'react';
import {TextField, Button, Box} from '@mui/material';
import {TodoAPI} from "../API/TodoAPI.js";
import PropTypes from "prop-types";

CreateTodo.propTypes = {
    onCreate: PropTypes.func.isRequired,
};

function CreateTodo({onCreate}) {
    const [title, setTitle] = useState("");

    const handleInputChange = (event) => {
        setTitle(event.target.value);
    };

    const handleCreateTodo = async () => {
        if (!title) {
            alert("Please enter a title for the todo list.");
            return;
        }
        try {
            await TodoAPI.create(title);
            setTitle("");
            onCreate();
        } catch (error) {
            alert(error.response.data["title_validation-error"])
        }
    };

    return (
        <Box sx={
            {
                display: 'flex',
                maxWidth: '500px',
                minWidth: '500px',
                alignItems: 'center',
                gap: 2,
                margin: '0 auto',
                mt: 4
            }
        }>
            <TextField
                label="Todolist Title"
                variant="outlined"
                value={title}
                onChange={handleInputChange}
                sx={{flexGrow: 1}}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateTodo}
            >
                Create Todo
            </Button>
        </Box>
    );
}

export {CreateTodo};
