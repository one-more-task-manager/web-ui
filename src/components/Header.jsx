import {AppBar, Toolbar, Typography, Button, Container, Box} from '@mui/material';
import PropTypes from "prop-types";

Header.propTypes = {
    user: PropTypes.object.isRequired,
};

function Header({user}) {
    const onLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/sign-in';
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl" disableGutters>
                <Toolbar>
                    {user && (
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%"
                        }}>
                            <Typography variant="h6" component="div">
                                Welcome, {user.email}
                            </Typography>
                            <Button color="inherit" onClick={onLogout}>
                                Log Out
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export {Header}