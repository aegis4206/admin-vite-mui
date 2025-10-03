export interface LoginInfoType {
  token: string;
  user: AuthUserType;
}

export interface UserType {
  id: string;
  username: string;
  password: string;
  name: string;
  nickname: string;
  // avatar: string;
  email: string;
  phone: string;
}
export interface AuthUserType extends UserType {
  type: "0" | "1";
  roleId: string;
  roleName: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  modifierId: string;
  creator: string;
  modifier: string;
  permissions?: string[];
}

export const authUser = {
  // id: "使用者代號",
  username: "使用者名稱",
  // password: "使用者密碼",
  name: "使用者全名",
  // type: "使用者類型",
  // roleId: "角色代號",
  roleName: "角色名稱",
  nickname: "使用者暱稱",
  // avatar: "使用者頭像",
  email: "使用者信箱",
  phone: "使用者手機號碼",
  createdAt: "建立時間",
  updatedAt: "修改時間",
  // creatorId: "建立人員",
  // modifierId: "修改人員",
  creator: "新增者",
  modifier: "修改者",
};

export interface AuthRoleType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  modifierId: string;
  creator: string;
  modifier: string;
  permissions: string[];
}

export const authRole = {
  // id: "角色代號",
  name: "角色名稱",
  createdAt: "建立時間",
  updatedAt: "修改時間",
  // creatorId: "建立人員",
  // modifierId: "修改人員",
  creator: "新增者",
  modifier: "修改者",
};

export interface AuthPermissionType {
  id: string;
  path: string;
  name: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  modifierId: string;
  creator: string;
  modifier: string;
  permissions: string[];
}

export const authPermission = {
  // id: "權限代號",
  path: "權限代碼",
  name: "權限名稱",
  sort: "排序",
  createdAt: "建立時間",
  updatedAt: "修改時間",
  // creatorId: "建立人員",
  // modifierId: "修改人員",
  creator: "建立者",
  modifier: "修改者",
};

export const permissionNameMap = {
  view: "瀏覽", // 1001
  create: "新增", // 1002
  edit: "編輯", // 1003
  delete: "刪除", // 1004
  import: "匯入", // 1005
  detail: "詳細資料", // 1006
  close: "結案", // 1007
};
