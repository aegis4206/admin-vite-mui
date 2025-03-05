import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {' '}
            <Link color="inherit" href="#">
                white
            </Link>
            {'.'}
        </Typography>
    )
}

export default Copyright