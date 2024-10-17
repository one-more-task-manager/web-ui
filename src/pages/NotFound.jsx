import {Box, Typography, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
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
            <Typography variant="h1" sx={{fontWeight: 'bold', mb: 2}}>
                404
            </Typography>
            <Typography variant="h6" sx={{mb: 4}}>
                Page Not Found
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoHome}
            >
                Go Back Home
            </Button>
        </Box>
    );
}

export default NotFound;
