import {Typography, Link, Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';

function Confirmation() {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/sign-in');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center'
            }}
        >
            <Typography variant="h4" gutterBottom>
                Thank you for signing up!
            </Typography>
            <Typography
                sx={{
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    fontSize: '1rem',
                }}
            >
                <Link
                    component="button"
                    variant="subtitle1"
                    onClick={handleSignIn}
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
    );
}

export {Confirmation};