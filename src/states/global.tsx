import { atom } from "jotai";
import { SnackbBarOptionType } from "../types/global";
import { LoginInfoType } from "../types/System/Auth/auth";

export const loadingAtom = atom<boolean>(false);
export const snackBarAtom = atom<SnackbBarOptionType>();
export const drawerShowAtom = atom<boolean>(false);
export const loginInfoAtom = atom<LoginInfoType>();
