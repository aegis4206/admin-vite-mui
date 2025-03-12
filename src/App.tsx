import { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import Layout from './Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import { useAtom } from "jotai";
import { sideBarMenuData } from "./states/list";
import { MenuItem } from "./types/menu";
import Example from './Pages/Example';

export default function App() {
  const [list,] = useAtom<MenuItem[]>(sideBarMenuData)
  const [routesList, setroutesList] = useState<MenuItem[]>([])

  const listHandle = () => {
    const tempList: MenuItem[] = [];

    const recursionHandle = (list: MenuItem[]) => {
      list.forEach(item => {
        if (item.path === "" && !!item.children && item.children?.length > 0) {
          return recursionHandle(item.children);
        }
        tempList.push(item)
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
      <CssBaseline></CssBaseline>
      <Layout>
        <Routes>
          <Route path='/' element={<>首頁</>}></Route>
          <Route path='Example' element={<Example />}></Route>
          {routesList.map(route => <Route path={route.path} element={route.pageNode ? route.pageNode : <div>{route.name}</div>} key={route.path} />)}
        </Routes>
      </Layout>
    </>
  );
}