export interface LoginInfoType {
  token: string;
  user: AuthUserType;
}
export interface AuthUserType {
  id: string;
  username: string;
  password: string;
  name: string;
  type: "0" | "1";
  nickname: string;
  avatar: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  creatorId: number;
  modifierId: number;
  creator: string;
  modifier: string;
}

export const authUser = {
  id: "使用者代號",
  username: "使用者名稱",
  password: "使用者密碼",
  name: "使用者全名",
  type: "使用者類型",
  nickname: "使用者暱稱",
  avatar: "使用者頭像",
  email: "使用者信箱",
  phone: "使用者手機號碼",
  createdAt: "建立時間",
  updatedAt: "修改時間",
  // creatorId: "建立人員",
  // modifierId: "修改人員",
  creator: "新增者",
  modifier: "修改者",
};
