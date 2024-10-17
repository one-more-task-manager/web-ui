import {useState} from 'react';
import {
    Box,
    Button,
    TextField,
    IconButton,
    InputAdornment,
    Typography,
    Link,
    Container
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {AuthAPI} from "../../API/AuthAPI.js";
import {Confirmation} from "./Confirmation.jsx";

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [signedUp, setSignedUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (email === "" || password === "") {
            setErrorMessage("Please fill all the fields");
            return;
        }
        try {
            await AuthAPI.signUp(email, password);
            setSignedUp(true);
        } catch (error) {
            const errorMessage = error.response.data["email_validation-error"]
                || error.response.data["password_validation-error"]
                || error.response.data["message"]
                || "Failed to sign up. Please try again.";
            setErrorMessage(errorMessage);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSignUpLinkClick = () => {
        navigate('/sign-in');
    };

    if (signedUp) {
        return <Confirmation/>;
    }

    return (
        <Container component="main"
                   sx={{
                       display: 'flex',
                       justifyContent: "center"
                   }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    maxWidth: '400px',
                    width: '100%',
                    p: 3,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Sign Up
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMessage("");
                    }}
                />
                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorMessage("");
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                {/* Conditionally render the error message */}
                {errorMessage && (
                    <Typography color="error" sx={{mt: 2, textAlign: 'center'}}>
                        {errorMessage}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{mt: 3}}
                    onClick={handleSignUp}
                >
                    Sign Up
                </Button>
                <Typography
                    sx={{
                        mt: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontSize: '1rem',
                    }}
                >
                    Already have an account?
                    <Link
                        component="button"
                        variant="body2"
                        onClick={handleSignUpLinkClick}
                        sx={{
                            fontSize: 'inherit',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Sign in
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}

export {SignUp};
