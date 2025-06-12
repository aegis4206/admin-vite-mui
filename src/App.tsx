import { useState, useEffect } from 'react';
import Layout from './Layout/Layout';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAtom } from "jotai";
import { sideBarMenuData } from "./states/route";
import { MenuItem } from "./types/menu";
import Login from './Pages/Login';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import Snackbars from './components/snackbar';
import ModalMessage from './components/modalMessage';
import { loadingAtom, loginInfoAtom } from './states/global';
import { LoginInfoType } from './types/System/Auth/auth';


export default function App() {
  const [list,] = useAtom<MenuItem[]>(sideBarMenuData)
  const [routesList, setRoutesList] = useState<MenuItem[]>([])
  const [loading,] = useAtom(loadingAtom);
  const [, setLoginInfo] = useAtom(loginInfoAtom);
  const navigate = useNavigate();

  const listHandle = () => {
    const tempList: MenuItem[] = [];

    const recursionHandle = (list: MenuItem[]) => {
      list.forEach(item => {
        if ("children" in item && !!item.children && item.children?.length > 0) {
          return recursionHandle(item.children);
        }

        // 無children追加該item進routesList
        tempList.push(item)

        // noSideBarRoute遞迴處理
        if ("noSideBarRoute" in item && !!item.noSideBarRoute && item.noSideBarRoute?.length > 0) {
          return recursionHandle(item.noSideBarRoute);
        }
      });
    }
    recursionHandle(list);
    return tempList
  }

  useEffect(() => {
    const newRoutesList = listHandle();
    setRoutesList(newRoutesList);
    return () => {

    }
  }, [])

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo') || '{}');
    if (!loginInfo.token) {
      // 如果沒有token，則導向到登入頁面
      navigate('/login');
    }
    setLoginInfo(loginInfo as LoginInfoType)

    return () => {

    }
  }, [])


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <Layout>
            {routesList.length > 0 ? (
              <Routes>
                <Route path="/" element={<>首頁</>} />
                {routesList.map((route) => (
                  <Route
                    path={route.path}
                    element={route.pageNode ?? <div>{route.name}</div>}
                    key={route.path + route.name}
                  />
                ))}
                <Route path="not-found" element={<div>404 - Page Not Found</div>} />
                <Route path="*" element={<div>404 - Page Not Found</div>} />
              </Routes>
            ) : (
              <Box>
                <CircularProgress />
              </Box>
            )}
          </Layout>
        } />
      </Routes>

      <Snackbars />
      <ModalMessage />
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: 9999,
        }}
        open={loading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
}