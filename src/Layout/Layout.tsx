import { useState } from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { IoMdMenu } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Footer from './Footer'
import SideBarMenu from './SideBarMenu';
import Breadcrumbs from './Breadcrumbs';
import { Link } from 'react-router-dom';
import { Grid2 } from '@mui/material';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}),
);


export default function Dashboard(
  {
    children,
  }: {
    children: React.ReactNode
  }
) {

  const [open, setOpen] = useState<boolean>(true);

  // const [windowWidth, setWindowWidth] = React.useState(0);

  // const handleResize = () => {
  //   setWindowWidth(window.innerWidth);
  // };

  // React.useEffect(() => {
  //   setWindowWidth(window.innerWidth);

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // React.useEffect(() => {
  // windowWidth < 768 ? setOpen(false) : setOpen(true)
  // }, [windowWidth]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box sx={{ maxHeight: '100vh', display: 'flex' }}>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <IoMdMenu />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <Link to="/">Ka特販</Link>
            </Typography>
            <IconButton color="inherit" href='/#' target="_blank">
              <FaGithub />
            </IconButton>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" sx={{}} open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <FaChevronLeft />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav"
            sx={{
              overflowY: 'auto',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE 和 Edge
              '&::-webkit-scrollbar': {
                display: 'none', // Chrome, Safari, Opera
              },
            }}>
            <SideBarMenu></SideBarMenu>
          </List>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar /> {/* 縮排用 */}
        <Breadcrumbs /> {/* 麵包屑 */}
        <Container maxWidth={false} sx={{ height: '100%', marginBottom: 20, }}>
          <Box sx={{
            boxShadow: 3,
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            p: 2,
            bgcolor: '#fafafa',
            '&:hover': {
              borderColor: '#1976d2',
            },
          }}>
            <Grid2 container spacing={3} sx={{ mb: 4 }}>
              {children}
            </Grid2>
          </Box>
          <Footer />
        </Container>
      </Box>
    </Box>
  );
}
