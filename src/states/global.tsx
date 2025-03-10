import { atom } from "jotai";
import { SnackbBarOptionType } from "../types/global";

export const loadingAtom = atom<boolean>(false);
export const snackBarAtom = atom<SnackbBarOptionType>();