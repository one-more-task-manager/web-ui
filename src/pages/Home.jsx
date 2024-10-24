import {useEffect, useState} from "react";
import {TodoAPI} from "../API/TodoAPI.js";
import {CreateTodo} from "../components/CreateTodo.jsx";
import {Box, Container} from "@mui/material";
import {Todo} from "../components/Todo.jsx";
import {Header} from "../components/Header.jsx";
import PropTypes from "prop-types";

Home.propTypes = {
    user: PropTypes.object.isRequired,
};

function Home({user}) {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        try {
            const data = await TodoAPI.getAll();
            setTodos(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    useEffect(() => {
        fetchTodos(); // Initial fetch
    }, []);

    const handleTodoDelete = () => {
        fetchTodos();
    };

    return (
        <>
            <Header user={user} />
            <Container maxWidth="xl">
                <CreateTodo onCreate={fetchTodos} />
                <Box
                    sx={{
                        display: 'grid',
                        gap: 3,
                        mt: 4,
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(4, 1fr)',
                        },
                    }}
                >
                    {todos.map((todo) => (
                        <Box key={todo.id}>
                            <Todo
                                id={todo.id}
                                title={todo.title}
                                onDelete={handleTodoDelete}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </>
    );
}

export {Home}