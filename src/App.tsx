import { useState, useEffect, Suspense, useMemo } from 'react';
import Layout from './Layout/Layout';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAtom } from "jotai";
import { backendRoutesData, componentMap, iconMap, sideBarMenuData } from "./states/route";
import { BackEndMenuItem, MenuItem } from "./types/menu";
import Login from './Pages/Login';
import { Backdrop, CircularProgress } from '@mui/material';
import Snackbars from './components/snackbar';
import ModalMessage from './components/modalMessage';
import { loadingAtom, loginInfoAtom } from './states/global';
import { LoginInfoType } from './types/System/Auth/auth';
import { filterMenuByPermissions, flattenTree } from './utils/permissions';


export default function App() {
  const [, setSideBarMenu] = useAtom<MenuItem[]>(sideBarMenuData)
  const [backendRoutes,] = useAtom<BackEndMenuItem[]>(backendRoutesData);
  const [routesList, setRoutesList] = useState<MenuItem[]>([])
  const [loading,] = useAtom(loadingAtom);
  const [loginInfo, setLoginInfo] = useAtom(loginInfoAtom);
  const navigate = useNavigate();


  const listHandle = (sideBarMenuList: MenuItem[]) => {
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
    recursionHandle(sideBarMenuList);
    return tempList
  }

  const convertRoute = (route: BackEndMenuItem): MenuItem => {
    return {
      ...route,
      icon: route.icon ? iconMap[route.icon as keyof typeof iconMap] : undefined,
      pageNode: route.pageNode ? componentMap[route.pageNode as keyof typeof componentMap] : undefined,
      children: "children" in route && route.children ? route.children.map(convertRoute) : undefined,
      noSideBarRoute: "noSideBarRoute" in route && route.noSideBarRoute
        ? route.noSideBarRoute.map(convertRoute)
        : undefined,
    };
  };


  const menuPermissionMap = useMemo(() => {
    if (!loginInfo?.user?.permissions || !(backendRoutes.length > 0)) return null;
    return flattenTree(backendRoutes).map(item => item.path);
  }, [loginInfo?.user?.permissions, backendRoutes]);

  // 當登入資訊和後端路由都載入完成後，根據權限過濾選單
  useEffect(() => {
    if (menuPermissionMap) {
      // 根據權限過濾選單
      const filteredRoutes = filterMenuByPermissions(backendRoutes, loginInfo!.user.permissions!, menuPermissionMap);
      // 轉換為前端選單格式
      const newConvertRoute = filteredRoutes.map(convertRoute);
      setSideBarMenu(newConvertRoute);

      // 將後端路由轉換為前端路由列表
      const newRoutesList = listHandle(newConvertRoute);
      setRoutesList(newRoutesList);
    }
  }, [menuPermissionMap])


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
            <Suspense fallback={<Backdrop
              sx={{
                color: '#fff',
                zIndex: 9999,
              }}
              open
            >
              <CircularProgress color="primary" />
            </Backdrop>}>
              {routesList.length > 0 && <Routes>
                <Route path="/" element={<>首頁</>} />
                {routesList.map((route) => (
                  <Route
                    path={route.path}
                    element={route.pageNode ? <route.pageNode /> : <div>{route.name}</div>}
                    key={route.path + route.name}
                  />
                ))}
                <Route path="not-found" element={<div>404 - Page Not Found</div>} />
                <Route path="*" element={<div>404 - Page Not Found</div>} />
              </Routes>}
            </Suspense>
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