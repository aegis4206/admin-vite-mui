import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright = () => {
    return (
        <Typography component='div' variant="body2" color="text.secondary" align="center" sx={{padding:"10px"}} >
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