import { useLocation } from "react-router-dom";
import { LoginInfoType } from "../types/System/Auth/auth";
import { BackEndMenuItem } from "../types/menu";

// 檢查使用者是否有權限訪問特定路徑
export const hasPermissionForPath = (
  path: string,
  userPermissions: string[],
  menuPermissionMap: string[]
): boolean => {
  const requiredPermissions = menuPermissionMap.includes(path);
  if (!requiredPermissions) {
    return true; // 如果沒有定義權限要求，預設允許訪問
  }
  return userPermissions.includes(path);
};

// 遞迴過濾選單項目
export const filterMenuByPermissions = (
  menuItems: BackEndMenuItem[],
  userPermissions: string[],
  menuPermissionMap: string[]
): BackEndMenuItem[] => {
  return menuItems
    .map((item) => {
      let filteredChildren: BackEndMenuItem[] = [];
      if (item.children && item.children.length > 0) {
        filteredChildren = filterMenuByPermissions(
          item.children,
          userPermissions,
          menuPermissionMap
        );
      }
      return {
        ...item,
        children: filteredChildren,
      };
    })
    .filter((item) => {
      const hasPermission = hasPermissionForPath(
        item.path,
        userPermissions,
        menuPermissionMap
      );
      return hasPermission || (item.children && item.children.length > 0);
    });
};

export const singularize = (word: string): string => {
  const irregularMap: Record<string, string> = {
    // 不規則變化的單字
  };

  if (irregularMap[word]) {
    return irregularMap[word];
  }
  if (word.endsWith("ies")) {
    return word.slice(0, -3) + "y";
  }
  if (word.endsWith("es")) {
    return word.slice(0, -2);
  }
  if (word.endsWith("s")) {
    return word.slice(0, -1);
  }
  return word;
};

export const useCheckPermission = () => {
  const loginInfo = JSON.parse(
    localStorage.getItem("loginInfo") || "{}"
  ) as LoginInfoType | null;

  const location = useLocation();
  const path = location.pathname;

  const pathPermission = path.startsWith("/") ? path.slice(1) : path;

  const permissionList = loginInfo?.user?.permissions
    ? loginInfo.user.permissions.filter((perm) =>
        perm.startsWith(pathPermission)
      )
    : [];

  const hasPermission = (permission: string) => {
    return permissionList.includes(`${pathPermission}.${permission}`);
  };

  const canCreate = () => {
    return hasPermission("create");
  };

  const canEdit = () => {
    return hasPermission("edit");
  };

  const canDelete = () => {
    return hasPermission("delete");
  };

  const canImport = () => {
    return hasPermission("import");
  };

  const canDetail = () => {
    return hasPermission("detail");
  };

  const canClose = () => {
    return hasPermission("close");
  };

  return {
    hasPermission,
    canEdit,
    canDelete,
    canCreate,
    canImport,
    canDetail,
    canClose,
  };
};

export const flattenTree = (nodes: BackEndMenuItem[]) => {
  const result: BackEndMenuItem[] = [];

  const traverse = (list: BackEndMenuItem[]) => {
    for (const node of list) {
      // 先存當前節點（淺拷貝，避免 children/noSideBarRoute 汙染）
      const { children, noSideBarRoute, ...rest } = node;
      result.push(rest);

      // 遞迴 children
      if (children) traverse(children);
      // 如果有 noSideBarRoute 也要處理
      if (noSideBarRoute) traverse(noSideBarRoute);
    }
  };

  traverse(nodes);
  return result;
};
