import { atom } from "jotai";
import { SnackbBarOptionType } from "../types/global";
import { LoginInfoType } from "../types/System/Auth/auth";
import { MenuItem } from "../types/menu";

export const loadingAtom = atom<boolean>(false);
export const snackBarAtom = atom<SnackbBarOptionType>();
export const drawerShowAtom = atom<boolean>(false);
export const loginInfoAtom = atom<LoginInfoType>();
export const currentRouteAtom = atom<MenuItem>();
export const fetchCountAtom = atom<number>(0);
