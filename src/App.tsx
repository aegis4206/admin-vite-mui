import { useState, useEffect } from 'react';
import Layout from './Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import { useAtom } from "jotai";
import { sideBarMenuData } from "./states/list";
import { MenuItem } from "./types/menu";
// import Login from './Pages/login';
import { Box, CircularProgress } from '@mui/material';

export default function App() {
  const [list,] = useAtom<MenuItem[]>(sideBarMenuData)
  const [routesList, setroutesList] = useState<MenuItem[]>([])

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
    setroutesList(newRoutesList);
    return () => {

    }
  }, [])




  return (
    <>
      {/* <Login></Login> */}
      <Layout>
        {routesList.length > 0 ? (
          <Routes>
            <Route path="/" element={<>首頁</>} />
            {routesList.map((route) => (
              <Route
                path={route.path}
                element={route.pageNode ?? <div>{route.name}</div>}
                key={route.path}
              />
            ))}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        ) : (
          <Box>
            <CircularProgress />
          </Box>
        )}
      </Layout>
    </>
  );
}